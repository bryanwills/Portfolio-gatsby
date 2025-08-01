import "react-image-crop/dist/ReactCrop.css";

import { DownloadIcon, XIcon } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import ReactCrop, { Crop } from "react-image-crop";
import { toast } from "sonner";

import Center from "@/components/ui/center";
import { Button } from "@/components/ui/reusables/button";
import { Input } from "@/components/ui/reusables/input";
import { Label } from "@/components/ui/reusables/label";
import { cn } from "@/utils/cn";
interface IFile {
  url: string;
  format: string;
  name: string;
}

export default function ImageResizerCropper() {
  const [file, setFile] = useState<IFile | null>(null);
  const [crop, setCrop] = useState<Crop>({
    height: 100,
    width: 100,
    unit: "px",
    x: 0,
    y: 0,
  });
  const [completedCrop, setCompletedCrop] = useState<Crop | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      toast.error("Please select a valid image file.");
      return;
    }

    const imgUrl = URL.createObjectURL(acceptedFiles[0]);
    setFile({
      url: imgUrl,
      format: acceptedFiles[0].type.split("/")[1],
      name: acceptedFiles[0].name.replace(/\.[^/.]+$/, ""),
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/avif": [".avif"],
      "image/tiff": [".tiff"],
      "image/bmp": [".bmp"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const removeImage = () => {
    if (!file) return;
    setFile(null);
    setCrop({ height: 100, width: 100, unit: "px", x: 0, y: 0 });
    setCompletedCrop(null);
    URL.revokeObjectURL(file.url);
  };

  const onLoad = (img: HTMLImageElement) => {
    imgRef.current = img;
  };

  const handleDownload = useCallback(() => {
    if (!completedCrop || !canvasRef.current || !imgRef.current || !file)
      return;
    const image = imgRef.current;
    const canvas = canvasRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = completedCrop.width!;
    canvas.height = completedCrop.height!;

    ctx.drawImage(
      image,
      completedCrop.x! * scaleX,
      completedCrop.y! * scaleY,
      completedCrop.width! * scaleX,
      completedCrop.height! * scaleY,
      0,
      0,
      completedCrop.width!,
      completedCrop.height!
    );

    canvas.toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${file.name}_cropped.${file.format}`;
      link.click();
    }, `image/${file.format}`);
  }, [completedCrop, file]);

  return (
    <Center className="container mx-auto px-10">
      <canvas ref={canvasRef} className="hidden" />
      {file ? (
        <div className="mt-10 flex flex-col lg:flex-row gap-10 md:gap-28 items-center lg:items-start">
          <div className="w-full md:w-1/2">
            <div className="relative">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
              >
                <img
                  src={file.url}
                  alt="Uploaded"
                  onLoad={(e) => onLoad(e.currentTarget)}
                />
              </ReactCrop>
              <Button
                size={"iconSm"}
                variant="secondary"
                className="absolute -top-4 -right-4 rounded-full"
                onClick={removeImage}
                aria-label="Remove file"
              >
                <XIcon />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 items-center">
            <Label htmlFor="width">Width:</Label>
            <Input
              id="width"
              type="number"
              value={Math.round(crop.width)}
              onChange={(e) =>
                setCrop({ ...crop, width: Number(e.target.value) })
              }
            />
            <Label htmlFor="height">Height:</Label>
            <Input
              id="height"
              type="number"
              value={Math.round(crop.height)}
              onChange={(e) =>
                setCrop({ ...crop, height: Number(e.target.value) })
              }
            />
            <Label htmlFor="x">X:</Label>
            <Input
              id="x"
              type="number"
              value={Math.round(crop.x)}
              onChange={(e) => setCrop({ ...crop, x: Number(e.target.value) })}
            />
            <Label htmlFor="y">Y:</Label>
            <Input
              id="y"
              type="number"
              value={Math.round(crop.y)}
              onChange={(e) => setCrop({ ...crop, y: Number(e.target.value) })}
            />
            <Button
              onClick={handleDownload}
              className="col-span-2 mt-10"
              disabled={!completedCrop}
            >
              <DownloadIcon /> Download
            </Button>
          </div>
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
