import { Quote } from 'lucide-react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

export default function TestimonialSection() {
  const { ref, isInView } = useInViewAnimation();

  return (
    <section ref={ref} className="py-12 px-6 max-w-2xl mx-auto">
      {/* Quote Icon */}
      <div
        className={`mb-6 ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '0.1s' }}
      >
        <Quote className="w-6 h-6 text-slate-900 dark:text-slate-100" />
      </div>

      {/* Quote Text */}
      <blockquote
        className={`text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-[#0D212C] dark:text-[#F6FCFF] tracking-tight mb-6 ${
          isInView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
        style={{ animationDelay: '0.2s' }}
      >
        'we left{' '}
        <span className="font-serif">Apple</span> to build the team we always
        wanted to work with'
      </blockquote>

      {/* Author */}
      <p
        className={`italic text-sm text-[#273C46] dark:text-[#E0EBF0] mb-10 ${
          isInView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
        style={{ animationDelay: '0.3s' }}
      >
        Clauden't
      </p>

      {/* Company Logos as Text */}
      <div
        className={`flex items-center gap-8 ${
          isInView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
        style={{ animationDelay: '0.4s' }}
      >
        <span
          className="font-medium text-slate-900 dark:text-slate-100"
          style={{ width: '80px', fontSize: '24px' }}
        >
          Apple
        </span>
        <span
          className="font-medium text-slate-900 dark:text-slate-100"
          style={{ width: '83px', fontSize: '24px' }}
        >
          Google
        </span>
        <span
          className="font-medium text-slate-900 dark:text-slate-100"
          style={{ width: '110px', fontSize: '24px' }}
        >
          DEPI
        </span>
      </div>
    </section>
  );
}
