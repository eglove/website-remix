import type { JSX } from 'react';
import { twMerge } from 'tailwind-merge';

type ParagraphProperties = JSX.IntrinsicElements['p'] & {
  children: (JSX.Element | string)[] | JSX.Element | string;
};

export function Paragraph({
  children,
  ...rest
}: Readonly<ParagraphProperties>): JSX.Element {
  return (
    <p {...rest} className={twMerge('my-4', rest.className)}>
      {children}
    </p>
  );
}
