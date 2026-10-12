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
  title: 'Atalay Beyazıt | Computer Engineer & Full-Stack Developer',
  description: 'Computer Engineer and Full-Stack Developer specializing in .NET Core and TypeScript.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a0a0a',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={jetbrainsMono.className}>
        <div className="background-glow"></div>
        <CometCursorWrapper />
        {children}
      </body>
    </html>
  );
}