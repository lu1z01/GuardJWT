// Deliberately unsigned, synthetic fixture. Never an authentication credential.
import { encode, utf8 } from '../jose/inspect';
const segment = (value: object) => encode(utf8(JSON.stringify(value)));
export const EXAMPLE_TOKEN = `${segment({ alg: 'none', typ: 'JWT' })}.${segment({ iss: 'https://issuer.example', sub: 'demo-user', aud: 'guardjwt-demo', name: 'Alex Example', scope: 'read:demo', iat: 1791806400, exp: 1791810000 })}.`;
