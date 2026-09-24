'use client';

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from 'react';

type FadeInProps = {
  children: ReactNode;
  /** Delay in seconds once visible (use 0.1 steps for 100ms stagger). */
  delay?: number;
  className?: string;
  y?: number;
};

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(mq.matches);
    const onChange = () => setReduce(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduce;
}

/**
 * Fade + slight slide-up when entering the viewport.
 * Intersection Observer only — no animation library.
 */
export function FadeIn({ children, delay = 0, className = '', y = 20 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={
        {
          '--reveal-y': `${y}px`,
          transitionDelay: visible ? `${Math.round(delay * 1000)}ms` : '0ms',
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

/** Parent that staggers child FadeIn / StaggerItem by 100ms each. */
export function Stagger({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child;
        const el = child as ReactElement<{ delay?: number }>;
        return cloneElement(el, { delay: (el.props.delay ?? 0) + i * 0.1 });
      })}
    </div>
  );
}

export function StaggerItem({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <FadeIn className={className} delay={delay} y={20}>
      {children}
    </FadeIn>
  );
}
