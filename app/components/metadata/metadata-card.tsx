import { Image } from '@nextui-org/image';
import { DateTime } from 'luxon';

import { sanityImageBuilder } from '../../clients/sanity';
import type { Metadata } from '../../controllers/get-metadatas-by-category';
import { A } from '../elements/a';
import { Heading } from '../elements/heading';

type MetadataCardProperties = {
  readonly isAboveTheFold: boolean;
  readonly metadata: Metadata;
};

export function MetadataCard({
  metadata,
  isAboveTheFold,
}: MetadataCardProperties) {
  const featuredImageUrl = sanityImageBuilder
    .image(metadata.featuredImage.image.asset.url)
    .height(150)
    .width(150)
    .format('webp')
    .url();

  return (
    <A
      className="rounded-lg border-2 p-2"
      color="foreground"
      href={`/blog/${metadata.slug.current}`}
    >
      <div className="flex w-full justify-between gap-1">
        <div>
          <Heading variant="h3">{metadata.title}</Heading>
          <div>
            Updated:{' '}
            {DateTime.fromJSDate(new Date(metadata.updatedAt), {
              zone: 'America/Chicago',
            }).toRelative() ?? ''}
          </div>
        </div>
        <div className="flex items-center pt-2">
          <Image
            alt={metadata.featuredImage.description}
            className="rounded-xl"
            height={100}
            loading={isAboveTheFold ? undefined : 'lazy'}
            src={featuredImageUrl}
            width={100}
          />
        </div>
      </div>
    </A>
  );
}
