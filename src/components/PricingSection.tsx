import { useState } from 'react';
import Button from './Button';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

export default function PricingSection() {
  const { ref, isInView } = useInViewAnimation();
  const [activeCard, setActiveCard] = useState<'partnership' | 'custom'>('partnership');

  return (
    <section ref={ref} className="w-full py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:justify-end md:max-w-4xl md:ml-auto">
        {/* Card 1 - Monthly Partnership */}
        <div
          onClick={() => setActiveCard('partnership')}
          className={`rounded-[40px] pl-10 pr-10 md:pr-24 pt-3 pb-10 cursor-pointer border border-transparent transition-all duration-500 ease-out select-none ${
            activeCard === 'partnership'
              ? 'bg-[#051A24] dark:bg-[#0D212C] text-[#F6FCFF] dark:border-transparent'
              : 'bg-white dark:bg-[#12232d] text-[#051A24] dark:text-[#F6FCFF] dark:border-white/5'
          } ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{
            animationDelay: '0.1s',
            boxShadow:
              activeCard === 'partnership'
                ? 'inset 0 2px 10px rgba(0,0,0,0.3)'
                : '0 4px 16px rgba(0,0,0,0.08)',
          }}
        >
          <div className="pt-8">
            <h3
              className={`text-[22px] font-medium mb-3 transition-colors duration-300 ${
                activeCard === 'partnership'
                  ? 'text-[#F6FCFF]'
                  : 'text-[#0D212C] dark:text-[#F6FCFF]'
              }`}
            >
              Monthly Partnership
            </h3>
            <p
              className={`text-sm leading-relaxed mb-6 transition-colors duration-300 ${
                activeCard === 'partnership'
                  ? 'text-[#E0EBF0]'
                  : 'text-[#051A24]/70 dark:text-[#E0EBF0]'
              }`}
            >
              A dedicated creative Development team.
              <br />
              You work directly with Us.
            </p>
            <div className="mb-6">
              <span
                className={`text-2xl font-medium transition-colors duration-300 ${
                  activeCard === 'partnership'
                    ? 'text-[#F6FCFF]'
                    : 'text-[#0D212C] dark:text-[#F6FCFF]'
                }`}
              >
                $200
              </span>
              <p
                className={`text-sm mt-1 transition-colors duration-300 ${
                  activeCard === 'partnership'
                    ? 'text-[#E0EBF0]'
                    : 'text-[#051A24]/70 dark:text-[#E0EBF0]'
                }`}
              >
                Monthly
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant={activeCard === 'partnership' ? 'secondary' : 'primary'}
              >
                Start a chat
              </Button>
              <Button
                variant={activeCard === 'partnership' ? 'secondary' : 'primary'}
                className={`!bg-transparent transition-all duration-300 border ${
                  activeCard === 'partnership'
                    ? '!text-[#E0EBF0] border-[#E0EBF0]/20'
                    : '!text-[#051A24] dark:!text-[#F6FCFF] border-[#051A24]/20 dark:border-[#F6FCFF]/20'
                }`}
              >
                How it works
              </Button>
            </div>
          </div>
        </div>

        {/* Card 2 - Custom Project */}
        <div
          onClick={() => setActiveCard('custom')}
          className={`rounded-[40px] pl-10 pr-10 md:pr-24 pt-3 pb-10 cursor-pointer border border-transparent transition-all duration-500 ease-out select-none ${
            activeCard === 'custom'
              ? 'bg-[#051A24] dark:bg-[#0D212C] text-[#F6FCFF] dark:border-transparent'
              : 'bg-white dark:bg-[#12232d] text-[#051A24] dark:text-[#F6FCFF] dark:border-white/5'
          } ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{
            animationDelay: '0.2s',
            boxShadow:
              activeCard === 'custom'
                ? 'inset 0 2px 10px rgba(0,0,0,0.3)'
                : '0 4px 16px rgba(0,0,0,0.08)',
          }}
        >
          <div className="pt-8">
            <h3
              className={`text-[22px] font-medium mb-3 transition-colors duration-300 ${
                activeCard === 'custom'
                  ? 'text-[#F6FCFF]'
                  : 'text-[#0D212C] dark:text-[#F6FCFF]'
              }`}
            >
              Custom Project
            </h3>
            <p
              className={`text-sm leading-relaxed mb-6 transition-colors duration-300 ${
                activeCard === 'custom'
                  ? 'text-[#E0EBF0]'
                  : 'text-[#051A24]/70 dark:text-[#E0EBF0]'
              }`}
            >
              Fixed scope, fixed timeline.
              <br />
              Same team, same standards.
            </p>
            <div className="mb-6">
              <span
                className={`text-2xl font-medium transition-colors duration-300 ${
                  activeCard === 'custom'
                    ? 'text-[#F6FCFF]'
                    : 'text-[#0D212C] dark:text-[#F6FCFF]'
                }`}
              >
                $250
              </span>
              <p
                className={`text-sm mt-1 transition-colors duration-300 ${
                  activeCard === 'custom'
                    ? 'text-[#E0EBF0]'
                    : 'text-[#051A24]/70 dark:text-[#E0EBF0]'
                }`}
              >
                Minimum
              </p>
            </div>
            <Button variant={activeCard === 'custom' ? 'secondary' : 'tertiary'}>
              Start a chat
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
