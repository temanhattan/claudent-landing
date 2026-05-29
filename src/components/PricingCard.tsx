import React from 'react';

interface PricingCardProps {
  title: string;
  description: React.ReactNode;
  price: string;
  priceSuffix: string;
  isActive: boolean;
  onClick: () => void;
  isInView: boolean;
  animationDelay: string;
  children?: React.ReactNode;
}

export default function PricingCard({
  title,
  description,
  price,
  priceSuffix,
  isActive,
  onClick,
  isInView,
  animationDelay,
  children,
}: PricingCardProps) {
  return (
    <div
      onClick={onClick}
      className={`rounded-[40px] pl-10 pr-10 md:pr-24 pt-3 pb-10 cursor-pointer border border-transparent transition-all duration-500 ease-out select-none ${
        isActive
          ? 'bg-[#051A24] dark:bg-[#0D212C] text-[#F6FCFF] dark:border-transparent'
          : 'bg-white dark:bg-[#12232d] text-[#051A24] dark:text-[#F6FCFF] dark:border-white/5'
      } ${isInView ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{
        animationDelay,
        boxShadow: isActive
          ? 'inset 0 2px 10px rgba(0,0,0,0.3)'
          : '0 4px 16px rgba(0,0,0,0.08)',
      }}
    >
      <div className="pt-8">
        <h3
          className={`text-[22px] font-medium mb-3 transition-colors duration-300 ${
            isActive ? 'text-[#F6FCFF]' : 'text-[#0D212C] dark:text-[#F6FCFF]'
          }`}
        >
          {title}
        </h3>
        <p
          className={`text-sm leading-relaxed mb-6 transition-colors duration-300 ${
            isActive
              ? 'text-[#E0EBF0]'
              : 'text-[#051A24]/70 dark:text-[#E0EBF0]'
          }`}
        >
          {description}
        </p>
        <div className="mb-6">
          <span
            className={`text-2xl font-medium transition-colors duration-300 ${
              isActive ? 'text-[#F6FCFF]' : 'text-[#0D212C] dark:text-[#F6FCFF]'
            }`}
          >
            {price}
          </span>
          <p
            className={`text-sm mt-1 transition-colors duration-300 ${
              isActive
                ? 'text-[#E0EBF0]'
                : 'text-[#051A24]/70 dark:text-[#E0EBF0]'
            }`}
          >
            {priceSuffix}
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
