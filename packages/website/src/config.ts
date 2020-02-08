
export function isExternalUrl(url: string | undefined | null) {
  if (url) {
    if (url.startsWith('http') || url.startsWith('//')) {
      return true;
    }
  }

  return false;
}
