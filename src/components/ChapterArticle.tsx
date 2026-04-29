"use client";

import { useEffect, useState } from "react";

type LightboxImage = {
  src: string;
  alt: string;
};

type ChapterArticleProps = {
  html: string;
};

export function ChapterArticle({ html }: ChapterArticleProps) {
  const [lightboxImage, setLightboxImage] = useState<LightboxImage | null>(null);

  useEffect(() => {
    if (!lightboxImage) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxImage(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxImage]);

  return (
    <>
      <article
        className="reader-article znc"
        onClick={(event) => {
          const image = (event.target as HTMLElement).closest("img");

          if (!image) {
            return;
          }

          setLightboxImage({
            src: image.currentSrc || image.src,
            alt: image.alt,
          });
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {lightboxImage ? (
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImage.alt || "画像の拡大表示"}
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="image-lightbox-close"
            type="button"
            aria-label="拡大表示を閉じる"
            onClick={() => setLightboxImage(null)}
          >
            Close
          </button>
          {/* Markdown images have arbitrary dimensions, so the lightbox uses a plain image. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}
