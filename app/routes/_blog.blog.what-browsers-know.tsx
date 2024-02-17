import type { JSX } from 'react';

import { Battery } from '../components/blog/what-browsers-know/battery';
import { Connection } from '../components/blog/what-browsers-know/connection';
import { Hardware } from '../components/blog/what-browsers-know/hardware';
import { Location } from '../components/blog/what-browsers-know/location';
import { Software } from '../components/blog/what-browsers-know/software';
import { TableOfContents } from '../components/blog/what-browsers-know/table-of-contents';
import { Heading } from '../components/elements/heading';

export default function WhatBrowsersKnow(): JSX.Element {
  return (
    <div className="mt-4 grid gap-4">
      <TableOfContents />

      <Heading id="location" variant="h3">
        Location
      </Heading>

      <Location />

      <Heading id="software" variant="h3">
        Software
      </Heading>

      <Software />

      <Heading variant="h3">Media Hardware</Heading>

      <Hardware />

      <Heading id="connection" variant="h3">
        Connection
      </Heading>

      <Connection />

      <Heading id="battery" variant="h3">
        Battery
      </Heading>

      <Battery />
    </div>
  );
}
