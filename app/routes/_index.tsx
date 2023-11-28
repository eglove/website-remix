import { betterNumber } from '@ethang/util/better-number.js';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';

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

export async function loader({ request }: LoaderFunctionArgs) {
  const promises = categories.map(category => {
    const parameter = betterNumber(
      new URL(request.url).searchParams.get(category),
    ).number;

    const pageNumber = typeof parameter === 'number' ? parameter : 1;

    return getMetadatasByCategory(category, pageNumber);
  });

  const data = await Promise.all(promises);

  return json(data, {
    headers: CONTENT_CACHE_CONTROL,
  });
}

export default function Index() {
  const [searchParameters] = useSearchParams();

  const loaderData = useLoaderData<typeof loader>();

  const getPageNumber = (category: Category): number => {
    const parameterNumber = betterNumber(searchParameters.get(category)).number;

    return typeof parameterNumber === 'number' ? parameterNumber : 1;
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
        return <div key={Symbol(index).toString()}>{datum.count}</div>;
      })}
    </div>
  );
}
