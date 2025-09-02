// types/index.d.ts

declare module 'animated-cursor' {
    import React from 'react';
  
    // Component'in kabul ettiği props'ları (özellikleri) tanımlıyoruz
    interface AnimatedCursorProps {
      innerSize?: number;
      outerSize?: number;
      innerScale?: number;
      outerScale?: number;
      outerAlpha?: number;
      hasBlendMode?: boolean;
      innerStyle?: React.CSSProperties;
      outerStyle?: React.CSSProperties;
      clickables?: string[];
    }
  
    // Component'in kendisini bir React Component'i olarak tanımlıyoruz
    const AnimatedCursor: React.FC<AnimatedCursorProps>;
  
    export default AnimatedCursor;
  }