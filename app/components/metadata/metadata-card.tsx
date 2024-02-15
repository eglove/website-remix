import { DateTime } from 'luxon';
import type { ReadonlyDeep } from 'type-fest';

import type { Metadata } from '../../controllers/get-metadatas-by-category';
import { A } from '../elements/a';
import { Heading } from '../elements/heading';
import { SanityImage } from '../elements/sanity-image';

type MetadataCardProperties = ReadonlyDeep<{
  readonly isAboveTheFold: boolean;
  readonly metadata: Metadata;
}>;

export function MetadataCard({
  metadata,
  isAboveTheFold,
}: MetadataCardProperties) {
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
          <SanityImage
            alt={metadata.featuredImage.description}
            className="rounded-xl"
            height={100}
            loading={isAboveTheFold ? undefined : 'lazy'}
            src={metadata.featuredImage.image.asset.url}
            width={100}
          />
        </div>
      </div>
    </A>
  );
}
