import type { JSX } from 'react';

import { ExperienceCard } from '../experience-card';

export function CenturyLink(): JSX.Element {
  return (
    <ExperienceCard
      endDate="Dec 2020"
      methodologiesUsed={['agile']}
      startDate="May 2020"
      title="CenturyLink"
      techUsed={[
        'java',
        'springBoot',
        'apacheVelocity',
        'htmlCss',
        'vue',
        'javascript',
        'jira',
        'typeScript',
        'subversion',
      ]}
    >
      <li>
        Redesigned customer dashboard for users managing their accounts with
        vanilla JavaScript and CSS stylesheets. Maintained compatibility with
        Internet Explorer 11.
      </li>
      <li>
        Helped and guided team more familiar with Java and HTML templating to
        create a Vue based proof of concept. A frontend rewrite is something the
        team had wanted to do, but the company had no direct funding for. We
        built a POC as a side project to prove it would take less time and money
        than expected.
      </li>
    </ExperienceCard>
  );
}
