import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface RippleEffectProps {
  containerRef: React.RefObject<HTMLElement>;
  className?: string;
}

export default function RippleEffect({ containerRef, className = '' }: RippleEffectProps) {
  const rippleContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const rippleContainer = rippleContainerRef.current;
    
    if (!container || !rippleContainer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Create ripple element
      const ripple = document.createElement('div');
      ripple.className = 'absolute pointer-events-none rounded-full bg-primary/20';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.width = '4px';
      ripple.style.height = '4px';
      ripple.style.transform = 'translate(-50%, -50%)';
      
      rippleContainer.appendChild(ripple);
      
      // Animate ripple
      gsap.to(ripple, {
        width: '100px',
        height: '100px',
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
        onComplete: () => {
          if (ripple.parentNode) {
            ripple.parentNode.removeChild(ripple);
          }
        }
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, [containerRef]);

  return (
    <div 
      ref={rippleContainerRef} 
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} 
    />
  );
}