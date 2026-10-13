import { useEffect, useMemo, useState } from 'react';
import { analyze, type Analysis } from '../core/jose/workspace';
export function useAnalysis(input: string, refresh = 0) {
  const [state, setState] = useState<{ input: string; data: Analysis } | null>(
    null,
  );
  if (state && state.input !== input) setState(null);
  const local = useMemo(() => {
    void refresh;
    return typeof Worker === 'undefined' ? analyze(input) : null;
  }, [input, refresh]);
  useEffect(() => {
    if (typeof Worker === 'undefined') return;
    let active = true;
    const worker = new Worker(
      new URL('../workers/analysis.ts', import.meta.url),
      { type: 'module' },
    );
    const timer = setTimeout(
      () => worker.postMessage({ input, now: Date.now() / 1000 }),
      120,
    );
    worker.onmessage = (event: MessageEvent<Analysis>) => {
      if (active) setState({ input, data: event.data });
    };
    worker.onerror = () => {
      if (!active) return;
      setState({
        input,
        data: {
          token: {
            ok: false,
            message: 'Local analysis worker failed. Reload and retry.',
          },
          findings: [],
        },
      });
    };
    return () => {
      active = false;
      clearTimeout(timer);
      worker.terminate();
    };
  }, [input, refresh]);
  return local ?? (state?.input === input ? state.data : null);
}
