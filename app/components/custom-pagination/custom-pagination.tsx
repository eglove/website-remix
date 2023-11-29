import type { PaginationItemRenderProps } from '@nextui-org/react';
import { PaginationItemType } from '@nextui-org/react';
import { EllipsisIcon } from '@nextui-org/shared-icons';
import type { ReactNode } from 'react';

import type { Category } from '../../controllers/types';
import { PaginationLink } from './pagination-link';
import { PaginationNextPrevious } from './pagination-next-previous';

type CustomPaginationProperties = PaginationItemRenderProps & {
  readonly category: Category;
  readonly categoryPage: number;
  readonly searchParameters: URLSearchParams;
};

function setUrl(
  currentSearchParameters: URLSearchParams,
  key: string,
  value: string,
): string {
  const newParameters = new URLSearchParams(currentSearchParameters);
  newParameters.set(key, value);
  return newParameters.toString();
}

export function CustomPagination({
  activePage,
  category,
  categoryPage,
  className,
  dotsJump,
  isActive,
  page,
  searchParameters,
  total,
  value,
}: CustomPaginationProperties): ReactNode {
  switch (value) {
    case PaginationItemType.NEXT: {
      return (
        <PaginationNextPrevious
          className={className}
          isDisabled={categoryPage >= total}
          type={PaginationItemType.NEXT}
          searchParameterString={setUrl(
            searchParameters,
            category,
            String(categoryPage + 1),
          )}
        />
      );
    }

    case PaginationItemType.PREV: {
      return (
        <PaginationNextPrevious
          className={className}
          isDisabled={categoryPage <= 1}
          type={PaginationItemType.PREV}
          searchParameterString={setUrl(
            searchParameters,
            category,
            String(categoryPage - 1),
          )}
        />
      );
    }

    case PaginationItemType.DOTS: {
      let jumpTo =
        activePage > page ? activePage - dotsJump : activePage + dotsJump;

      if (jumpTo <= 1) {
        jumpTo = 2;
      }

      if (jumpTo >= total) {
        jumpTo = total - 1;
      }

      return (
        <PaginationLink
          className={className}
          isActive={isActive}
          searchParameterString={setUrl(
            searchParameters,
            category,
            String(jumpTo),
          )}
        >
          <EllipsisIcon />
        </PaginationLink>
      );
    }

    default: {
      return (
        <PaginationLink
          className={className}
          isActive={isActive}
          searchParameterString={setUrl(
            searchParameters,
            category,
            String(value),
          )}
        >
          {value}
        </PaginationLink>
      );
    }
  }
}
