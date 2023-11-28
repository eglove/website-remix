import type { JSX, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type ColoredTextProperties = {
  readonly variant: 'blue' | 'green';
} & PropsWithChildren;

export function ColoredText({
  variant,
  children,
}: ColoredTextProperties): JSX.Element {
  return (
    <span className={twMerge('p-0.5 text-white', `bg-${variant}-500`)}>
      {children}
    </span>
  );
}
