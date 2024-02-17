import { DateTime } from 'luxon';
import type { JSX } from 'react';
import type { ReadonlyDeep } from 'type-fest';

import type { Author } from '../../../controllers/get-recommended-courses';
import { Heading } from '../../elements/heading';

type BlogMetadataProperties = ReadonlyDeep<{
  readonly authors: Author[];
  readonly title: string;
  readonly updatedAt: string;
}>;

const formatter = new Intl.ListFormat('en-US');

export function BlogMetadata({
  authors,
  title,
  updatedAt,
}: BlogMetadataProperties): JSX.Element {
  return (
    <div className="p-2">
      <Heading variant="h2">{title}</Heading>

      <div>
        {formatter.format(
          authors.map(author => {
            return author.name;
          }),
        )}
      </div>

      <time>
        Last Updated: {DateTime.fromJSDate(new Date(updatedAt)).toRelative()}
      </time>
    </div>
  );
}
