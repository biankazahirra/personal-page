import Image from "next/image";
import type { ComponentProps } from "react";

import { Texture } from "@/components/texture";
import type { ImageRef } from "@/content/types";

type MediaProps = {
  image?: ImageRef;
  /** Shown when no image exists yet. */
  label: string;
  variant: ComponentProps<typeof Texture>["variant"];
  tone?: ComponentProps<typeof Texture>["tone"];
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** `intrinsic` keeps the image's own ratio instead of cropping it. */
  fit?: "cover" | "intrinsic";
};

/**
 * A media slot: the real photograph when `image` is set, the abstract texture
 * otherwise. Both fill the same box, so swapping one for the other never moves
 * the layout.
 */
export function Media({
  image,
  label,
  variant,
  tone,
  className = "",
  sizes = "100vw",
  priority = false,
  fit = "cover",
}: MediaProps) {
  if (!image) {
    return (
      <Texture variant={variant} tone={tone} label={label} className={className} />
    );
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={
        fit === "intrinsic"
          ? { aspectRatio: `${image.width} / ${image.height}` }
          : undefined
      }
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={fit === "intrinsic" ? "object-contain" : "object-cover"}
      />
    </div>
  );
}
