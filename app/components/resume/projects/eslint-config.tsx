import { Link } from '@nextui-org/link';
import type { JSX } from 'react';

import { ExperienceCard } from '../experience-card';

export function EslintConfig(): JSX.Element {
  return (
    <ExperienceCard
      methodologiesUsed={[]}
      techUsed={['javascript']}
      title="eslint-config-ethang"
    >
      <li>
        Very strict, opinionated ESLint config. Extends eslint-plugin-unicorn
        and eslint-config-xo. Adds additional rules for immutable object
        mutations, Tailwind, Prettier, and others.
      </li>
      <li>
        <Link
          className="text-medium"
          href="https://github.com/eglove/eslint-config-ethang"
          isExternal
        >
          github.com/eglove/eslint-config-ethang
        </Link>
      </li>
    </ExperienceCard>
  );
}
