import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid';
import { Link } from '@nextui-org/link';
import type { JSX } from 'react';

import { Heading } from './heading';

type TocHeaderProperties = Readonly<{ href: string; id: string; text: string }>;

export function TocHeader({
  text,
  id,
  href,
}: TocHeaderProperties): JSX.Element {
  return (
    <Heading className="flex gap-2" id={id} variant="h3">
      {text}{' '}
      <Link href={`${href}#toc`}>
        <ChevronDoubleUpIcon className="size-8 cursor-pointer" />
      </Link>
    </Heading>
  );
}
