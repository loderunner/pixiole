'use client';

import {
  CaretLeftIcon,
  FileIcon,
  FolderIcon,
  XIcon,
} from '@phosphor-icons/react';
import { useEffect, useState } from 'react';

import { useChatFile, useChatFiles } from '@/src/api/hooks';
import { highlightCode, isDarkMode } from '@/src/syntax-highlighter';

type Props = {
  chatId: string;
  onClose: () => void;
};

type ViewMode = 'list' | 'file';

export default function FilesPanel({ chatId, onClose }: Props) {
  const { files, isLoading: filesLoading } = useChatFiles(chatId);
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [highlightedContent, setHighlightedContent] = useState<string>('');
  const [isHighlighting, setIsHighlighting] = useState(false);
  const { file, isLoading: fileLoading } = useChatFile(chatId, selectedFile);

  const handleFileClick = (fileName: string) => {
    setSelectedFile(fileName);
    setViewMode('file');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedFile('');
    setHighlightedContent('');
  };

  // Effect to highlight file content when file loads
  useEffect(() => {
    if (file !== undefined && file.content !== '' && viewMode === 'file') {
      setIsHighlighting(true);

      const highlightAsync = async () => {
        try {
          const darkMode = isDarkMode();
          const highlighted = await highlightCode(
            file.content,
            file.name,
            darkMode,
          );
          setHighlightedContent(highlighted);
        } catch (_error) {
          // Fallback to plain text
          setHighlightedContent(
            `<pre class="shiki"><code>${file.content}</code></pre>`,
          );
        } finally {
          setIsHighlighting(false);
        }
      };

      highlightAsync();
    }
  }, [file, viewMode]);

  return (
    <div className="terminal-sidebar files-panel h-full w-full lg:w-96">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-emerald-600/50 bg-slate-100/50 p-4 dark:border-emerald-500/50 dark:bg-gray-900/50">
        <div className="flex items-center space-x-2">
          {viewMode === 'file' && (
            <button
              onClick={handleBackToList}
              className="terminal-button relative rounded-full p-2"
            >
              <CaretLeftIcon className="h-5 w-5" />
            </button>
          )}
          <FolderIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          <h2 className="terminal-text glow-text text-lg font-bold">
            {viewMode === 'list'
              ? 'FICHIERS'
              : (file?.name?.toUpperCase() ?? 'FICHIER')}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="terminal-button relative rounded-full p-2"
        >
          <XIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Content */}
      <div className="h-full overflow-hidden bg-slate-100/20 pb-16 dark:bg-gray-900/20">
        {viewMode === 'list' ? (
          <div className="p-4">
            {filesLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-pulse text-emerald-600 dark:text-emerald-400">
                  Chargement des fichiers...
                </div>
              </div>
            ) : files.length === 0 ? (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                <FolderIcon className="mx-auto mb-4 h-12 w-12 opacity-50" />
                <p>Aucun fichier pour le moment</p>
                <p className="mt-1 text-sm">
                  Les fichiers apparaîtront ici lorsque vous les créerez dans le
                  chat
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {files.map((fileItem) => (
                  <button
                    key={fileItem.name}
                    onClick={() => handleFileClick(fileItem.name)}
                    className="group flex w-full items-center space-x-3 rounded-lg p-3 text-left transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    <FileIcon className="h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium text-gray-900 dark:text-white">
                        {fileItem.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Mis à jour le{' '}
                        {new Date(fileItem.updatedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <CaretLeftIcon className="h-4 w-4 rotate-180 text-gray-500 transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="flex h-full flex-col">
            {/* File content */}
            <div className="flex-1 overflow-auto pb-4">
              {fileLoading || isHighlighting ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-pulse text-emerald-600 dark:text-emerald-400">
                    {fileLoading
                      ? 'Chargement du fichier...'
                      : 'Coloration syntaxique...'}
                  </div>
                </div>
              ) : file !== undefined ? (
                <div className="p-4">
                  {highlightedContent !== '' ? (
                    <div
                      className="overflow-auto font-mono text-sm"
                      dangerouslySetInnerHTML={{ __html: highlightedContent }}
                    />
                  ) : (
                    <pre className="overflow-auto p-2 font-mono text-sm break-words whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                      {file.content}
                    </pre>
                  )}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                  <FileIcon className="mx-auto mb-4 h-12 w-12 opacity-50" />
                  <p>Fichier non trouvé</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
