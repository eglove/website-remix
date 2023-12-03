import { isNil } from '@ethang/util/data.js';
import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs';
import { Image } from '@nextui-org/image';
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { DateTime } from 'luxon';

import { sanityImageBuilder } from '../clients/sanity';
import { Heading } from '../components/elements/heading';
import type { GetMetadataBySlug } from '../controllers/get-metadata-by-slug';
import { getMetadataBySlug } from '../controllers/get-metadata-by-slug';
import { CONTENT_CACHE_CONTROL } from '../util';

export const meta: MetaFunction = ({ data }) => {
  const typedData = data as GetMetadataBySlug;

  if (isNil(typedData)) {
    return [];
  }

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

export async function loader({ request }: LoaderFunctionArgs) {
  const slug = request.url.split('/').at(4);

  if (!isNil(slug)) {
    const data = await getMetadataBySlug(slug);

    if (isNil(data)) {
      return null;
    }

    return json(data, {
      headers: CONTENT_CACHE_CONTROL,
    });
  }

  return null;
}

const formatter = new Intl.ListFormat('en-US');

export default function BlogLayout() {
  const loaderData = useLoaderData<typeof loader>();

  if (isNil(loaderData)) {
    return <Outlet />;
  }

  const imageUrl = sanityImageBuilder
    .image(loaderData.featuredImage.image.asset.url)
    .height(72)
    .width(72)
    .format('webp')
    .url();

  return (
    <>
      <Breadcrumbs underline="hover">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href={`/blog/${loaderData.slug.current}`}>
          {loaderData.title}
        </BreadcrumbItem>
      </Breadcrumbs>
      <div className="my-4 grid gap-4 border-b-2 sm:grid-cols-2-max-content">
        <div className="p-2">
          <Image
            alt={loaderData.featuredImage.description}
            className="object-contain"
            height={72}
            src={imageUrl}
            width={72}
          />
        </div>
        <div>
          <Heading variant="h2">{loaderData.title}</Heading>
          <div>
            {formatter.format(
              loaderData.authors.map(author => {
                return author.name;
              }),
            )}
          </div>
          <time>
            Last Updated:{' '}
            {DateTime.fromJSDate(new Date(loaderData.updatedAt)).toRelative()}
          </time>
        </div>
      </div>
      <Outlet />
    </>
  );
}
