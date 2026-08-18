// src/app/layout.tsx
import './globals.css';
import CometCursorWrapper from '@/components/CometCursorWrapper';
import { JetBrains_Mono } from 'next/font/google';

// JetBrains Mono fontunu Next.js optimize edilmiş modülü ile yapılandır
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
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
      <body className={jetbrainsMono.className}>
        <div className="background-glow"></div>
        <CometCursorWrapper />
        {children}
      </body>
    </html>
  );
}