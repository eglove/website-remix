import type { JSX } from 'react';

import { A } from '../../elements/a';
import { ExperienceCard } from '../experience-card';

export function UseForm(): JSX.Element {
  return (
    <ExperienceCard
      methodologiesUsed={[]}
      techUsed={['typeScript', 'javascript', 'react', 'zod']}
      title="@ethang/use-form"
    >
      <li>
        NPM library to deal with forms in React. Uses idiomatic patterns for
        React + AJAX form submissions. Includes ability to validate forms with
        Zod schemas.
      </li>

      <li>
        <A
          isExternal
          className="text-medium"
          href="https://github.com/eglove/use-form"
        >
          github.com/eglove/use-form
        </A>
      </li>
    </ExperienceCard>
  );
}
