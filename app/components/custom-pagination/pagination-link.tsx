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
      href={`?${searchParameterString}`}
      className={twMerge(
        className,
        isActive ? 'bg-primary text-white' : 'text-foreground',
      )}
    >
      {children}
    </A>
  );
}
