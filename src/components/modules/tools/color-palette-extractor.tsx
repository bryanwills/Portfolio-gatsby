import { Swatch } from "@vibrant/color";
import { CheckIcon, LoaderIcon, XIcon } from "lucide-react";
import { Vibrant } from "node-vibrant/browser";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import Center from "@/components/ui/center";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/reusables/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/reusables/select";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/utils/cn";

interface Palette {
  Vibrant: Swatch | null;
  Muted: Swatch | null;
  DarkVibrant: Swatch | null;
  DarkMuted: Swatch | null;
  LightVibrant: Swatch | null;
  LightMuted: Swatch | null;
}

type ColorFormat = "hex" | "rgb" | "hsl";

export default function ColorPaletteExtractor() {
  const [image, setImage] = useState<string | null>(null);
  const [palette, setPalette] = useState<Palette>();
  const [activeFormat, setActiveFormat] = useState<ColorFormat>("hex");
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [isExtracting, setIsExtracting] = useState(false);

  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 800 });

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      toast.error("Please select a valid image file.");
      return;
    }

    const imageUrl = URL.createObjectURL(acceptedFiles[0]);
    setImage(imageUrl);

    try {
      setIsExtracting(true);
      const vibrant = Vibrant.from(imageUrl);
      const palette = await vibrant.getPalette();
      setPalette(palette);
    } catch {
      toast.error("Failed to extract colors from the image. Please try again.");
    } finally {
      setIsExtracting(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    multiple: false,
  });

  const removeImage = () => {
    if (!image) return;
    setImage(null);
    setCopiedItem(null);
    URL.revokeObjectURL(image);
  };

  const handleCopy = (color: string) => {
    copyToClipboard(color);
    setCopiedItem(color);
  };

  const displayFormat = (swatch: Swatch) => {
    switch (activeFormat) {
      case "rgb":
        const [r, g, b] = swatch.rgb;

        return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
      case "hsl":
        const [h, s, l] = swatch.hsl;

        return `hsl(${Math.round(h * 360)}, ${Math.round(
          s * 100
        )}%, ${Math.round(l * 100)}%)`;
      case "hex":
        return swatch.hex;
      default:
        return swatch.hex;
    }
  };

  return (
    <Center className="container mx-auto px-4">
      {image ? (
        <div className="flex flex-col md:flex-row gap-10 md:gap-28 items-center">
          <Center>
            <div className="relative">
              <img
                src={image}
                alt="Uploaded"
                width={320}
                height={320}
                className="rounded-lg shadow-lg"
                style={{
                  boxShadow: `0 4px 30px ${
                    copiedItem || palette?.Vibrant?.hex
                  }`,
                }}
              />
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
          </Center>
          <div className="flex flex-col space-y-6">
            <div className="flex gap-8">
              <Heading level={2}>Palette</Heading>
              <Select
                onValueChange={(value) => setActiveFormat(value as ColorFormat)}
                defaultValue="hex"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hex">Hex</SelectItem>
                  <SelectItem value="rgb">RGB</SelectItem>
                  <SelectItem value="hsl">HSL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {isExtracting ? (
              <Center className="h-10">
                <LoaderIcon className="h-6 w-6 animate-spin" />
              </Center>
            ) : (
              <div className="flex flex-col">
                {palette &&
                  Object.entries(palette).map(([key, swatch], i) =>
                    swatch ? (
                      <div
                        onClick={() => {
                          handleCopy(displayFormat(swatch));
                        }}
                        tabIndex={0}
                        role="button"
                        key={key}
                        className={cn(
                          "flex items-center gap-2 w-52 relative hover:opacity-80 cursor-pointer h-10",
                          {
                            "h-16": i === 0,
                            "h-12": i === 1,
                            "rounded-t-lg": i === 0,
                            "rounded-b-lg":
                              i === Object.keys(palette).length - 1,
                          }
                        )}
                        style={{ backgroundColor: swatch.hex }}
                      >
                        <span
                          className="absolute bottom-2 right-2 text-xs"
                          style={{ color: swatch.bodyTextColor }}
                        >
                          {isCopied && copiedItem === displayFormat(swatch) ? (
                            <CheckIcon className="text-success size-4" />
                          ) : (
                            displayFormat(swatch)
                          )}
                        </span>
                      </div>
                    ) : null
                  )}
              </div>
            )}
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
