import { SiteLink } from './SiteLink';

export function Brand() {
  return (
    <SiteLink className="brand" href="/">
      <svg className="brand-mark" viewBox="0 0 48 48" aria-hidden="true">
        <path
          d="M34 12H23a12 12 0 1 0 12 12h-9"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M31 24h7v11a8 8 0 0 1-8 8h-4"
          fill="none"
          stroke="#2878f0"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="brand-name">Guard<span>JWT</span></span>
    </SiteLink>
  );
}
