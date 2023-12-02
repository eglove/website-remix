import type { JSX } from 'react';

import { ExperienceCard } from '../experience-card';

export function StLouisCounty(): JSX.Element {
  return (
    <ExperienceCard
      endDate="Aug 2023"
      startDate="Jun 2023"
      title="St. Louis County"
      methodologiesUsed={[
        'rest',
        'mvc',
        'tdd',
        'composableDesign',
        'crabTesting',
        'onPremHosting',
        'dependencyInjection',
      ]}
      techUsed={[
        'react',
        'playwright',
        'bootstrap',
        'cSharp',
        'dotNet',
        'entityFramework',
        'xUnit',
        'moq',
        'javascript',
        'typeScript',
      ]}
    >
      <li>
        Consulted with St. Louis County Treasurer to write tickets and refine
        requirements for a sales tax distribution application. Discussions had
        been ongoing for a few years, and a lot of pressure was on to get the
        project done within a few months. I encouraged the team to start with
        what they know and move forward with well-tested code to get momentum
        going. Allow initial versions to be wrong so future versions can be
        right.
      </li>
      <li>
        Introduced automated testing to legacy codebases by setting up and
        writing unit tests for .NET backends as well as E2E and accessibility
        testing for React frontends. The major challenge with introducing tests
        to legacy codebases is that test runners sometimes expect the best
        practices that they enforce. For example, React state was not being
        handled immutably. While it seemed the applications were fine on manual
        review, tests revealed different states between renders. This was
        causing many very difficult to reproduce bugs. This means getting tests
        set up would require significant refactoring, even entire rewrites. This
        is why we pivoted to a focus on E2E as much as possible.
      </li>
      <li>
        Taught concepts of composibility and making use of methodologies like
        Atomic Design by Brad Frost. Much of the codebases were copy/pasted
        which meant changes had to be made in many different places at once. I
        encouraged making use of Reacts composable nature and led by example in
        writing abstractions for UI components, as well as utility functions to
        make life easier in the future.
      </li>
      <li>
        Added and stressed the importance of using automated tests, linting and
        static analysis through CI/CD pipelines.
      </li>
    </ExperienceCard>
  );
}
