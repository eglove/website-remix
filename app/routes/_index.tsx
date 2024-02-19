import { betterNumber } from '@ethang/toolbelt/number/number.js';
import type {
  LoaderFunctionArgs,
  MetaFunction,
  TypedResponse,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import type { JSX } from 'react';
import type { ReadonlyDeep } from 'type-fest';

import { MetadataContainer } from '../components/metadata/metadata-container';
import type { MetaDataReturn } from '../controllers/get-metadatas-by-category';
import { getMetadatasByCategory } from '../controllers/get-metadatas-by-category';
import type { Category } from '../controllers/types';
import { categories } from '../controllers/types';
import { CONTENT_CACHE_CONTROL } from '../util';

export const meta: MetaFunction = () => {
  return [
    { title: 'EthanG' },
    { content: "Messin' around on the web sometimes.", name: 'description' },
  ];
};

const DEFAULT_PAGE = 1;

export async function loader({
  request,
}: ReadonlyDeep<LoaderFunctionArgs>): Promise<TypedResponse<MetaDataReturn[]>> {
  const promises = categories.map(async category => {
    const parameter = betterNumber(
      new URL(request.url).searchParams.get(category),
    ).number;

    const pageNumber = typeof parameter === 'number' ? parameter : DEFAULT_PAGE;

    return getMetadatasByCategory(category, pageNumber);
  });

  const data = await Promise.all(promises);

  return json(data, {
    headers: CONTENT_CACHE_CONTROL,
  });
}

export default function Index(): JSX.Element {
  const [searchParameters] = useSearchParams();

  const loaderData = useLoaderData<typeof loader>();

  const getPageNumber = (category: Category): number => {
    const parameterNumber = betterNumber(searchParameters.get(category)).number;

    return typeof parameterNumber === 'number' ? parameterNumber : DEFAULT_PAGE;
  };

  const pages: Record<Category, number> = {
    courseReview: getPageNumber('courseReview'),
    design: getPageNumber('design'),
    thinkingAbout: getPageNumber('thinkingAbout'),
    workingOn: getPageNumber('workingOn'),
  };

  return (
    <div className="grid gap-4">
      {loaderData.map((datum, index) => {
        return (
          <MetadataContainer
            key={Symbol(index).toString()}
            data={datum}
            pages={pages}
          />
        );
      })}
    </div>
  );
}
