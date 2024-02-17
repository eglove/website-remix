import { Link } from '@nextui-org/link';
import type { JSX } from 'react';

import { ExperienceCard } from '../experience-card';

export function Introspect(): JSX.Element {
  return (
    <ExperienceCard
      methodologiesUsed={['serverless', 'edgeDeployment']}
      techUsed={[
        'react',
        'javascript',
        'typeScript',
        'astro',
        'zod',
        'tailwind',
        'nextUi',
        'prisma',
        'vitest',
        'prisma',
      ]}
      title="Introspect"
    >
      <li>
        Work in progress web app with multiple features planned. First feature
        allows users to build a curriculum by searching for educational
        resources or courses and adding them to a list. This was inspired by my
        own list of recommended courses to learn web development.
      </li>

      <li>
        <Link
          isExternal
          className="text-medium"
          href="https://github.com/eglove/introspect-2"
        >
          github.com/eglove/introspect-2
        </Link>
      </li>

      <li>
        <Link
          isExternal
          className="text-medium"
          href="https://introspect.dev/list/e7f779a0-838f-48d1-9aa7-3b3b5c534b8a/"
        >
          introspect.dev/list/e7f779a0-838f-48d1-9aa7-3b3b5c534b8a
        </Link>
      </li>
    </ExperienceCard>
  );
}
