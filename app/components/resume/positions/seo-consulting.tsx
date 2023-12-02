import type { JSX } from 'react';

import { ExperienceCard } from '../experience-card';

export function SeoConsulting(): JSX.Element {
  return (
    <ExperienceCard
      endDate="May 2020"
      methodologiesUsed={['seo']}
      startDate="Nov 2018"
      techUsed={['react', 'graphQl']}
      title="SEO Consulting"
    >
      <li>
        Consulted with two national radio stations to help with WordPress SEO.
        This primarily took the form of making use of YoastSEO, as well as
        improving page speed, and getting a blog started.
      </li>
      <li>
        Consulted with OneSpiritOneWorld.org, a non-profit working to end dog
        homelessness and abuse to improve SEO and page performance as well.
        Encouraged a heavier social media presence.
      </li>
      <li>
        Developed React/GraphQL web app to track charities and donations to help
        with deductions and favorite charities.
      </li>
    </ExperienceCard>
  );
}
