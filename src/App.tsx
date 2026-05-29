import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import Button from './components/Button';
import TestimonialSection from './components/TestimonialSection';
import PricingSection from './components/PricingSection';
import TestimonialCarousel from './components/TestimonialCarousel';
import ProjectsSection from './components/ProjectsSection';
import PartnerSection from './components/PartnerSection';
import Footer from './components/Footer';
import CopyrightBar from './components/CopyrightBar';
import BottomNav from './components/BottomNav';
import InfiniteMarquee from './components/InfiniteMarquee';
import { useInViewAnimation } from './hooks/useInViewAnimation';

function DarkModeToggle({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-6 right-6 z-50 w-10 h-10 rounded-full bg-white dark:bg-[#111111] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#051A24] focus-visible:ring-offset-2 dark:focus-visible:ring-[#F6FCFF] dark:focus-visible:ring-offset-[#0a0a0a]"
      style={{
        boxShadow: '0 0 0 0.5px rgba(0,0,0,0.05), 0 4px 30px rgba(0,0,0,0.08)',
      }}
      aria-label="Toggle dark mode"
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#F6FCFF]" />
      ) : (
        <Moon className="w-4 h-4 text-[#051A24]" />
      )}
    </button>
  );
}

function HeroSection() {
  const { ref, isInView } = useInViewAnimation();

  return (
    <section
      ref={ref}
      className="flex flex-col items-center text-center max-w-[440px] mx-auto px-6 pt-12 md:pt-16"
    >
      {/* Logo */}
      <h1
        className={`font-serif text-[32px] md:text-[40px] lg:text-[44px] font-semibold text-[#051A24] dark:text-[#F6FCFF] tracking-tight mb-4 ${
          isInView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
        style={{ animationDelay: '0.1s' }}
      >
        Clauden't
      </h1>

      {/* Tagline */}
      <p
        className={`font-mono text-xs md:text-sm text-[#051A24] dark:text-[#F6FCFF] mb-2 ${
          isInView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
        style={{ animationDelay: '0.2s' }}
      >
        The creative team behind Thoutha
      </p>

      {/* Main Heading */}
      <h2
        className={`text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-[#0D212C] dark:text-[#F6FCFF] tracking-tight whitespace-nowrap ${
          isInView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
        style={{ animationDelay: '0.3s' }}
      >
        Build the <span className="font-serif">next wave,</span>
        <br />
        the <span className="font-serif">bold way.</span>
      </h2>

      {/* Description Paragraphs */}
      <div
        className={`flex flex-col gap-6 text-sm md:text-base text-[#051A24] dark:text-[#E0EBF0] leading-relaxed mt-5 md:mt-6 ${
          isInView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
        style={{ animationDelay: '0.4s' }}
      >
        <p>
          We spent 2 years at Apple crafting products used by over a billion
          people. We founded Clauden't to bring that same level of thinking to
          innovators shaping what comes next.
        </p>
        <p>
          The Agency is deliberately small. we guide the creative vision on every
          project, backed by a veteran development crew that moves fast without
          cutting corners.
        </p>
        <p>Projects start at $200 per month.</p>
      </div>

      {/* Buttons */}
      <div
        className={`flex flex-col sm:flex-row gap-3 md:gap-4 mt-5 md:mt-6 w-full sm:w-auto ${
          isInView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
        style={{ animationDelay: '0.5s' }}
      >
        <Button variant="primary">Start a chat</Button>
        <Button variant="secondary">View projects</Button>
      </div>
    </section>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(() => {
    // Check system preference on mount securely (SSR-safe)
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300">
      <DarkModeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />

      <HeroSection />
      <InfiniteMarquee />
      <TestimonialSection />
      <PricingSection />
      <TestimonialCarousel />
      <ProjectsSection />
      <PartnerSection />
      <Footer />
      <CopyrightBar />
      <BottomNav />

      {/* Bottom spacer for fixed nav */}
      <div className="h-24" />
    </div>
  );
}
