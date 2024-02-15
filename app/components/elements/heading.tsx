import type { JSX, PropsWithChildren, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

const headingStyleMap = {
  h1: 'text-3xl font-bold',
  h2: 'text-xl my-4 font-bold',
  h3: 'my-4 text-lg font',
};

type HeadingProperties = JSX.IntrinsicElements[keyof typeof headingStyleMap] &
  PropsWithChildren & {
    readonly variant: keyof typeof headingStyleMap;
  };

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
