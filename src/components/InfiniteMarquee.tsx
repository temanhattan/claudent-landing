import React, { useRef, useEffect } from 'react';

const marqueeImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif',
  'https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
];

// Duplicate for seamless loop
const doubledImages = [...marqueeImages, ...marqueeImages];

export default function InfiniteMarquee() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const rafId = useRef<number | null>(null);

  // Auto scroll animation loop
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const autoScroll = () => {
      if (!isDragging.current && el) {
        el.scrollLeft += 1.5; // Auto-scroll speed
        const halfWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft = 0;
        }
      }
      rafId.current = requestAnimationFrame(autoScroll);
    };

    rafId.current = requestAnimationFrame(autoScroll);

    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.clientX;
    startScrollLeft.current = el.scrollLeft;
  };

  const updateScrollPosition = (clientX: number) => {
    const el = scrollRef.current;
    if (!el) return;

    const walk = (clientX - startX.current) * 1.5; // Drag sensitivity
    let newScrollLeft = startScrollLeft.current - walk;

    const halfWidth = el.scrollWidth / 2;
    if (newScrollLeft >= halfWidth) {
      newScrollLeft = newScrollLeft % halfWidth;
    } else if (newScrollLeft < 0) {
      newScrollLeft = halfWidth + (newScrollLeft % halfWidth);
    }

    el.scrollLeft = newScrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    updateScrollPosition(e.clientX);
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.touches[0].clientX;
    startScrollLeft.current = el.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    updateScrollPosition(e.touches[0].clientX);
  };

  return (
    <section className="w-full mt-16 md:mt-20 mb-16 overflow-hidden select-none">
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUpOrLeave}
        className="flex overflow-x-hidden cursor-grab active:cursor-grabbing"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div className="flex shrink-0">
          {doubledImages.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Project preview ${(idx % marqueeImages.length) + 1}`}
              className="h-[280px] md:h-[500px] object-cover mx-3 rounded-2xl shadow-lg shrink-0 pointer-events-none"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
