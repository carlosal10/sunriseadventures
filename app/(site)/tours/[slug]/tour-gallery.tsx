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
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#160f0a]/95 p-6 backdrop-blur"
          onClick={() => setLightbox(null)}
          aria-label="Close gallery preview"
        >
          <div className="relative h-full max-h-[82vh] w-full max-w-6xl overflow-hidden rounded-[2rem] border border-white/15">
            <Image
              src={lightbox}
              alt={`${title} gallery preview`}
              fill
              className="object-contain"
            />
          </div>
        </button>
      )}

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => setLightbox(image)}
            className={`group relative overflow-hidden rounded-[1.5rem] border border-white/70 shadow-[0_16px_45px_rgba(63,41,22,0.1)] ${
              index === 0 ? 'col-span-2 row-span-2 h-96' : 'h-44'
            }`}
          >
            <Image
              src={image}
              alt={`${title} photo ${index + 1}`}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-[#160f0a]/35 to-transparent opacity-0 transition group-hover:opacity-100" />
          </button>
        ))}
      </div>
    </>
  );
}
