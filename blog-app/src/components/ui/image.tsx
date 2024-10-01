import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  sizes?: string; //sm | md | lg
  fill?: boolean;
  width?: number;
  height?: number;
  loading?: "eager" | "lazy";
  placeholder?: "blur" | "empty";
  onLoadingComplete?: () => void;
  onError?: () => void;
  onLoad?: () => void;
  fallback?: React.ReactNode;
}

const Image = forwardRef<HTMLImageElement | null, ImageProps>(
  (
    {
      sizes,
      fill,
      width = 1200,
      height = 900,
      className,
      onLoadingComplete,
      onError,
      onLoad,
      loading = "lazy",
      ...props
    },
    ref
  ) => {
    if (sizes && !/^\d+(px|em|%)(, \d+(px|em|%))*$/.test(sizes)) {
      console.warn(
        "Invalid `sizes` prop. Should be a comma-separated list of sizes."
      );
    }

    return (
      <img
        sizes={sizes}
        width={width}
        height={height}
        ref={ref}
        className={cn("object-cover", className)}
        onError={(event) => {
          if (onError) {
            onError();
          } else {
            event.currentTarget.src = "https://via.placeholder.com/1200";
          }
        }}
        fallback={<SkeletonImage />}
        onLoad={onLoad}
        loading={loading}
        {...props}
      />
    );
  }
);
Image.displayName = "Image";

const SkeletonImage = () => {
  return <div className="w-full h-full bg-slate-300 animate-pulse"></div>;
};

export { Image };
