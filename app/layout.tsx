import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import ClientLayout from './ClientLayout';

import './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pixiole',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html>
      <body className="matrix-bg flex h-dvh w-dvw flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
