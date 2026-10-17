import type { ReactNode } from 'react';
const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};
const icon = (children: ReactNode) => () => <svg {...base}>{children}</svg>;
export const CopyIcon = icon(
  <>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
  </>,
);
export const CheckIcon = icon(<path d="m5 12.5 4.5 4.5L19 7.5" />);
export const ClearIcon = icon(
  <>
    <path d="M20 5H9l-6 7 6 7h11Z" />
    <path d="m13 9 4 6m0-6-4 6" />
  </>,
);
export const ExpandIcon = icon(
  <path d="M14 4h6v6m0-6-7 7M10 20H4v-6m0 6 7-7" />,
);
export const CloseIcon = icon(<path d="M6 6l12 12M18 6 6 18" />);
export const TerminalIcon = icon(
  <>
    <path d="m5 8 4 4-4 4" />
    <path d="M12 17h7" />
  </>,
);
export const ChevronIcon = icon(<path d="m6 9 6 6 6-6" />);
export const SystemIcon = icon(
  <>
    <rect x="3" y="4" width="18" height="13" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </>,
);
export const MoonIcon = icon(
  <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />,
);
export const SunIcon = icon(
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </>,
);
export const MenuIcon = icon(<path d="M4 7h16M4 12h16M4 17h16" />);
export const ShieldCheckIcon = icon(
  <>
    <path d="M12 3 20 6v6c0 5-8 9-8 9s-8-4-8-9V6Z" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </>,
);
