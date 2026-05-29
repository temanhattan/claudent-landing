import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'tertiary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[#051A24] text-white dark:bg-[#F6FCFF] dark:text-[#051A24]',
  secondary: 'bg-white text-[#051A24] dark:bg-[#1a1a1a] dark:text-[#F6FCFF]',
  tertiary: 'bg-white text-[#051A24] dark:bg-[#1a1a1a] dark:text-[#F6FCFF]',
};

const variantShadows: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    boxShadow:
      '0 1px 2px 0 rgba(5,26,36,0.1), 0 4px 4px 0 rgba(5,26,36,0.09), 0 9px 6px 0 rgba(5,26,36,0.05), 0 17px 7px 0 rgba(5,26,36,0.01), 0 26px 7px 0 rgba(5,26,36,0), inset 0 2px 8px 0 rgba(255,255,255,0.5)',
  },
  secondary: {
    boxShadow: '0 0 0 0.5px rgba(0,0,0,0.05), 0 4px 30px rgba(0,0,0,0.08)',
  },
  tertiary: {
    boxShadow:
      '0 0 0 0.5px rgba(0,0,0,0.05), 0 4px 30px rgba(0,0,0,0.08), 0 1px 2px 0 rgba(5,26,36,0.1)',
  },
};

export default function Button({
  variant = 'primary',
  href,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses =
    'rounded-full px-7 py-3 text-sm font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#051A24] focus-visible:ring-offset-2 dark:focus-visible:ring-[#F6FCFF] dark:focus-visible:ring-offset-[#0a0a0a]';

  const classes = `${baseClasses} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={classes}
        style={variantShadows[variant]}
      >
        {children}
      </a>
    );
  }

  return (
    <button className={classes} style={variantShadows[variant]} {...props}>
      {children}
    </button>
  );
}
