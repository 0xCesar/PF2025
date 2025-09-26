'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Cursor() {
  const [cursorState, setCursorState] = useState<'default' | 'hover-link' | 'hover-project'>('default');
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);


    useEffect(() => {
      const handleCursorStateChange = (e: Event) => {
        const customEvent = e as CustomEvent<"default" | "hover-link" | "hover-project">;
        setCursorState(customEvent.detail);
        console.log('Cursor state changed:', customEvent.detail);
      };

      window.addEventListener("cursor-state-change", handleCursorStateChange);
      return () => {
        window.removeEventListener("cursor-state-change", handleCursorStateChange);
      };
    }, []);


  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!cursorRef.current) return;

      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.2,
        ease: 'power3.out',
      });
    };

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('.hover-link')) {
        setCursorState('hover-link');
      } else if (target.closest('.hover-project')) {
        setCursorState('hover-project');
      }
    };

    const handleMouseLeave = () => {
      setCursorState('default');
    };

    const elements = document.querySelectorAll('.hover-link, .hover-project');
    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
  };
  }, );

  // Animate style changes based on cursor state
  useEffect(() => {
    if (!cursorRef.current) return;

    const timeline = gsap.timeline();

    if (cursorState === 'hover-link') {
      timeline.to(cursorRef.current, {
        width: 30,
        height: 30,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        border: 'none',
        duration: 0.2,
        ease: 'power2.out',
      });
    } else if (cursorState === 'hover-project') {
      timeline.to(cursorRef.current, {
        width: 75,
        height: 75,
        border: '2px solid white',
        duration: 0.2,
        ease: 'power2.out',
      });
    } else {
      timeline.to(cursorRef.current, {
        width: 20,
        height: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        border: 'none',
        duration: 0.2,
        ease: 'power2.out',
      });
    }
    if (cursorState === 'hover-link' && haloRef.current) {
      gsap.fromTo(haloRef.current, {
        scale: 0.8,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    } else if (haloRef.current) {
      gsap.to(haloRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.in',
      });
    }
    
  }, [cursorState]);
    if (isMobile) {
    return ;
  }
  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 20,
        height: 20,
        borderRadius: '50%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '12px',
        fontFamily: 'sans-serif',
        fontWeight: 500,
        textTransform: 'uppercase',
      }}
    >
      {cursorState === 'hover-project' && (
        <span ref={textRef} style={{ pointerEvents: 'none' }}>
          Discover
        </span>
      )}

      {cursorState === 'hover-link' && (
        <div
          ref={haloRef}
          style={{
            position: 'absolute',
            width: 35,
            height: 35,
            borderRadius: '50%',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            border: '1px solid rgba(0, 0, 0, 0.7)',
            transform: 'translate(-50%, -50%)',
            top: '50%',
            left: '50%',
            zIndex: -1,
          }}
        />
      )}

    </div>
  );
}
