import { isNil } from '@ethang/toolbelt/is/nil.js';
import type {
  LoaderFunctionArgs,
  MetaFunction,
  TypedResponse,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import type { JSX } from 'react';
import type { ReadonlyDeep } from 'type-fest';

import { sanityImageBuilder } from '../clients/sanity';
import { BlogBreadcrumbs } from '../components/blog/common/blog-breadcrumbs';
import { BlogMetadata } from '../components/blog/common/blog-metadata';
import { FeaturedImage } from '../components/blog/common/featured-image';
import type { GetMetadataBySlug } from '../controllers/get-metadata-by-slug';
import { getMetadataBySlug } from '../controllers/get-metadata-by-slug';
import { CONTENT_CACHE_CONTROL } from '../util';

export const meta: MetaFunction = ({ data }) => {
  const typedData = data as GetMetadataBySlug;

  return [
    { title: `EthanG | ${typedData.title}` },
    { content: typedData.description, name: 'description' },
    { content: typedData.description, name: 'og:description' },
    { content: `EthanG | ${typedData.title}`, name: 'og:title' },
    { content: 'EthanG', name: 'og:site_name' },
    { content: 'article', name: 'og:type' },
    { content: typedData.featuredImage.image.asset.url, name: 'og:image' },
    { content: typedData.featuredImage.description, name: 'og:image:alt' },
    {
      content: typedData.featuredImage.image.asset.metadata.dimensions.width,
      name: 'og:image:width',
    },
    {
      content: typedData.featuredImage.image.asset.metadata.dimensions.height,
      name: 'og:image:height',
    },
    { name: 'twitter:card', value: 'summary' },
    { name: 'twitter:title', value: `EthanG | ${typedData.title}` },
    { name: 'twitter:description', value: typedData.description },
  ];
};

export async function loader({
  request,
}: ReadonlyDeep<LoaderFunctionArgs>): Promise<TypedResponse<GetMetadataBySlug> | null> {
  const PATH_LOCATION = 4;
  const slug = request.url.split('/').at(PATH_LOCATION);

  if (!isNil(slug)) {
    const data = await getMetadataBySlug(slug);

    return json(data, {
      headers: CONTENT_CACHE_CONTROL,
    });
  }

  return null;
}

export default function BlogLayout(): JSX.Element | null {
  const loaderData = useLoaderData<typeof loader>();

  if (isNil(loaderData)) {
    return null;
  }

  const IMAGE_SIZE = 72;
  const imageUrl = sanityImageBuilder
    .image(loaderData.featuredImage.image.asset.url)
    .height(IMAGE_SIZE)
    .width(IMAGE_SIZE)
    .format('webp')
    .url();

  return (
    <>
      <BlogBreadcrumbs
        currentSlug={loaderData.slug.current}
        title={loaderData.title}
      />

      <div className="my-4 grid gap-4 border-b-2 sm:grid-cols-2-max-content">
        <FeaturedImage
          description={loaderData.featuredImage.description}
          imageUrl={imageUrl}
        />

        <BlogMetadata
          authors={loaderData.authors}
          title={loaderData.title}
          updatedAt={loaderData.updatedAt}
        />
      </div>

      <Outlet />
    </>
  );
}
