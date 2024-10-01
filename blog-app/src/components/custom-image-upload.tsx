import React, { useState, useRef, forwardRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface CustomImageUploadProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onImageChange?: (file: File | null) => void;
  ref?: React.Ref<HTMLInputElement>;
}

const CustomImageUpload = forwardRef<HTMLInputElement, CustomImageUploadProps>(
  ({ className, onImageChange, ...props }, ref) => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] || null;
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null);
      }
      if (onImageChange) {
        onImageChange(file);
      }
    };

    const handleButtonClick = () => {
      fileInputRef.current?.click();
    };

    return (
      <div className={cn("space-y-4", className)}>
        <div>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
            ref={(e) => {
              if (typeof ref === "function") {
                ref(e);
              } else if (ref && "current" in ref) {
                ref.current = e;
              }
              // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
              //@ts-ignore
              fileInputRef.current = e as HTMLInputElement;
            }}
            {...props}
          />
          <Button
            type="button"
            onClick={handleButtonClick}
            variant="outline"
            className="w-full text-white bg-zinc-800 hover:bg-zinc-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-zinc-900 dark:hover:bg-zinc-700 dark:focus:ring-zinc-800"
          >
            Select Image
          </Button>
        </div>
        {previewUrl && (
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Image Preview
            </Label>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

CustomImageUpload.displayName = "CustomImageUpload";

export { CustomImageUpload };
