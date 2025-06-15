'use client';

import {
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';

import { applyDiff } from './diff';

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
  /** Creates a new file or overwrites an existing one */
  createFile: (name: string, content: string) => void;
  /** Edits an existing file by applying a diff */
  editFile: (name: string, diffContent: string) => void;
};

const ProjectContext = createContext<ProjectContextValue | null>(null);

/**
 * Project provider component that manages project state
 */
export function ProjectProvider({ children }: PropsWithChildren) {
  const [project, setProject] = useState<Project>({ files: [] });

  const createFile = (name: string, content: string) => {
    setProject((prev) => ({
      files: [...prev.files.filter((f) => f.name !== name), { name, content }],
    }));
  };

  const editFile = (name: string, diffContent: string) => {
    setProject((prev) => {
      const existingFile = prev.files.find((f) => f.name === name);
      if (existingFile !== undefined) {
        const updatedContent = applyDiff(existingFile.content, diffContent);
        return {
          files: prev.files.map((f) =>
            f.name === name ? { ...f, content: updatedContent } : f,
          ),
        };
      }
      return prev;
    });
  };

  return (
    <ProjectContext.Provider
      value={{
        project,
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
