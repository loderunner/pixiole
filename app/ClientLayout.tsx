'use client';

import { ListIcon } from '@phosphor-icons/react';
import { PropsWithChildren, useState } from 'react';

import Sidebar from './Sidebar';

import SWRProvider from '@/src/SWRProvider';
import { ProjectProvider } from '@/src/project';

export default function ClientLayout({ children }: PropsWithChildren) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <SWRProvider>
      <ProjectProvider>
        {/* Floating hamburger button */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="hamburger-button fixed top-4 left-4 z-30 shadow-lg"
          >
            <ListIcon className="h-6 w-6" />
          </button>
        )}

        {/* Main content */}
        <main className="flex h-full flex-col overflow-hidden">{children}</main>

        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </ProjectProvider>
    </SWRProvider>
  );
}
