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
}: MediaProps) {
  if (!image) {
    return (
      <Texture variant={variant} tone={tone} label={label} className={className} />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
