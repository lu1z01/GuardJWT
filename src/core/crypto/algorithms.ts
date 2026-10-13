export function algorithmInfo(alg: string) {
  const hash = alg.match(/(256|384|512)$/)?.[1];
  if (alg.startsWith('HS') && hash)
    return {
      family: 'HMAC',
      hash: 'SHA-' + hash,
      key: 'Symmetric secret',
      note: `At least ${hash} bits of key material; length does not prove entropy.`,
    };
  if (/^(RS|PS)/.test(alg) && hash)
    return {
      family: alg.startsWith('PS') ? 'RSA-PSS' : 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-' + hash,
      key: 'RSA, at least 2048 bits',
      note: alg.startsWith('PS')
        ? 'JOSE salt length equals digest length.'
        : 'Public key verifies; private key signs.',
    };
  if (alg.startsWith('ES') && hash)
    return {
      family: 'ECDSA',
      hash: 'SHA-' + hash,
      key:
        (
          { ES256: 'P-256', ES384: 'P-384', ES512: 'P-521' } as Record<
            string,
            string
          >
        )[alg] ?? 'Unsupported curve',
      note: 'JOSE uses a fixed-width R || S signature, not ASN.1 DER.',
    };
  return {
    family: 'EdDSA',
    hash: 'Intrinsic to Ed25519',
    key: 'Ed25519',
    note: 'Support depends on the browser Web Crypto implementation.',
  };
}
