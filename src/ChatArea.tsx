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
}>;

export default function ChatArea({
  className,
  value,
  onChange,
  onSubmit,
  placeholder,
  suggestions = [],
  onSuggestionClick,
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
      if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey) {
        e.preventDefault();
        if (onSubmit !== undefined) {
          onSubmit(e);
        }
      }
    },
    [onSubmit],
  );

  return (
    <div
      className={twMerge(
        'terminal-window flex flex-col gap-3 p-4 transition-all duration-300',
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
              className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1.5 text-xs text-emerald-700 transition-all hover:scale-105 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-800/40"
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
          className="terminal-input min-h-[60px] grow resize-none outline-none"
          value={value}
          rows={rows}
          placeholder={placeholder}
          onChange={onChange}
          onKeyDown={onKeyDown}
        ></textarea>
        <button
          className="terminal-button flex-shrink-0 rounded-lg px-4 py-3"
          disabled={value === undefined || value === ''}
          onClick={onSubmit}
        >
          <PencilSimpleLineIcon className="text-xl" />
        </button>
      </div>
    </div>
  );
}
