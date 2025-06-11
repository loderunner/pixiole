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

export default function ChatArea({
  className,
  value,
  onChange,
  onSubmit,
  placeholder,
}: {
  className?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
  onSubmit?: ReactEventHandler;
  placeholder: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const rows = useMemo(() => {
    let count = 1;
    for (const c of value ?? ref.current?.value ?? '') {
      if (c === '\n') {
        count++;
      }
    }
    return count;
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
        'flex flex-row items-start justify-start gap-3 rounded-lg border border-gray-300 p-3 transition has-focus:border-gray-400 has-focus:shadow-xl',
        className,
      )}
    >
      <textarea
        ref={ref}
        className="grow resize-none p-3 outline-none"
        value={value}
        rows={rows}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
      ></textarea>
      <button
        className="rounded-full bg-gray-700 p-3 text-white hover:not-disabled:bg-gray-500 active:bg-gray-700 disabled:opacity-50"
        disabled={value === undefined || value === ''}
        onClick={onSubmit}
      >
        <PencilSimpleLineIcon className="text-2xl" />
      </button>
    </div>
  );
}
