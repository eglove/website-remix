export const CONTENT_CACHE_CONTROL = new Headers({
  'Cache-Control':
    'max-age=86400, public, stale-if-error=31536000, stale-while-revalidate=60',
});

export function camelToTitle(camelcase: string): string {
  return camelcase.replaceAll(/([A-Z])/g, ' $1').replace(/^./, string_ => {
    return string_.toUpperCase();
  });
}

export function codeString(value: string | string[]) {
  let codeString = value;

  codeString = Array.isArray(codeString)
    ? codeString.reduce((result, element, index) => {
        return result + (index === 0 ? element : `\n${element}`);
      })
    : codeString.trim();

  return codeString;
}
