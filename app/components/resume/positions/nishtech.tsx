import type { JSX } from 'react';

import { ExperienceCard } from '../experience-card';
import { positions } from './positions';

export function Nishtech(): JSX.Element {
  return (
    <ExperienceCard {...positions.nishtech}>
      <li>
        Lead frontend development to upgrade an eCommerce project to NextJS as
        well as redesigned to a more modern look with NextUI.
      </li>
      <li>
        Kickstarted project that had been stuck on deployment for 2 months after
        an upgrade from React to NextJS within the Sitecore ecosystem.
      </li>
      <li>
        Implemented new designs after deployment and helped team move away from
        outsourcing to &ldquo;markup services&rdquo; for frontend development
        and instead making use of modern accessible UI libraries like NextUI.
      </li>
      <li>
        Taught team unfamiliar with server-side rendering how to take full
        advantage of modern frameworks and avoid anti-patterns with React
        useEffect, overusing Redux, etc.
      </li>
    </ExperienceCard>
  );
}
