import { useRef, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface OttRowProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function OttRow({ title, subtitle, children }: OttRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative py-12 group">
      <div className="px-6 md:px-12 mb-6">
        <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
        {subtitle && <p className="text-white/60 text-lg">{subtitle}</p>}
      </div>

      <div className="relative">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-0 bottom-0 z-40 w-16 bg-gradient-to-r from-[#0f1115] to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-start pl-4 text-white hover:text-white/80"
        >
          <ChevronLeft size={36} />
        </button>

        <div 
          ref={rowRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar px-6 md:px-12 pb-8 pt-4 snap-x"
        >
          {children}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-0 bottom-0 z-40 w-16 bg-gradient-to-l from-[#0f1115] to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-end pr-4 text-white hover:text-white/80"
        >
          <ChevronRight size={36} />
        </button>
      </div>
    </div>
  );
}
