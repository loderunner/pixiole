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
            className="fixed top-4 left-4 z-30 rounded-lg border border-gray-200 bg-white p-3 shadow-lg hover:bg-gray-50"
          >
            <ListIcon className="h-6 w-6" />
          </button>
        )}

        {/* Main content */}
        <main className="h-full">{children}</main>

        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      </ProjectProvider>
    </SWRProvider>
  );
}
