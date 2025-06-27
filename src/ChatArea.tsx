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
}>;

export default function ChatArea({
  className,
  value,
  onChange,
  onSubmit,
  placeholder,
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
        'terminal-window flex flex-row items-start justify-start gap-4 p-4 transition-all duration-300',
        className,
      )}
    >
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
  );
}
