import { useRef } from 'react';
import { MAX_INPUT } from '../core/parsing/json';
/** Transparent textarea over a coloured mirror: native editing, no contenteditable. */
export function TokenEditor({
  value,
  onChange,
  label,
  placeholder,
  invalid,
  autoFocus,
  readOnly,
  segmented = true,
}: {
  value: string;
  onChange?: (value: string) => void;
  label: string;
  placeholder?: string;
  invalid?: boolean;
  autoFocus?: boolean;
  readOnly?: boolean;
  segmented?: boolean;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const parts = value.split('.');
  return (
    <div className={'dbg-editor' + (invalid ? ' invalid' : '')}>
      <pre className="dbg-editor-mirror" aria-hidden="true">
        {segmented
          ? parts.map((part, i) => (
              <span key={i}>
                {i > 0 && <span className="dbg-dot">.</span>}
                <span className={'dbg-seg dbg-seg-' + Math.min(i, 4)}>
                  {part}
                </span>
              </span>
            ))
          : value}
        {'\n'}
      </pre>
      <textarea
        ref={ref}
        aria-label={label}
        aria-invalid={invalid || undefined}
        value={value}
        readOnly={readOnly}
        placeholder={placeholder}
        spellCheck={false}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        autoFocus={autoFocus}
        onChange={(e) =>
          onChange?.(e.target.value.length <= MAX_INPUT ? e.target.value : '')
        }
      />
    </div>
  );
}
