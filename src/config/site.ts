export const site = {
  origin: 'https://guardjwt.cloud',
  title: 'GuardJWT — Local JWT & JOSE Security Workbench',
  description:
    'Decode, inspect, verify and audit JWT and JOSE data locally in your browser.',
  // Add /og-image.png here only after a real preview asset has been supplied.
  socialImage: '',
};
export const pages = {
  '/': { title: site.title, description: site.description },
  '/workbench': {
    title: 'Workbench — GuardJWT',
    description:
      'Advanced local JWT and JOSE workbench: claims, signature verification, policies, keys, comparison and safe reports.',
  },
  '/docs': {
    title: 'Documentation — GuardJWT',
    description:
      'Workflows, supported algorithms, keyboard shortcuts and limits of the local JWT and JOSE workbench.',
  },
  '/privacy': {
    title: 'Privacy — GuardJWT',
    description:
      'How GuardJWT processes JWTs and cryptographic material locally, handles exports and caches application assets.',
  },
  '/security': {
    title: 'Security — GuardJWT',
    description:
      'GuardJWT security model, trust boundaries, supported verification and responsible disclosure.',
  },
  '/about': {
    title: 'About — GuardJWT',
    description:
      'An independent open-source JWT and JOSE security workbench built by Luiz Gustavo.',
  },
} as const;
