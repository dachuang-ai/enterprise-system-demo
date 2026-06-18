import { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  characters?: string;
  className?: string;
  parentClassName?: string;
  animateOn?: 'view' | 'hover';
  [key: string]: any;
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  className = '',
  parentClassName = '',
  animateOn = 'hover',
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });

  useEffect(() => {
    let active = true;
    const shouldAnimate = animateOn === 'view' ? isInView : isHovering;

    if (shouldAnimate && !isRevealed) {
      let iteration = 0;
      const totalIterations = sequential ? text.length * 2 + maxIterations : maxIterations;

      const interval = setInterval(() => {
        if (!active) return;

        const nextText = text.split('').map((char, index) => {
          if (char === ' ') return ' ';

          let revealIndex = index;
          if (revealDirection === 'end') revealIndex = text.length - 1 - index;
          if (revealDirection === 'center') revealIndex = Math.abs(Math.floor(text.length / 2) - index);

          if (sequential) {
            if (iteration > revealIndex * 2) {
              return char;
            }
          } else {
            if (iteration >= maxIterations) {
              return char;
            }
          }

          return characters[Math.floor(Math.random() * characters.length)];
        }).join('');

        setDisplayText(nextText);
        iteration++;

        if (iteration >= totalIterations) {
          clearInterval(interval);
          setDisplayText(text);
          if (animateOn === 'view') setIsRevealed(true);
        }
      }, speed);

      return () => {
        active = false;
        clearInterval(interval);
      };
    }
  }, [text, speed, maxIterations, sequential, revealDirection, characters, isInView, isHovering, animateOn, isRevealed]);

  return (
    <span
      ref={containerRef}
      className={`inline-block ${parentClassName}`}
      onMouseEnter={() => animateOn === 'hover' && setIsHovering(true)}
      onMouseLeave={() => animateOn === 'hover' && setIsHovering(false)}
      {...props}
    >
      <span className={className}>{displayText}</span>
    </span>
  );
}
