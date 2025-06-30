import { PencilSimpleLineIcon } from '@phosphor-icons/react';
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  ReactEventHandler,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { twMerge } from 'tailwind-merge';

import type { PropsWithClassName } from './PropsWithClassName';

type Props = PropsWithClassName<{
  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onSubmit?: ReactEventHandler;
  placeholder: string;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
  isLoading?: boolean;
}>;

export default function ChatArea({
  className,
  value,
  onChange,
  onSubmit,
  placeholder,
  suggestions = [],
  onSuggestionClick,
  isLoading = false,
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const rows = useMemo(() => {
    let count = 1;
    for (const c of value ?? ref.current?.value ?? '') {
      if (c === '\n') {
        count++;
      }
    }
    return Math.max(count, 2);
  }, [value]);

  const onKeyDown = useCallback<KeyboardEventHandler<HTMLTextAreaElement>>(
    (e) => {
      if (isLoading) return; // Prevent submit during loading
      
      if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
        e.preventDefault();
        if (onSubmit !== undefined) {
          onSubmit(e);
        }
      }
    },
    [onSubmit, isLoading],
  );

  const isSubmitDisabled = value === undefined || value === '' || isLoading;

  return (
    <div
      className={twMerge(
        'terminal-window flex flex-col gap-3 p-4 transition-all duration-300',
        isLoading && 'opacity-75',
        className,
      )}
    >
      {/* Suggestion chips - only show if there are suggestions */}
      {suggestions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick?.(suggestion)}
              disabled={isLoading}
              className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1.5 text-xs text-emerald-700 transition-all hover:scale-105 hover:bg-emerald-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-800/40"
            >
              <span className="text-xs">💡</span>
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      )}

      {/* Input area */}
      <div className="flex flex-row items-start justify-start gap-4">
        <textarea
          ref={ref}
          className="terminal-input min-h-[60px] grow resize-none outline-none disabled:cursor-not-allowed disabled:opacity-50"
          value={value}
          rows={rows}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
          disabled={isLoading}
        ></textarea>
        <button
          className="terminal-button flex-shrink-0 rounded-lg px-4 py-3 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isSubmitDisabled}
          onClick={onSubmit}
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <PencilSimpleLineIcon className="text-xl" />
          )}
        </button>
      </div>
    </div>
  );
}
