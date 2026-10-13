import { analyze } from '../core/jose/workspace';
self.onmessage = (event: MessageEvent<{ input: string; now: number }>) => {
  self.postMessage(analyze(event.data.input, event.data.now));
};
