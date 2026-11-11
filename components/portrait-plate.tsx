"use client";

import { useRef } from "react";

import { Media } from "@/components/media";
import type { ImageRef } from "@/content/types";

/**
 * The portrait plate. The small 4:5 crop opens a native dialog with the whole
 * photograph, because the ID-card crop on a phone hides most of the picture.
 */
export function PortraitPlate({ image }: { image?: ImageRef }) {
  const dialog = useRef<HTMLDialogElement>(null);

  return (
    <>
      <figure className="about-id data-plate p-3 md:p-4">
        <button
          type="button"
          className="portrait-zoom"
          aria-label="Open the portrait larger"
          aria-haspopup="dialog"
          onClick={() => dialog.current?.showModal()}
        >
          <Media
            image={image}
            variant="field"
            label="portrait pending"
            className="aspect-[4/5] w-full border border-ink/20"
            sizes="(min-width: 768px) 33vw, 100vw"
          />
        </button>
        <figcaption className="mt-3 flex flex-wrap items-baseline justify-between gap-2 border-t border-ink/25 pt-2 font-mono text-[10px] uppercase tracking-[0.18em]">
          <span>FIG. 2-1 · Portrait</span>
          <span>Part 01</span>
        </figcaption>
      </figure>

      <dialog
        ref={dialog}
        aria-label="Portrait, figure 2-1"
        className="portrait-dialog"
        onClick={(event) => {
          if (event.target === dialog.current) dialog.current?.close();
        }}
      >
        <figure className="portrait-dialog-plate data-plate">
          <header className="portrait-dialog-head">
            <span className="portrait-dialog-code">C02</span>
            <span className="portrait-dialog-title">Fig. 2-1 · Portrait</span>
            <button
              type="button"
              className="portrait-dialog-close"
              aria-label="Close the portrait"
              onClick={() => dialog.current?.close()}
            >
              ×
            </button>
          </header>
          <div className="portrait-dialog-frame">
            <Media
              image={image}
              variant="field"
              label="portrait pending"
              className="portrait-dialog-media aspect-[4/5] w-full"
              sizes="(min-width: 768px) 26rem, 90vw"
            />
          </div>
          <figcaption className="portrait-dialog-foot">
            <span>Sheet 2-1 · Unit BZ-2026</span>
            <span>Part 01</span>
          </figcaption>
        </figure>
      </dialog>
    </>
  );
}
