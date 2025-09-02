// src/components/CustomCursor.tsx

'use client'; // Bu component'in tarayıcıda çalışacağını belirtir

import dynamic from 'next/dynamic';

// Kütüphaneyi sadece client tarafında yüklenecek şekilde import et
const AnimatedCursor = dynamic(() => import('animated-cursor'), {
  ssr: false, // Server-side rendering'i bu component için kapat
});

const CustomCursor = () => {
  return (
    <AnimatedCursor
      innerSize={8}
      outerSize={35}
      innerScale={1}
      outerScale={2}
      outerAlpha={0}
      innerStyle={{
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // İç noktanın rengi
      }}
      outerStyle={{
        border: '3px solid rgba(255, 255, 255, 0.7)', // Dış halkanın rengi
      }}
    />
  );
};

export default CustomCursor;