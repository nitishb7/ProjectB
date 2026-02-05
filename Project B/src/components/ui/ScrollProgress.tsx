import { useEffect, useState, RefObject } from 'react';

interface ScrollProgressProps {
  containerRef: RefObject<HTMLElement>;
  className?: string;
}

export function ScrollProgress({ containerRef, className = '' }: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      if (scrollHeight <= clientHeight) {
        setProgress(0);
        return;
      }
      
      const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setProgress(Math.min(100, Math.max(0, scrollPercent)));
    };

    // Initial calculation
    handleScroll();

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also listen for resize events to recalculate if content changes
    window.addEventListener('resize', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [containerRef]);

  if (progress <= 1) return null; // Hide if at very top (optional, but cleaner)

  return (
    <div className={`absolute top-0 left-0 right-0 h-[3px] z-50 pointer-events-none ${className}`}>
      {/* Background track (optional - user requested overlay style, maybe just the bar) */}
      {/* <div className="absolute inset-0 bg-black/10 dark:bg-white/10" /> */}
      
      {/* Progress Bar */}
      <div 
        className="h-full bg-gradient-to-r from-gray-400 to-gray-200 dark:from-gray-600 dark:to-gray-400 rounded-r-full transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
