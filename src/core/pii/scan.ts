import { claims } from '../claims/explore';
import type { Obj } from '../parsing/json';
export interface Exposure {
  pointer: string;
  path: string;
  kind: string;
  confidence: 'High' | 'Medium' | 'Low';
}
export function scan(payload: Obj): Exposure[] {
  const found: Exposure[] = [];
  for (const c of claims(payload)) {
    const key = c.name.toLowerCase();
    let kind = '',
      confidence: Exposure['confidence'] = 'Medium';
    if (
      /^(password|passwd|pwd|secret|client_secret|api_key|apikey|access_key|private_key|authorization)$/.test(
        key,
      )
    ) {
      kind = 'Possible secret';
      confidence = 'High';
    } else if (
      /^(email|phone|phone_number|cpf|ssn|credit_card|card_number|address|dob|birth_date|name|given_name|family_name)$/.test(
        key,
      )
    )
      kind = 'Possible PII';
    if (typeof c.value === 'string') {
      if (
        /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|^Bearer\s+\S+/i.test(
          c.value,
        )
      ) {
        kind = 'Possible secret material';
        confidence = 'High';
      } else if (emailLike(c.value)) kind = 'Possible email';
      else if (/^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{3}-\d{2}-\d{4}$/.test(c.value))
        kind = 'Possible identity number';
      else if (/^\+\d[\d ()-]{7,18}$/.test(c.value)) {
        kind = 'Possible phone number';
        confidence = 'Low';
      } else if (/^(?:sk_|sk-)[A-Za-z0-9_-]{20,}$/.test(c.value)) {
        kind = 'Possible API key';
        confidence = 'Medium';
      } else if (/^(?:\d[ -]?){13,19}$/.test(c.value) && luhn(c.value)) {
        kind = 'Possible payment card';
        confidence = 'Low';
      }
    }
    if (kind)
      found.push({ pointer: c.pointer, path: c.path, kind, confidence });
  }
  return found;
}
function luhn(s: string) {
  const digits = s.replace(/\D/g, '');
  let sum = 0;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = Number(digits[i]);
    if ((digits.length - 1 - i) % 2) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
  }
  return !/^0+$/.test(digits) && sum % 10 === 0;
}

// Linear heuristic: reject ambiguous separators without regex backtracking.
function emailLike(value: string) {
  const at = value.indexOf('@');
  const dot = value.indexOf('.', at + 2);
  return (
    at > 0 &&
    at === value.lastIndexOf('@') &&
    dot > at + 1 &&
    dot < value.length - 1 &&
    !/\s/.test(value)
  );
}
