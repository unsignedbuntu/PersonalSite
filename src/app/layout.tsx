// src/app/layout.tsx
import './globals.css';
import CometCursorWrapper from '@/components/CometCursorWrapper';

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
        <CometCursorWrapper />
        {children}
      </body>
    </html>
  );
}