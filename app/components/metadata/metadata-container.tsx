import { betterNumber } from '@ethang/toolbelt/number/number.js';
import { Card, CardFooter, CardHeader } from '@nextui-org/card';
import { Pagination } from '@nextui-org/pagination';
import type { PaginationItemRenderProps } from '@nextui-org/react';
import { CardBody } from '@nextui-org/react';
import { useNavigation, useSearchParams } from '@remix-run/react';
import { useCallback } from 'react';
import type { ReadonlyDeep } from 'type-fest';

import type { MetaDataReturn } from '../../controllers/get-metadatas-by-category';
import { METADATA_PAGE_LENGTH } from '../../controllers/get-metadatas-by-category';
import type { Category } from '../../controllers/types';
import { CustomPagination } from '../custom-pagination/custom-pagination';
import { A } from '../elements/a';
import { Heading } from '../elements/heading';
import { MetadataCard } from './metadata-card';

type MetadataContainerProperties = ReadonlyDeep<{
  readonly data: MetaDataReturn;
  readonly pages: Record<string, number>;
}>;

export function MetadataContainer({
  data,
  pages,
}: MetadataContainerProperties) {
  const navigation = useNavigation();
  const [searchParameters] = useSearchParams();

  const category = data.metadata[0].tags[0] as Category;
  const totalPages = Math.ceil(data.count / METADATA_PAGE_LENGTH);

  const categoryPage = betterNumber(searchParameters.get(category)).number ?? 1;

  let categoryLabel = '';

  switch (category) {
    case 'thinkingAbout': {
      categoryLabel = "Thing's I'm Thinking About";
      break;
    }

    case 'workingOn': {
      categoryLabel = "Thing's I'm Working On";
      break;
    }

    case 'courseReview': {
      categoryLabel = 'Learn Web Dev';
      break;
    }

    case 'design': {
      categoryLabel = 'Some Designy Things';
      break;
    }

    default: {
      categoryLabel = 'Hmm?';
    }
  }

  const getPaginationItem = useCallback(
    (properties: ReadonlyDeep<PaginationItemRenderProps>) => {
      return (
        <CustomPagination
          {...properties}
          category={category}
          categoryPage={categoryPage as number}
          searchParameters={searchParameters}
        />
      );
    },
    [category, categoryPage, searchParameters],
  );

  return (
    <Card>
      <CardHeader>
        <Heading variant="h2">
          {category === 'courseReview' ? (
            <A href="/courses" underline="always">
              {categoryLabel}
            </A>
          ) : (
            categoryLabel
          )}
        </Heading>
      </CardHeader>

      <CardBody className="grid gap-2 px-2 pb-2 pt-0 md:grid-cols-3">
        {data.metadata.map(item => {
          return (
            <MetadataCard
              key={item._id}
              isAboveTheFold={category === 'workingOn'}
              metadata={item}
            />
          );
        })}
      </CardBody>

      {totalPages > 1 && (
        <CardFooter className="grid justify-center">
          <Pagination
            isCompact
            showControls
            isDisabled={navigation.state !== 'idle'}
            page={Number(pages[category])}
            renderItem={getPaginationItem}
            total={totalPages}
          />
        </CardFooter>
      )}
    </Card>
  );
}
