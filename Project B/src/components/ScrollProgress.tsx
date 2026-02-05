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
    const resizeObserver = new ResizeObserver(() => handleScroll());
    resizeObserver.observe(container);
    window.addEventListener('resize', handleScroll);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  return (
    <div className={`absolute top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none ${className}`}>
      {/* Progress Bar */}
      <div 
        className="h-full bg-gradient-to-r from-gray-500/80 to-white/80 dark:from-gray-500/80 dark:to-white/80 rounded-r-full transition-all duration-100 ease-out shadow-[0_1px_2px_rgba(0,0,0,0.1)]"
        style={{ width: `${progress}%`, opacity: progress > 1 ? 1 : 0 }}
      />
    </div>
  );
}
