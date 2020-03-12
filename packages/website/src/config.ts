export function isExternalUrl(url: string | undefined | null) {
  if (url) {
    if (url.startsWith('http') || url.startsWith('//')) {
      return true;
    }
  }

  return false;
}

export function isHashLink(href?: string) {
  if (href) {
    return href.startsWith('#');
  }
  return false;
}

export const contactInfo = {
  email: 'team@wefox.tech',
  tel: '13148371687',
  githubOrg: 'WeFoxTech',
};
