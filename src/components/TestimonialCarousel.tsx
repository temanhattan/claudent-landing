import { useState, useEffect, useCallback, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      'With very little guidance team delivered Software Solutions that were consistently spot on. Their ability to understand our vision and translate it into reality was remarkable.',
    name: 'Marcus Anderson',
    role: '→ CEO, Data.storage',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    quote:
      "Clauden't led the creation of our best fundraising deck to date! The team's strategic thinking and design execution were world-class.",
    name: 'alexwu',
    role: '→ Founder, Nexgate',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    quote:
      'Working with Clauden\'t transformed our product vision into a compelling narrative. They elevated every touchpoint of our user experience.',
    name: 'James Mitchell',
    role: '→ VP Product, LaunchPad',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    quote:
      'The Solutions quality exceeded our expectations. Every deliverable was polished, thoughtful, and ready for production.',
    name: 'Rachel Foster',
    role: '→ Co-founder, Nexus Labs',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
  {
    quote:
      'Incredible work from start to finish. The team brought a level of craft and attention to detail that is rare in the industry.',
    name: 'David Zhang',
    role: '→ Head of Design, Paradigm Labs',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
  },
];

// Triple the testimonials for infinite scroll
const tripledTestimonials = [...testimonials, ...testimonials, ...testimonials];

function QuoteSVG() {
  return (
    <svg
      width="32"
      height="24"
      viewBox="0 0 32 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-[#0D212C] dark:text-[#F6FCFF]"
    >
      <path
        d="M0 24V14.4C0 11.7333 0.466667 9.33333 1.4 7.2C2.33333 5.06667 3.6 3.26667 5.2 1.8C6.8 0.333333 8.66667 -0.533333 10.8 -0.8L11.6 2C9.6 2.53333 7.93333 3.66667 6.6 5.4C5.26667 7.13333 4.6 9.06667 4.6 11.2H10V24H0ZM18 24V14.4C18 11.7333 18.4667 9.33333 19.4 7.2C20.3333 5.06667 21.6 3.26667 23.2 1.8C24.8 0.333333 26.6667 -0.533333 28.8 -0.8L29.6 2C27.6 2.53333 25.9333 3.66667 24.6 5.4C23.2667 7.13333 22.6 9.06667 22.6 11.2H28V24H18Z"
        fill="currentColor"
        fillOpacity="0.08"
      />
    </svg>
  );
}

export default function TestimonialCarousel() {
  const { ref, isInView } = useInViewAnimation();
  const [currentIndex, setCurrentIndex] = useState(testimonials.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const startAutoScroll = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + 1);
      }
    }, 3000);
  }, [isPaused]);

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoScroll]);

  // Reset position when reaching the end or beginning of tripled array
  useEffect(() => {
    if (currentIndex >= testimonials.length * 2) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(testimonials.length);
      }, 800);
      return () => clearTimeout(timeout);
    }
    if (currentIndex < testimonials.length) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(testimonials.length + (currentIndex % testimonials.length));
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  const goNext = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
    startAutoScroll();
  };

  const goPrev = () => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
    startAutoScroll();
  };

  return (
    <section
      ref={ref}
      className="w-full py-20 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header */}
      <div
        className={`flex flex-col md:flex-row items-start md:items-center justify-between md:max-w-4xl md:ml-auto px-6 mb-10 ${
          isInView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
        style={{ animationDelay: '0.1s' }}
      >
        <h2 className="text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-[#0D212C] dark:text-[#F6FCFF] tracking-tight mb-4 md:mb-0">
          What <span className="font-serif">builders</span> say
        </h2>
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-5 h-5 fill-black text-black dark:fill-white dark:text-white"
              />
            ))}
          </div>
          <span className="text-sm font-medium text-[#0D212C] dark:text-[#F6FCFF] ml-1">
            Clutch 5/5
          </span>
        </div>
      </div>

      {/* Carousel Navigation */}
      <div className="flex items-center gap-3 px-6 mb-6 md:max-w-4xl md:ml-auto">
        <button
          onClick={goPrev}
          className="w-12 h-12 rounded-full border border-[#0D212C]/20 dark:border-[#F6FCFF]/20 flex items-center justify-center hover:bg-[#051A24]/5 dark:hover:bg-[#F6FCFF]/5 transition-colors cursor-pointer"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 text-[#0D212C] dark:text-[#F6FCFF]" />
        </button>
        <button
          onClick={goNext}
          className="w-12 h-12 rounded-full border border-[#0D212C]/20 dark:border-[#F6FCFF]/20 flex items-center justify-center hover:bg-[#051A24]/5 dark:hover:bg-[#F6FCFF]/5 transition-colors cursor-pointer"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 text-[#0D212C] dark:text-[#F6FCFF]" />
        </button>
      </div>

      {/* Cards Track */}
      <div className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-6 pl-6"
          style={{
            transform: `translateX(calc(-${currentIndex} * (min(427.5px, calc(100vw - 48px)) + 24px)))`,
            transition: isTransitioning
              ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
              : 'none',
          }}
        >
          {tripledTestimonials.map((t, idx) => (
            <div
              key={idx}
              className="shrink-0 bg-white dark:bg-[#111111] rounded-[32px] md:rounded-[40px] px-6 md:pl-10 md:pr-24 py-8"
              style={{
                width: 'min(427.5px, calc(100vw - 48px))',
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              }}
            >
              <QuoteSVG />
              <p className="text-base text-[#0D212C] dark:text-[#F6FCFF] leading-relaxed mt-4 mb-6">
                {t.quote}
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="font-semibold text-sm text-[#0D212C] dark:text-[#F6FCFF]">
                    {t.name}
                  </p>
                  <p className="text-xs text-[#273C46] dark:text-[#E0EBF0]">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
