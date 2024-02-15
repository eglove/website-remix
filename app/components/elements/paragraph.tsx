import type { JSX } from 'react';
import { twMerge } from 'tailwind-merge';
import type { ReadonlyDeep } from 'type-fest';

type ParagraphProperties = ReadonlyDeep<
  JSX.IntrinsicElements['p'] & {
    children: (JSX.Element | string)[] | JSX.Element | string;
  }
>;

export function Paragraph({
  children,
  ...rest
}: Readonly<ParagraphProperties>): JSX.Element {
  return (
    <p
      {...(rest as JSX.IntrinsicElements['p'])}
      className={twMerge('my-2', rest.className)}
    >
      {children}
    </p>
  );
}
