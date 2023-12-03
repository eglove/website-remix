import { Card, CardHeader } from '@nextui-org/card';
import { DateTime } from 'luxon';

import type { Metadata } from '../../controllers/get-metadatas-by-category';
import { A } from '../elements/a';
import { Heading } from '../elements/heading';
import { SanityImage } from '../elements/sanity-image';

type MetadataCardProperties = {
  readonly isAboveTheFold: boolean;
  readonly metadata: Metadata;
};

export function MetadataCard({
  metadata,
  isAboveTheFold,
}: MetadataCardProperties) {
  return (
    <A
      className="h-64 w-64 rounded-xl"
      color="foreground"
      href={`/blog/${metadata.slug.current}`}
    >
      <Card className="rounded-none shadow-none">
        <CardHeader className="absolute z-10 grid bg-black/60 text-white">
          <Heading variant="h3">{metadata.title}</Heading>
          <div>
            Updated:{' '}
            {DateTime.fromJSDate(new Date(metadata.updatedAt), {
              zone: 'America/Chicago',
            }).toRelative() ?? ''}
          </div>
        </CardHeader>
        <SanityImage
          isZoomed
          alt={metadata.featuredImage.description}
          className="z-0 h-full w-full object-fill"
          height={256}
          loading={isAboveTheFold ? undefined : 'lazy'}
          src={metadata.featuredImage.image.asset.url}
          width={256}
        />
      </Card>
    </A>
  );
}
