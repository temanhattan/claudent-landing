import { useEffect, useRef, useState } from 'react';
import { useInViewAnimation } from '../hooks/useInViewAnimation';

interface Project {
  name: string;
  description: string;
  image?: string;
  videoUrl?: string;
  link?: string;
}

const projects: Project[] = [
  {
    name: 'Thoutha',
    description: 'From idea to Thounds of users everyday (Live Proof of Concept)',
    videoUrl: `${import.meta.env.BASE_URL}thoutha-video.mp4`,
    link: 'https://thoutha.page/',
  },
];

function ProjectItem({ project }: { project: Project }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={itemRef}
      className={`group flex flex-col ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
    >
      {/* Title & Description */}
      <div className="ml-20 md:ml-28 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl md:text-3xl font-semibold text-[#051A24] dark:text-[#F6FCFF] mb-2">
            {project.name}
          </h3>
          <p className="text-sm md:text-base text-[#051A24]/70 dark:text-[#E0EBF0]">
            {project.description}
          </p>
        </div>
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#051A24] dark:text-[#F6FCFF] border border-[#051A24]/10 dark:border-[#F6FCFF]/10 rounded-full px-4 py-2 hover:bg-[#051A24]/5 dark:hover:bg-[#F6FCFF]/5 transition-colors self-start sm:self-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#051A24] focus-visible:ring-offset-2 dark:focus-visible:ring-[#F6FCFF] dark:focus-visible:ring-offset-[#0a0a0a]"
          >
            Open Website ↗
          </a>
        )}
      </div>

      {/* Frame / Embed Content */}
      <div className="overflow-hidden rounded-2xl shadow-lg border border-slate-200/60 dark:border-slate-800 bg-[#fbfcfd] dark:bg-[#0a0a0a]">
        {project.videoUrl ? (
          <div className="w-full flex flex-col">
            {/* Elegant Browser Top Bar */}
            <div className="w-full h-11 bg-slate-100/80 dark:bg-[#161719] border-b border-slate-200/50 dark:border-slate-800/80 flex items-center px-4 justify-between select-none">
              {/* Window controls */}
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              {/* Address bar */}
              <div className="w-1/2 max-w-xs md:max-w-md h-6 bg-white dark:bg-[#0d0e10] border border-slate-200/40 dark:border-slate-800/30 rounded-md text-[10px] md:text-xs text-slate-500/80 dark:text-slate-400/80 flex items-center justify-center font-mono truncate px-4">
                thoutha.page
              </div>
              {/* Dummy space for alignment */}
              <div className="w-12" />
            </div>
            {/* Local Autoplaying demo video */}
            <video
              src={project.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
            />
          </div>
        ) : (
          <img
            src={project.image}
            alt={project.name}
            className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.01]"
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const { ref } = useInViewAnimation();

  return (
    <section ref={ref} className="max-w-[1200px] mx-auto px-6 py-12" id="work">
      <div className="flex flex-col gap-16 md:gap-20">
        {projects.map((project, idx) => (
          <ProjectItem key={idx} project={project} />
        ))}
      </div>
    </section>
  );
}
