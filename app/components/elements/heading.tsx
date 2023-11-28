import type { JSX, PropsWithChildren, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const headingStyleMap = {
  h1: 'text-3xl font-bold',
  h2: 'text-xl font-bold',
  h3: 'my-4 text-lg font-bold',
};

type HeadingProperties = {
  readonly variant: keyof typeof headingStyleMap;
} & JSX.IntrinsicElements[keyof typeof headingStyleMap] &
  PropsWithChildren;

export function Heading({
  children,
  variant,
  ...rest
}: HeadingProperties): ReactNode {
  const HeadingTag = variant;
  const mergedClasses = twMerge(headingStyleMap[variant], rest.className);

  return (
    <HeadingTag {...rest} className={mergedClasses}>
      {children}
    </HeadingTag>
  );
}
