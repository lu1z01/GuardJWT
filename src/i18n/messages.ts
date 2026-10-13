import { interfaceMessages } from './interface';
import { diagnosticMessages } from './diagnostics';
import { referenceMessages } from './reference';
export const messages: Record<string, readonly [string, string]> = {
  ...interfaceMessages,
  ...diagnosticMessages,
  ...referenceMessages,
};
