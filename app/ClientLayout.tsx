'use client';

import { ListIcon } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

import Sidebar from './Sidebar';

import SWRProvider from '@/src/SWRProvider';
import { ProjectProvider } from '@/src/project';

type Props = {
  children: React.ReactNode;
};

export default function ClientLayout({ children }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(true); // Default to dark mode

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    const shouldBeDark =
      savedTheme === 'dark' || (savedTheme === null && prefersDark);
    setIsDark(shouldBeDark);

    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <SWRProvider>
      <ProjectProvider>
        <div className="relative flex h-screen w-full flex-row">
          {/* Header with just hamburger button */}
          <div className="fixed top-4 left-4 z-30">
            <button
              onClick={() => setSidebarOpen(true)}
              className="hamburger-button"
              aria-label="Open menu"
            >
              <ListIcon className="text-xl" />
            </button>
          </div>

          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
            isDark={isDark}
            onToggleTheme={toggleTheme}
          />

          <main className="size-full">{children}</main>
        </div>
      </ProjectProvider>
    </SWRProvider>
  );
}
