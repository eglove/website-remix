import { PaginationItemType } from '@nextui-org/pagination';
import { ChevronIcon } from '@nextui-org/shared-icons';
import type { JSX } from 'react';
import { twMerge } from 'tailwind-merge';

import { A } from '../elements/a';

type PaginationNextPreviousProperties = {
  readonly className: string;
  readonly isDisabled: boolean;
  readonly searchParameterString: string;
  readonly type: PaginationItemType.NEXT | PaginationItemType.PREV;
};

export function PaginationNextPrevious({
  className,
  isDisabled,
  searchParameterString,
  type,
}: PaginationNextPreviousProperties): JSX.Element {
  return (
    <A
      preventScrollReset
      replace
      aria-label={type === PaginationItemType.NEXT ? 'Next' : 'Previous'}
      className={className}
      href={`?${searchParameterString}`}
      isDisabled={isDisabled}
      prefetch="viewport"
    >
      <ChevronIcon
        className={twMerge(type === PaginationItemType.NEXT && 'rotate-180')}
      />
    </A>
  );
}
