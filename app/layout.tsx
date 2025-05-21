import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pixiole',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html>
      <body className="flex h-svh w-svw flex-col">
        {children}
      </body>
    </html>
  );
}
