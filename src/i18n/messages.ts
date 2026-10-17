import { interfaceMessages } from './interface';
import { diagnosticMessages } from './diagnostics';
import { referenceMessages } from './reference';
import { debuggerMessages } from './debugger';
export const messages: Record<string, readonly [string, string]> = {
  ...debuggerMessages,
  ...interfaceMessages,
  ...diagnosticMessages,
  ...referenceMessages,
};
