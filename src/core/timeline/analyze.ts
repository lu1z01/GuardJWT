import { finite, type Obj } from '../parsing/json';
export function timeline(payload: Obj, now: number, skew = 0) {
  const exp = finite(payload.exp),
    nbf = finite(payload.nbf),
    iat = finite(payload.iat),
    auth = finite(payload.auth_time);
  const invalid = ['exp', 'nbf', 'iat', 'auth_time'].filter(
    (k) =>
      k in payload &&
      (finite(payload[k]) === undefined ||
        Math.abs(finite(payload[k])!) > 8.64e12),
  );
  const tolerance = Math.min(120, Math.max(0, skew));
  const expired = exp !== undefined && now >= exp + tolerance,
    early = nbf !== undefined && now + tolerance < nbf;
  return {
    now,
    exp,
    nbf,
    iat,
    auth,
    lifetime: exp !== undefined && iat !== undefined ? exp - iat : undefined,
    remaining: exp !== undefined ? exp - now : undefined,
    invalid,
    status: invalid.length
      ? 'Invalid temporal claims'
      : expired && early
        ? 'Inconsistent time window'
        : expired
          ? 'Expired'
          : early
            ? 'Not yet valid'
            : exp === undefined
              ? 'No expiration bound'
              : 'Within temporal window',
    expired,
    early,
  };
}
export function date(n: number | undefined) {
  return n === undefined || !Number.isFinite(n) || Math.abs(n) > 8.64e12
    ? '—'
    : new Date(n * 1000).toISOString();
}
