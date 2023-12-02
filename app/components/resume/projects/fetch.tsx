import { Link } from '@nextui-org/link';
import type { JSX } from 'react';

import { ExperienceCard } from '../experience-card';

export function Fetch(): JSX.Element {
  return (
    <ExperienceCard
      methodologiesUsed={[]}
      techUsed={['typeScript', 'vitest', 'javascript']}
      title="@ethang/fetch"
    >
      <li>
        NPM library for building a centralized API and fetch abstractions to use
        the standard Cache API. This essentially works as my replacement for
        both Axios and TanStack Query in my own personal projects.
      </li>
      <li>
        <Link
          isExternal
          className="text-medium"
          href="https://github.com/eglove/fetch"
        >
          github.com/eglove/fetch
        </Link>
      </li>
    </ExperienceCard>
  );
}
