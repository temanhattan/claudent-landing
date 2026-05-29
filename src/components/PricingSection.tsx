import { useState } from 'react';
import Button from './Button';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import PricingCard from './PricingCard';

export default function PricingSection() {
  const { ref, isInView } = useInViewAnimation();
  const [activeCard, setActiveCard] = useState<'partnership' | 'custom'>('partnership');

  return (
    <section ref={ref} className="w-full py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:justify-end md:max-w-4xl md:ml-auto">
        {/* Card 1 - Monthly Partnership */}
        <PricingCard
          title="Monthly Partnership"
          description={
            <>
              A dedicated creative Development team.
              <br />
              You work directly with Us.
            </>
          }
          price="$200"
          priceSuffix="Monthly"
          isActive={activeCard === 'partnership'}
          onClick={() => setActiveCard('partnership')}
          isInView={isInView}
          animationDelay="0.1s"
        >
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
        </PricingCard>

        {/* Card 2 - Custom Project */}
        <PricingCard
          title="Custom Project"
          description={
            <>
              Fixed scope, fixed timeline.
              <br />
              Same team, same standards.
            </>
          }
          price="$250"
          priceSuffix="Minimum"
          isActive={activeCard === 'custom'}
          onClick={() => setActiveCard('custom')}
          isInView={isInView}
          animationDelay="0.2s"
        >
          <Button variant={activeCard === 'custom' ? 'secondary' : 'tertiary'}>
            Start a chat
          </Button>
        </PricingCard>
      </div>
    </section>
  );
}
