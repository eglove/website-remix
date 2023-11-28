import type { JSX } from 'react';
import { twMerge } from 'tailwind-merge';

import { A } from '../elements/a';

type PaginationLinkProperties = {
  readonly className: string;
  readonly isActive: boolean;
  readonly searchParameterString: string;
  readonly value: number | string;
};

export function PaginationLink({
  className,
  isActive,
  searchParameterString,
  value,
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
      {value}
    </A>
  );
}
