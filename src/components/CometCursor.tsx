// src/components/CometCursor.tsx
'use client';
import { useEffect, useRef } from 'react';

const CometCursor = () => {
  const followerRef = useRef<HTMLDivElement>(null);
  
  const pos = useRef({ x: 0, y: 0 });
  const vel = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      if (followerRef.current) {
        const currentX = parseFloat(followerRef.current.style.left || '0');
        const currentY = parseFloat(followerRef.current.style.top || '0');
        
        const dx = pos.current.x - currentX;
        const dy = pos.current.y - currentY;
        
        vel.current.x = dx * 0.15;
        vel.current.y = dy * 0.15;

        followerRef.current.style.left = `${currentX + vel.current.x}px`;
        followerRef.current.style.top = `${currentY + vel.current.y}px`;

        const speed = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2);
        const angle = (Math.atan2(vel.current.y, vel.current.x) * 180) / Math.PI;

        const scaleX = 1 + Math.min(speed / 15, 1);
        followerRef.current.style.transform = `translate(-50%, -50%) rotate(${angle}deg) scaleX(${scaleX}) scaleY(1)`;
      }
      requestAnimationFrame(animate);
    };
    
    const animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <div ref={followerRef} className="comet-cursor" />;
};

export default CometCursor;