export function toTitleCase(str: string): string {
  const words = str
    .toLowerCase()
    .split(' ')
    .map((word) => `${word.charAt(0).toUpperCase()}${word.substring(1)}`);

  return words.join(' ');
}

export function getFormattedDate(
  options: Intl.DateTimeFormatOptions,
  date: Date,
  timezoneOffset?: number
): string {
  const currentOffset = date.getTimezoneOffset() * 60 * 1000;
  let offset = 0;
  if (timezoneOffset && !isNaN(timezoneOffset)) {
    offset += currentOffset + timezoneOffset;
  }
  return new Intl.DateTimeFormat(undefined, options).format(
    date.getTime() + offset
  );
}

export function getLocationFromSlug(slug: string): string {
  const location = decodeURIComponent(slug);
  const index = location.lastIndexOf(',');
  return `${toTitleCase(location.substring(0, index))}${location.substring(index)}`;
}

export function getLocationPath(location: string): string {
  return `/location/${encodeURIComponent(location)}`;
}
