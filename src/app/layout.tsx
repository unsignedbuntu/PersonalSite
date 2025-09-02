// src/app/layout.tsx
import './globals.css';
import dynamic from 'next/dynamic';

const CometCursor = dynamic(() => import('@/components/CometCursor'), {
  ssr: false, 
});

export const metadata = {
  title: 'Atalay Beyazıt - Portföy',
  description: 'Full Stack Developer',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      {/* Body etiketinde artık className yok, tüm stiller globals.css'ten geliyor */}
      <body>
        <div className="background-glow"></div>
        <CometCursor />
        {children}
      </body>
    </html>
  );
}