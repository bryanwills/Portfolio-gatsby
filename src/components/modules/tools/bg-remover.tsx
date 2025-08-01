import { removeBackground } from "@imgly/background-removal";
import convertHeic from "heic-convert/browser";
import { DownloadIcon, XIcon } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import Center from "@/components/ui/center";
import { Button } from "@/components/ui/reusables/button";
import { cn } from "@/utils/cn";

import { IFileItem } from "./types";

interface IFile {
  url: string;
  name: string;
}

export default function BackgroundRemover() {
  const [file, setFile] = useState<IFile | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const convertImage = useCallback(
    async (
      fileData: Pick<IFileItem, "originalUrl" | "outputFormat" | "file">
    ) => {
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
            setFile((prev) => ({
              ...prev!,
              url,
            }));
            console.log(url);

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
    },
    []
  );

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        toast.error("Please select a valid image file.");
        return;
      }

      const file = acceptedFiles[0];

      const imgUrl = URL.createObjectURL(file);
      setFile({
        url: imgUrl,
        name: file.name.replace(/\.[^/.]+$/, ""),
      });

      try {
        setIsProcessing(true);

        const imgFormat = file.type.split("/")[1];
        const acceptedFormats = ["jpeg", "jpg", "png", "webp"];

        let convertedUrl;
        if (!acceptedFormats.includes(imgFormat)) {
          convertedUrl = await convertImage({
            originalUrl: imgUrl,
            outputFormat: "png",
            file,
          });
        }

        const blob = await removeBackground(convertedUrl || imgUrl);
        setProcessedImage(URL.createObjectURL(blob));
      } catch {
        toast.error(
          "Failed to process the image. Please try again with a different image."
        );
      } finally {
        setIsProcessing(false);
      }
    },
    [convertImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/avif": [".avif"],
      "image/bmp": [".bmp"],
      "image/heic": [".heic", ".heif"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const removeImage = () => {
    if (!file) return;
    setFile(null);
    setProcessedImage(null);
    URL.revokeObjectURL(file.url);
    if (processedImage) {
      URL.revokeObjectURL(processedImage);
    }
  };

  const handleDownload = useCallback(() => {
    if (!processedImage) return;
    const link = document.createElement("a");
    link.href = processedImage;
    link.download = `${file?.name}_no_bg.png`;
    link.click();
  }, [file?.name, processedImage]);

  return (
    <Center className="container mx-auto px-10">
      <canvas ref={canvasRef} className="hidden" />
      {file ? (
        <div className="mt-10 flex flex-col lg:flex-row gap-10 md:gap-28 items-center lg:items-start">
          <div className="relative">
            <img src={file.url} alt={file.name} width={420} height={420} />
            {isProcessing && (
              <Center className="absolute inset-0 bg-black/50 animate-pulse">
                <p className="text-white/80">Processing...</p>
              </Center>
            )}
            <Button
              size={"iconSm"}
              variant="secondary"
              className="absolute -top-4 -right-4 rounded-full"
              onClick={removeImage}
              aria-label="Remove file"
              disabled={isProcessing}
            >
              <XIcon />
            </Button>
          </div>
          {processedImage && (
            <div className="flex flex-col gap-4">
              <img
                src={processedImage}
                alt="Processed"
                width={420}
                height={420}
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)",
                  backgroundSize: "20px 20px",
                  backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
                }}
              />
              <Button
                size={"lg"}
                onClick={handleDownload}
                disabled={isProcessing}
              >
                <DownloadIcon />
                Download
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Center
          className={cn(
            "border-4 border-dashed border-primary rounded-lg h-[calc(100dvh-300px)] w-full text-muted-foreground bg-primary/5 hover:bg-primary/20 transition-colors cursor-pointer flex flex-col gap-4"
          )}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-primary">Drop the image here ...</p>
          ) : (
            <>
              <Button size={"lg"}>Select Image</Button>
              <p className="hidden md:block">or drag & drop here</p>
            </>
          )}
        </Center>
      )}
      <div></div>
    </Center>
  );
}
