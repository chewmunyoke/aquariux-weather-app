export function toTitleCase(str: string): string {
  const words = str
    .toLowerCase()
    .split(' ')
    .map((word) => `${word.charAt(0).toUpperCase()}${word.substring(1)}`);

  return words.join(' ');
}

export function getLocationFromSlug(slug: string): string {
  const location = decodeURIComponent(slug);
  const index = location.lastIndexOf(',');
  return `${toTitleCase(location.substring(0, index))}${location.substring(index)}`;
}

export function getLocationPath(location: string): string {
  return `/location/${encodeURIComponent(location)}`;
}
