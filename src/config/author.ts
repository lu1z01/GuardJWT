// Fill only with verified author/repository links. Empty entries stay hidden.
export const author = {
  name: 'Luiz Gustavo',
  github: '',
  linkedin: '',
  portfolio: '',
  instagram: '',
  email: '',
};
export const repositoryUrl = '';
export function publicLink(value: string, email = false): string | undefined {
  if (!value) return undefined;
  if (email)
    return /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value)
      ? `mailto:${value}`
      : undefined;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password
      ? url.href
      : undefined;
  } catch {
    return undefined;
  }
}
