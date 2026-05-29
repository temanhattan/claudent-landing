import { useCallback, useRef } from 'react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

const gifImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-portfolio-cosmic-preview-BpvWJ3Nc.gif',
  'https://motionsites.ai/assets/hero-velorah-preview-CJNTtbpd.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
];

export default function PartnerSection() {
  const { ref, isInView } = useInViewAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const lastSpawnTime = useRef(0);

  // DOM Node Recycling Pool for better performance
  const imagePool = useRef<HTMLImageElement[]>([]);
  const poolIndex = useRef(0);
  const MAX_POOL_SIZE = 15; // 1000ms / 80ms interval = ~12.5 max visible at once

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const now = Date.now();
      if (now - lastSpawnTime.current < 80) return;
      lastSpawnTime.current = now;

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      let img: HTMLImageElement;

      // Lazy initialization of the pool
      if (imagePool.current.length < MAX_POOL_SIZE) {
        img = document.createElement('img');
        img.alt = '';
        img.setAttribute('aria-hidden', 'true');
        img.style.position = 'absolute';
        img.style.width = '80px';
        img.style.height = '80px';
        img.style.objectFit = 'cover';
        img.style.borderRadius = '12px';
        img.style.pointerEvents = 'none';
        img.style.zIndex = '10';
        img.style.willChange = 'transform, opacity'; // Hardware acceleration
        imagePool.current.push(img);
        container.appendChild(img);
      } else {
        img = imagePool.current[poolIndex.current];
        poolIndex.current = (poolIndex.current + 1) % MAX_POOL_SIZE;
      }

      // Reset styles without transition to snap into place
      const startRotation = Math.random() * 20 - 10;
      img.style.transition = 'none';
      img.style.opacity = '1';
      img.src = gifImages[Math.floor(Math.random() * gifImages.length)];
      img.style.left = `${x - 40}px`;
      img.style.top = `${y - 40}px`;
      img.style.transform = `rotate(${startRotation}deg) scale(1)`;

      // Force reflow to ensure the non-transitioned state is applied
      void img.offsetWidth;

      // Add back transitions and trigger animation
      img.style.transition = 'opacity 1s ease-out, transform 1s ease-out';

      requestAnimationFrame(() => {
        img.style.opacity = '0';
        img.style.transform = `rotate(${startRotation}deg) scale(0.5)`;
      });
    },
    [MAX_POOL_SIZE]
  );

  return (
    <section ref={ref} className="w-full py-12 px-6">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative max-w-7xl mx-auto py-48 rounded-[40px] bg-white dark:bg-[#111111] overflow-hidden cursor-none"
        style={{
          boxShadow: '0 4px 30px rgba(0,0,0,0.06)',
        }}
      >
        <div className="text-center relative z-20">
          <h2
            className={`font-serif text-[48px] md:text-[64px] lg:text-[80px] text-[#0D212C] dark:text-[#F6FCFF] tracking-tight mb-12 ${
              isInView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.1s' }}
          >
            Partner with us
          </h2>
          <div
            className={`inline-flex items-center rounded-full px-7 py-3 bg-[#051A24] dark:bg-[#F6FCFF] cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform ${
              isInView ? 'animate-fade-in-up' : 'opacity-0'
            }`}
            style={{
              animationDelay: '0.2s',
              boxShadow:
                '0 1px 2px 0 rgba(5,26,36,0.1), 0 4px 4px 0 rgba(5,26,36,0.09), 0 9px 6px 0 rgba(5,26,36,0.05), 0 17px 7px 0 rgba(5,26,36,0.01), 0 26px 7px 0 rgba(5,26,36,0), inset 0 2px 8px 0 rgba(255,255,255,0.5)',
            }}
          >
            <span className="text-white dark:text-[#051A24] text-sm font-medium">
              Start chat with Clauden't
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
