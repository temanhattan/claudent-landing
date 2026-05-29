import { ArrowUpRight } from 'lucide-react';
import Button from './Button';
import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { getSafeUrl } from '../utils/security';

export default function Footer() {
  const { ref, isInView } = useInViewAnimation();

  return (
    <footer ref={ref} className="w-full py-12 px-6 max-w-[1200px] mx-auto">
      <div
        className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-8 ${
          isInView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        {/* Left: CTA Button */}
        <Button variant="primary">Start a chat</Button>

        {/* Right: Links */}
        <div className="flex items-start gap-8">
          <ArrowUpRight className="w-5 h-5 text-[#051A24] dark:text-[#F6FCFF] mt-1 shrink-0" />

          {/* Column 1 */}
          <div className="flex flex-col gap-3">
            <a
              href={getSafeUrl('#services')}
              className="text-base text-[#051A24] dark:text-[#F6FCFF] hover:opacity-70 transition-opacity rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#051A24] focus-visible:ring-offset-2 dark:focus-visible:ring-[#F6FCFF] dark:focus-visible:ring-offset-[#0a0a0a]"
            >
              Services
            </a>
            <a
              href={getSafeUrl('#work')}
              className="text-base text-[#051A24] dark:text-[#F6FCFF] hover:opacity-70 transition-opacity rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#051A24] focus-visible:ring-offset-2 dark:focus-visible:ring-[#F6FCFF] dark:focus-visible:ring-offset-[#0a0a0a]"
            >
              Work
            </a>
            <a
              href={getSafeUrl('#about')}
              className="text-base text-[#051A24] dark:text-[#F6FCFF] hover:opacity-70 transition-opacity rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#051A24] focus-visible:ring-offset-2 dark:focus-visible:ring-[#F6FCFF] dark:focus-visible:ring-offset-[#0a0a0a]"
            >
              About
            </a>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            <a
              href={getSafeUrl('https://x.com')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-[#051A24] dark:text-[#F6FCFF] hover:opacity-70 transition-opacity rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#051A24] focus-visible:ring-offset-2 dark:focus-visible:ring-[#F6FCFF] dark:focus-visible:ring-offset-[#0a0a0a]"
            >
              x.com
            </a>
            <a
              href={getSafeUrl('https://linkedin.com')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base text-[#051A24] dark:text-[#F6FCFF] hover:opacity-70 transition-opacity rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#051A24] focus-visible:ring-offset-2 dark:focus-visible:ring-[#F6FCFF] dark:focus-visible:ring-offset-[#0a0a0a]"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
