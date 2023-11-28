import type { PaginationItemRenderProps } from '@nextui-org/react';
import { PaginationItemType } from '@nextui-org/react';
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
  key,
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
          key={key}
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
          key={key}
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
          key={key}
          value="..."
          searchParameterString={setUrl(
            searchParameters,
            category,
            String(jumpTo),
          )}
        />
      );
    }

    default: {
      return (
        <PaginationLink
          className={className}
          isActive={isActive}
          key={key}
          value={value}
          searchParameterString={setUrl(
            searchParameters,
            category,
            String(value),
          )}
        />
      );
    }
  }
}
