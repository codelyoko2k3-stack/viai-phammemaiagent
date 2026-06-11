"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { HomepageHighlightsConfig, HomepageHighlightImage } from '@/types'

const DEFAULT_IMAGES: HomepageHighlightImage[] = [
  { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=675&q=80', alt: 'Analytics dashboard' },
  { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=675&q=80', alt: 'Team collaboration' },
  { src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=675&q=80', alt: 'Business data' },
  { src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&h=675&q=80', alt: 'Tech meeting' },
  { src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&h=675&q=80', alt: 'Data charts' },
  { src: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&h=675&q=80', alt: 'Business presentation' },
  { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1200&h=675&q=80', alt: 'Business meeting' },
  { src: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&h=675&q=80', alt: 'Startup team' },
  { src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&h=675&q=80', alt: 'Tech professional' },
  { src: 'https://images.unsplash.com/photo-1488229297570-58520851e868?auto=format&fit=crop&w=1200&h=675&q=80', alt: 'Code screen' },
  { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&h=675&q=80', alt: 'Office environment' },
  { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&h=675&q=80', alt: 'Team meeting' },
]

export default function HighlightsCarousel({ config }: { config?: HomepageHighlightsConfig }) {
  const heading = config?.heading ?? 'ViAI'
  const headingEm = config?.headingEm ?? 'và những dấu ấn nổi bật'
  const images = (config?.images && config.images.length > 0 ? config.images : DEFAULT_IMAGES).filter((img) => img.src)
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)

  // Phím tắt lightbox
  useEffect(() => {
    if (lightboxIdx === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIdx(null)
      else if (e.key === 'ArrowRight') setLightboxIdx((i) => (i === null ? null : (i + 1) % images.length))
      else if (e.key === 'ArrowLeft') setLightboxIdx((i) => (i === null ? null : (i - 1 + images.length) % images.length))
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [lightboxIdx, images.length])

  // Khóa scroll nền khi lightbox mở
  useEffect(() => {
    if (lightboxIdx === null) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [lightboxIdx])

  if (images.length === 0) return null

  const lightboxImg = lightboxIdx !== null ? images[lightboxIdx] : null
  const trackImages = [...images, ...images]

  return (
    <section className="bg-[#F5F7FA] py-12">
      <div className="max-w-8xl mx-auto px-6">
        <h2 className="text-center text-2xl sm:text-[clamp(22px,3vw,34px)] font-extrabold uppercase tracking-wide mb-10 leading-tight">
          <span className="text-[#1E5BC6]">{heading}</span>{' '}
          <span className="text-[#F47920]">{headingEm}</span>
        </h2>

        <div className="relative overflow-hidden">
          <div
            className="viai-marquee-track flex w-max"
            style={{ animationDuration: `${images.length * 4}s` }}
          >
            {trackImages.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightboxIdx(i % images.length)}
                aria-label={`Xem ảnh ${(i % images.length) + 1}`}
                className="relative shrink-0 w-[240px] sm:w-[320px] lg:w-[360px] aspect-video mr-3 rounded-xl overflow-hidden bg-gray-200 cursor-zoom-in group"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 240px, (max-width: 1024px) 320px, 360px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox modal */}
      {lightboxImg && lightboxIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Xem ảnh phóng to"
          onClick={() => setLightboxIdx(null)}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 p-4 sm:p-8 animate-[lbFadeIn_.18s_ease]"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIdx((i) => (i === null ? null : (i - 1 + images.length) % images.length))
            }}
            aria-label="Ảnh trước"
            className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/25 text-white text-3xl font-bold flex items-center justify-center transition-colors"
          >‹</button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setLightboxIdx((i) => (i === null ? null : (i + 1) % images.length))
            }}
            aria-label="Ảnh sau"
            className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/25 text-white text-3xl font-bold flex items-center justify-center transition-colors"
          >›</button>

          <div
            className="relative flex flex-col items-center max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxImg.src}
              alt={lightboxImg.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-md shadow-2xl"
            />
            <div className="mt-3 flex items-center gap-4 text-white/80 text-sm">
              {lightboxImg.alt && <span className="italic">{lightboxImg.alt}</span>}
              <span className="text-white/50 text-xs tabular-nums">
                {lightboxIdx + 1} / {images.length}
              </span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .viai-marquee-track {
          animation-name: marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .viai-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .viai-marquee-track {
            animation: none;
          }
        }
        @keyframes lbFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
