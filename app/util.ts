export const CONTENT_CACHE_CONTROL = new Headers({
  'Cache-Control':
    'max-age=86400, public, stale-if-error=31536000, stale-while-revalidate=60',
});

export function camelToTitle(camelcase: string): string {
  return camelcase
    .replaceAll(/(?<CapitalLetter>[A-Z])/u, ' $1')
    .replace(/^./u, string_ => {
      return string_.toUpperCase();
    });
}

export function codeString(
  value: string | readonly string[],
): string | readonly string[] {
  const codeString = value;
  const FIRST = 0;

  if (typeof codeString === 'string') {
    codeString.trim();
  } else {
    codeString.reduce((result, element, index) => {
      return result + (index === FIRST ? element : `\n${element}`);
    });
  }

  return codeString;
}
