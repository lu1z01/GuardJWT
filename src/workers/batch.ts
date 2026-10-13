import { batch } from '../core/tools/batch';
self.onmessage = (event: MessageEvent<string>) => {
  try {
    self.postMessage({ rows: batch(event.data) });
  } catch {
    self.postMessage({
      error: 'Batch must contain at most 50 tokens and 1 MiB.',
    });
  }
};
