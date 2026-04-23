// src/components/CometCursorWrapper.tsx
'use client';
import dynamic from 'next/dynamic';

const CometCursor = dynamic(() => import('@/components/CometCursor'), {
  ssr: false,
});

export default function CometCursorWrapper() {
  return <CometCursor />;
}
