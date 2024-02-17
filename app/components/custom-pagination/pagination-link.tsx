import type { JSX, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import { A } from '../elements/a';

type PaginationLinkProperties = {
  readonly children: ReactNode;
  readonly className: string;
  readonly isActive: boolean;
  readonly searchParameterString: string;
};

export function PaginationLink({
  className,
  isActive,
  searchParameterString,
  children,
}: PaginationLinkProperties): JSX.Element {
  return (
    <A
      preventScrollReset
      replace
      className={twMerge(
        className,
        isActive ? 'bg-primary text-white' : 'text-foreground',
      )}
      href={`?${searchParameterString}`}
    >
      {children}
    </A>
  );
}
