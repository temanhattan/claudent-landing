export function getSafeUrl(url: string | undefined): string {
  if (!url) return '#';
  const trimmed = url.trim().toLowerCase();

  // Safe protocols and paths
  const isSafe =
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('#') ||
    trimmed.startsWith('mailto:') ||
    trimmed.startsWith('tel:');

  return isSafe ? url : '#';
}
