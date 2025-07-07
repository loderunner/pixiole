'use client';

import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react';

import { useChatFiles, useCreateFile, useFileUpdater } from '@/src/api/hooks';

/**
 * Represents a single file in a project
 */
export type ProjectFile = {
  name: string;
  content: string;
};

/**
 * Represents a complete project structure
 */
export type Project = {
  files: ProjectFile[];
};

/**
 * Context value type for the project context
 */
export type ProjectContextValue = {
  /** The current project state */
  project: Project;
  /** Whether files are loading */
  isLoading: boolean;
  /** Any error from API calls */
  error: Error | null;
  /** Creates a new file or overwrites an existing one */
  createFile: (name: string, content: string) => Promise<void>;
  /** Updates an existing file with new content */
  editFile: (name: string, content: string) => Promise<void>;
};

const ProjectContext = createContext<ProjectContextValue | null>(null);

type ProjectProviderProps = PropsWithChildren<{
  chatId: string;
}>;

/**
 * Project provider component that manages project state with SWR
 */
export function ProjectProvider({ children, chatId }: ProjectProviderProps) {
  const {
    files,
    isLoading: filesLoading,
    error: filesError,
  } = useChatFiles(chatId);

  const { createFile: createFileAPI, error: createError } =
    useCreateFile(chatId);
  const createFile = useCallback(
    async (name: string, content: string) => {
      await createFileAPI({ name, content });
    },
    [createFileAPI],
  );

  const { updateFile, error: updateError } = useFileUpdater(chatId);
  const editFile = useCallback(
    async (name: string, content: string) => {
      await updateFile({ fileName: name, content });
    },
    [updateFile],
  );

  const project: Project = useMemo(
    () => ({
      files: files.map((file) => ({
        name: file.name,
        content: file.content,
      })),
    }),
    [files],
  );

  const error = filesError ?? createError ?? updateError ?? null;

  return (
    <ProjectContext.Provider
      value={{
        project,
        isLoading: filesLoading,
        error,
        createFile,
        editFile,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

/**
 * Hook to access the project context
 */
export function useProject(): ProjectContextValue {
  const context = useContext(ProjectContext);
  if (context === null) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
}
