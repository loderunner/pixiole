import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

import SWRProvider from '@/src/SWRProvider';
import { ProjectProvider } from '@/src/project';

import './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pixiole',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html>
      <body className="flex h-dvh w-dvw flex-col">
        <SWRProvider>
          <ProjectProvider>{children}</ProjectProvider>
        </SWRProvider>
      </body>
    </html>
  );
}
