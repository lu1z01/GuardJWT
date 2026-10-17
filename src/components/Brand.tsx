import { SiteLink } from './SiteLink';

export function Brand() {
  return (
    <SiteLink className="brand" href="/">
      <img
        className="brand-logo brand-logo--light"
        src="/logo-light.png"
        alt="GuardJWT"
        width={160}
        height={50}
        decoding="async"
      />
      <img
        className="brand-logo brand-logo--dark"
        src="/logo-dark.png"
        alt=""
        aria-hidden="true"
        width={160}
        height={50}
        decoding="async"
      />
    </SiteLink>
  );
}
