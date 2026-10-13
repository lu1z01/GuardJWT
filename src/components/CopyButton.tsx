import { useI18n } from '../i18n/context';
import { useEffect, useRef, useState } from 'react';
export function CopyButton({
  value,
  label = 'Copy',
}: {
  value: string;
  label?: string;
}) {
  const { tr } = useI18n();
  const [status, setStatus] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const revision = useRef(0);
  useEffect(
    () => () => {
      revision.current++;
      clearTimeout(timer.current);
    },
    [],
  );
  return (
    <span className="copy-control">
      <button
        onClick={async () => {
          const id = ++revision.current;
          clearTimeout(timer.current);
          try {
            await navigator.clipboard.writeText(value);
            if (id !== revision.current) return;
            setStatus('Copied');
          } catch {
            if (id !== revision.current) return;
            setStatus('Copy unavailable; select text manually.');
          }
          timer.current = setTimeout(() => setStatus(''), 2500);
        }}
      >
        {tr(label)}
      </button>
      <span role="status" className="copy-feedback muted">
        {tr(status)}
      </span>
    </span>
  );
}
