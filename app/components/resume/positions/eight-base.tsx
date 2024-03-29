import type { JSX } from 'react';

import { ExperienceCard } from '../experience-card';
import { positions } from './positions';

export function EightBase(): JSX.Element {
  return (
    <ExperienceCard {...positions.eightBase}>
      <li>
        Worked on a low-code platform for a startup for generating GraphQL APIs
        through a React-based user interface.
      </li>

      <li>
        This was a short contract to help a company whose primary team was in
        Russia at the start of the war with Ukraine. With payment systems cut
        off, they could no longer get payments to developers. A US team was
        built quickly on an emergency, we had to adapt and keep the product
        going without onboarding.
      </li>
    </ExperienceCard>
  );
}
