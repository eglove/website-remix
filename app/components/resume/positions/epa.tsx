import { Link } from '@nextui-org/link';
import type { JSX } from 'react';

import { ExperienceCard } from '../experience-card';
import { positions } from './positions';

export function Epa(): JSX.Element {
  return (
    <ExperienceCard {...positions.epa}>
      <li>
        Helped rebuild Emissions Collection and Monitoring System (ECMPS) for
        reporting emissions data with new tech stack.{' '}
        <Link
          className="text-sm"
          href="https://www.epa.gov/airmarkets/ecmps-re-engineering-effort"
          underline="always"
        >
          https://www.epa.gov/airmarkets/ecmps-re-engineering-effort
        </Link>
      </li>
      <li>
        Created new REST API to handle data in a multi-schema database making
        careful use of JavaScript promise patterns to take advantage of
        asynchronous operations. I was one of three developers building the
        backend, we made a effort to always be increasing test coverage, the
        result was QA asking for us to slow down because our production was too
        fast and not revealing issues. This gave us time to produce more
        reproducible examples and help QA to ensure the highest quality
        possible.
      </li>
      <li>
        Moved to help with React frontend as our work on the contract ended
        early. I helped work with tables to display EPA data and allow users to
        build custom reports that were downloaded as .csv files.
      </li>
    </ExperienceCard>
  );
}
