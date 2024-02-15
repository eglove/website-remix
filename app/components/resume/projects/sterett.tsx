import { Link } from '@nextui-org/link';
import type { JSX } from 'react';

import { ExperienceCard } from '../experience-card';

export function Sterett(): JSX.Element {
  return (
    <ExperienceCard
      methodologiesUsed={['edgeDeployment', 'serverless']}
      techUsed={[
        'astro',
        'nextUi',
        'tailwind',
        'react',
        'typeScript',
        'javascript',
        'zod',
      ]}
      title="Sterett Creek Village Trustee"
    >
      <li>
        Website used by the Sterett Creek Village Trustee board to post news
        updates, events, and meeting notes. Sanity is used as a CMS while the
        frontend is built with Astro and React.
      </li>
      <li>
        <Link
          className="text-medium"
          href="https://github.com/eglove/sterett"
          isExternal
        >
          github.com/eglove/sterett
        </Link>
      </li>
      <li>
        <Link
          className="text-medium"
          href="https://sterettcreekvillagetrustee.com/"
          isExternal
        >
          sterettcreekvillagetrustee.com
        </Link>
      </li>
    </ExperienceCard>
  );
}
