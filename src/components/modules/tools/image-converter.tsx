import convertHeic from "heic-convert/browser";
import JSZip from "jszip";
import { AlertCircleIcon, DownloadIcon, LoaderIcon, XIcon } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import Center from "@/components/ui/center";
import { Badge } from "@/components/ui/reusables/badge";
import { Button } from "@/components/ui/reusables/button";
import { Card, CardContent } from "@/components/ui/reusables/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/reusables/select";
import { cn } from "@/utils/cn";

type OutputFormat = "jpeg" | "png" | "webp" | "bmp" | "tiff" | "avif" | "heic";

export interface IFileItem {
  id: string;
  file: File;
  originalUrl: string;
  convertedUrl?: string;
  outputFormat: string;
  status: "pending" | "converting" | "completed" | "error";
}

const SUPPORTED_OUTPUT_FORMATS = [
  { value: "jpeg", label: "JPEG" },
  { value: "png", label: "PNG" },
  { value: "webp", label: "WebP" },
  { value: "bmp", label: "BMP" },
  { value: "tiff", label: "TIFF" },
  { value: "avif", label: "AVIF" },
  { value: "heic", label: "HEIC" },
];

export default function ImageConverter({
  defaultFormat,
}: {
  defaultFormat?: OutputFormat;
}) {
  const [files, setFiles] = useState<IFileItem[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        toast.error("Please select a valid image files.");
        return;
      }

      const newFiles = Array.from(acceptedFiles).map((file) => ({
        id: crypto.randomUUID(),
        file,
        originalUrl: URL.createObjectURL(file),
        outputFormat:
          defaultFormat ||
          ((SUPPORTED_OUTPUT_FORMATS.filter(
            (format) => format.value !== file.type.split("/")[1]
          )[0]?.value || "jpeg") as OutputFormat),
        status: "pending" as const,
      }));
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    },
    [defaultFormat]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
  });

  const convertImage = useCallback(async (fileData: IFileItem) => {
    return new Promise<string>(async (resolve, reject) => {
      const canvas = canvasRef.current;
      if (!canvas) {
        reject(new Error("Canvas not available"));
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context not available"));
        return;
      }

      if (["image/heic", "image/heif"].includes(fileData.file.type)) {
        try {
          const arrayBuffer = await fileData.file.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          const outputBuffer = await convertHeic({
            buffer: uint8Array as unknown as ArrayBuffer,
            format: "PNG",
          });
          const blob = new Blob([outputBuffer], {
            type: `image/${fileData.outputFormat}`,
          });
          const url = URL.createObjectURL(blob);
          resolve(url);
          return;
        } catch (error) {
          console.log(error);

          reject(new Error("Failed to convert image"));
          return;
        }
      }

      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const mimeType = `image/${fileData.outputFormat}`;

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              resolve(url);
            } else {
              reject(new Error("Failed to convert image"));
            }
          },
          mimeType,
          0.92
        );
      };

      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = fileData.originalUrl;
    });
  }, []);

  const handleConvert = useCallback(
    async (fileId: string) => {
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.id === fileId ? { ...f, status: "converting" } : f
        )
      );

      try {
        const file = files.find((f) => f.id === fileId);
        if (!file) return;

        const convertedUrl = await convertImage(file);

        setFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? {
                  ...f,
                  status: "completed" as const,
                  convertedUrl,
                }
              : f
          )
        );
      } catch {
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.id === fileId ? { ...f, status: "error" } : f
          )
        );
      }
    },
    [files, convertImage]
  );

  const handleConvertAll = useCallback(async () => {
    const pendingFiles = files.filter((f) => f.status === "pending");
    for (const file of pendingFiles) {
      await handleConvert(file.id);
    }
  }, [files, handleConvert]);

  const handleDownload = useCallback((fileData: IFileItem) => {
    if (!fileData.convertedUrl) return;

    const link = document.createElement("a");
    link.href = fileData.convertedUrl;
    link.download = `${fileData.file.name.replace(/\.[^/.]+$/, "")}.${
      fileData.outputFormat
    }`;
    link.click();
  }, []);

  const handleDownloadAll = useCallback(() => {
    const zip = new JSZip();
    const completedFiles = files.filter(
      (f) => f.status === "completed" && f.convertedUrl
    );
    completedFiles.forEach((file) => {
      if (!file.convertedUrl) return;
      const fileName = `${file.file.name.replace(/\.[^/.]+$/, "")}.${
        file.outputFormat
      }`;
      zip.file(
        fileName,
        fetch(file.convertedUrl).then((res) => res.blob())
      );
    });
    zip.generateAsync({ type: "blob" }).then((content) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = "converted_images.zip";
      link.click();
    });
  }, [files]);

  const removeFile = useCallback((fileId: string) => {
    setFiles((prev) => {
      const fileToRemove = prev.find((f) => f.id === fileId);
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.originalUrl);
        if (fileToRemove.convertedUrl) {
          URL.revokeObjectURL(fileToRemove.convertedUrl);
        }
      }
      return prev.filter((f) => f.id !== fileId);
    });
  }, []);

  const removeAllFiles = useCallback(() => {
    setFiles((prev) => {
      prev.forEach((file) => {
        URL.revokeObjectURL(file.originalUrl);
        if (file.convertedUrl) {
          URL.revokeObjectURL(file.convertedUrl);
        }
      });
      return [];
    });
  }, []);

  const updateSettings = useCallback((fileId: string, newFormat: string) => {
    setFiles((prevFiles) =>
      prevFiles.map((f) =>
        f.id === fileId
          ? {
              ...f,
              outputFormat: newFormat,
              status: "pending",
              convertedUrl: undefined,
            }
          : f
      )
    );
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="hidden" />
      <div className="container mx-auto px-4 md:px-6 gap-6 flex flex-col">
        <Center
          className={cn(
            "border-4 border-dashed border-primary rounded-lg h-[calc(100dvh-280px)] text-muted-foreground bg-primary/5 hover:bg-primary/20 transition-colors cursor-pointer flex flex-col gap-4",
            {
              "h-64": files.length > 0,
            }
          )}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-primary">Drop the files here ...</p>
          ) : (
            <>
              <Button size={"lg"}>Select Images</Button>
              <p className="hidden md:block">or drag & drop here</p>
            </>
          )}
        </Center>
        {files.length > 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <div />
              <div className="flex flex-row gap-4">
                <Select
                  onValueChange={(value) => {
                    setFiles((prevFiles) =>
                      prevFiles.map((f) => ({
                        ...f,
                        outputFormat: value,
                        status: "pending",
                        convertedUrl: undefined,
                      }))
                    );
                  }}
                  defaultValue={
                    defaultFormat || SUPPORTED_OUTPUT_FORMATS[0].value
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a format" />
                  </SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_OUTPUT_FORMATS.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {files.every((f) => f.status === "completed") ? (
                  <Button onClick={handleDownloadAll}>
                    <DownloadIcon /> Donwload All
                  </Button>
                ) : (
                  <Button
                    onClick={handleConvertAll}
                    disabled={files.every((f) => f.status !== "pending")}
                    className="w-max"
                  >
                    Convert All
                  </Button>
                )}
                <Button
                  variant={"secondary"}
                  size={"icon"}
                  onClick={removeAllFiles}
                  className="shrink-0"
                  aria-label="Remove all files"
                >
                  <XIcon />
                </Button>
              </div>
            </div>
            {files.map((file, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col md:flex-row gap-4 justify-between md:items-center relative pt-6">
                  <div className="flex items-center gap-4">
                    {["image/heic", "image/heif", "image/tiff"].includes(
                      file.file.type
                    ) ? (
                      <Center className="w-12 h-12 bg-muted text-muted-foreground text-xs">
                        {file.file.type.split("/")[1].toUpperCase()}
                      </Center>
                    ) : (
                      <img
                        src={file.originalUrl}
                        alt={file.file.name}
                        width={50}
                        height={50}
                        className="max-h-[50px] object-contain"
                      />
                    )}
                    <div>
                      <p className="font-semibold">{file.file.name}</p>
                      <div className="flex flex-row gap-2">
                        <p className="text-sm text-muted-foreground">
                          {file.file.size / 1024 < 1024
                            ? `${(file.file.size / 1024).toFixed(2)} KB`
                            : `${(file.file.size / (1024 * 1024)).toFixed(
                                2
                              )} MB`}
                        </p>
                        <Badge variant={"secondary"}>
                          {file.file.type.split("/")[1].toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 justify-between w-full md:w-max md:justify-end">
                    <Select
                      onValueChange={(value) => updateSettings(file.id, value)}
                      defaultValue={file.outputFormat}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a format" />
                      </SelectTrigger>
                      <SelectContent>
                        {SUPPORTED_OUTPUT_FORMATS.filter(
                          (format) =>
                            format.value !== file.file.type.split("/")[1]
                        ).map((format) => (
                          <SelectItem key={format.value} value={format.value}>
                            {format.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {file.status === "pending" && (
                      <Button
                        onClick={() => handleConvert(file.id)}
                        className="w-max"
                      >
                        Convert
                      </Button>
                    )}
                    {file.status === "completed" && (
                      <Button onClick={() => handleDownload(file)}>
                        <DownloadIcon /> Download
                      </Button>
                    )}
                    {file.status === "converting" && (
                      <Button disabled>
                        <LoaderIcon className="animate-spin" />
                        Converting...
                      </Button>
                    )}
                    {file.status === "error" && (
                      <Button variant="destructive" disabled>
                        <AlertCircleIcon /> Error
                      </Button>
                    )}
                  </div>
                  <Button
                    size={"iconSm"}
                    variant="secondary"
                    className="absolute -top-4 -right-4 rounded-full"
                    onClick={() => removeFile(file.id)}
                    aria-label="Remove file"
                    disabled={file.status === "converting"}
                  >
                    <XIcon />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
