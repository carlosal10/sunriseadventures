'use client';

import { useState } from 'react';
import Image from 'next/image';

type Props = {
  images: string[];
  title: string;
};

export default function TourGallery({ images, title }: Props) {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <>
      {lightbox && (
        <button
          type="button"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={() => setLightbox(null)}
          aria-label="Close gallery preview"
        >
          <div className="relative h-full max-h-[80vh] w-full max-w-5xl">
            <Image src={lightbox} alt={`${title} gallery preview`} fill className="object-contain" />
          </div>
        </button>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setLightbox(image)}
            className={`relative overflow-hidden rounded-xl ${
              index === 0 ? 'col-span-2 row-span-2 h-80' : 'h-40'
            }`}
          >
            <Image
              src={image}
              alt={`${title} photo ${index + 1}`}
              fill
              className="object-cover transition hover:scale-105"
            />
          </button>
        ))}
      </div>
    </>
  );
}
