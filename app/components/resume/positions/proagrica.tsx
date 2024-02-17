import type { JSX } from 'react';

import { ExperienceCard } from '../experience-card';
import { positions } from './positions';

export function Proagrica(): JSX.Element {
  return (
    <ExperienceCard {...positions.proagrica}>
      <li>
        Worked with highly dynamic farming dashboard for an international
        audience. Made use of Redux to manage complex state interactions and
        used time travel debugging to discover existing state, debug, and build
        new features.
      </li>

      <li>
        Developed reusable, and modular components for weather features from
        scratch that respected timezones for fields rather than for the
        user&apos;s location.
      </li>

      <li>
        Made use of i18next to handle langauge translations and encourage heavy
        use of JavaScript&apos;s Intl API to properly format dates for specific
        locales, as well as numbers for units such as acres, hectares,
        fahrenheit and celsius.
      </li>

      <li>
        Built PDF reporting API from scratch using ReactPDF to server render
        field reports which could be retrieved and downloaded on GET requests.
        This project was linted with ESLint, built with Docker, and automated
        tests set to run on GitLab. Deployments used the companies custom Go CLI
        to push to Kubernetes based on git tags.
      </li>
    </ExperienceCard>
  );
}
