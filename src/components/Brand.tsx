import { SiteLink } from './SiteLink';
export function Brand() {
  return (
    <SiteLink className="brand" href="/">
      <img
        className="brand-logo"
        src="/logo.png"
        alt="GuardJWT"
        width={160}
        height={48}
        decoding="async"
      />
    </SiteLink>
  );
}
