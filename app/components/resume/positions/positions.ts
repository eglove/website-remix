import lodash from 'lodash';
import { DateTime } from 'luxon';

import type { skillMap } from '../skills';

type Position = {
  readonly endDate?: string;
  readonly methodologiesUsed: Array<keyof typeof skillMap>;
  readonly startDate: string;
  readonly techUsed: Array<keyof typeof skillMap>;
  readonly title: string;
};

export const positions = {
  avatara: {
    endDate: 'Mar 2022',
    methodologiesUsed: ['monorepo', 'onPremHosting'],
    startDate: 'Jul 2021',
    techUsed: [
      'webRtc',
      'webSockets',
      'graphQl',
      'nextJs',
      'react',
      'apollo',
      'nx',
      'node',
      'twilio',
      'prisma',
      'javascript',
      'typeScript',
      'htmlCss',
      'stencil',
      'rust',
      'webAssembly',
      'cSharpDotNet',
    ],
    title: 'Avatara',
  } as Position,
  centuryLink: {
    endDate: 'Dec 2020',
    methodologiesUsed: ['agile'],
    startDate: 'May 2020',
    techUsed: [
      'java',
      'springBoot',
      'apacheVelocity',
      'htmlCss',
      'vue',
      'javascript',
      'jira',
      'typeScript',
      'subversion',
    ],
    title: 'CenturyLink',
  } as Position,
  eightBase: {
    endDate: 'May 2022',
    methodologiesUsed: ['agile'],
    startDate: 'Mar 2022',
    techUsed: [
      'graphQl',
      'react',
      'node',
      'javascript',
      'typeScript',
      'typeGraphQl',
      'awsLambda',
      'htmlCss',
    ],
    title: '8base',
  } as Position,
  epa: {
    endDate: 'Nov 2022',
    methodologiesUsed: ['rest', 'agile', 'tdd', 'dependencyInjection'],
    startDate: 'Jun 2022',
    techUsed: [
      'typeScript',
      'node',
      'nestJs',
      'typeOrm',
      'jest',
      'javascript',
      'redux',
      'react',
      'uswds',
      'github',
      'htmlCss',
    ],
    title: 'US Environmental Protection Agency (EPA)',
  } as Position,
  nishtech: {
    methodologiesUsed: ['agile', 'onPremHosting', 'accessibility'],
    startDate: 'Nov 2023',
    techUsed: [
      'react',
      'nextJs',
      'typeScript',
      'javascript',
      'tailwind',
      'sitecore',
      'cSharpDotNet',
      'graphQl',
      'htmlCss',
    ],
    title: 'Nishtech',
  } as Position,
  proagrica: {
    endDate: 'May 2023',
    methodologiesUsed: [
      'agile',
      'accessibility',
      'rest',
      'tdd',
      'dependencyInjection',
    ],
    startDate: 'Dec 2022',
    techUsed: [
      'react',
      'redux',
      'tailwind',
      'javascript',
      'reactTestingLibrary',
      'storybook',
      'cSharpDotNet',
      'dotNet',
      'entityFramework',
      'mediatR',
      'i18next',
      'node',
      'typeScript',
      'zod',
      'reactPdf',
      'jira',
      'esLint',
      'docker',
      'gitlab',
      'htmlCss',
    ],
    title: 'Proagrica',
  } as Position,
  prologue: {
    endDate: 'Jul 2021',
    methodologiesUsed: ['rest'],
    startDate: 'Jan 2021',
    techUsed: ['php', 'yii', 'vue', 'laravel', 'javascript', 'htmlCss'],
    title: 'Prologue Technology',
  } as Position,
  seoConsulting: {
    endDate: 'May 2020',
    methodologiesUsed: ['seo'],
    startDate: 'Nov 2018',
    techUsed: ['react', 'graphQl', 'javascript', 'node', 'htmlCss'],
    title: 'SEO Consulting',
  } as Position,
  stLouisCounty: {
    endDate: 'Aug 2023',
    methodologiesUsed: [
      'accessibility',
      'rest',
      'mvc',
      'tdd',
      'composableDesign',
      'crabTesting',
      'onPremHosting',
      'dependencyInjection',
    ],
    startDate: 'Jun 2023',
    techUsed: [
      'react',
      'playwright',
      'bootstrap',
      'cSharpDotNet',
      'dotNet',
      'entityFramework',
      'xUnit',
      'moq',
      'javascript',
      'typeScript',
      'htmlCss',
    ],
    title: 'St. Louis County',
  } as Position,
};

export function getExperience() {
  const experience = {} as Record<keyof typeof skillMap, number>;

  lodash.forEach(positions, position => {
    const { startDate, endDate, techUsed, methodologiesUsed } = position;

    const start = DateTime.fromFormat(startDate, 'MMM yyyy');
    const end = lodash.isNil(endDate)
      ? DateTime.local()
      : DateTime.fromFormat(endDate, 'MMM yyyy');

    const duration = end.diff(start, 'months').months;

    const skillsUsed = [...techUsed, ...methodologiesUsed];
    for (const skill of skillsUsed) {
      const current = experience[skill];

      experience[skill] = (current ?? 0) + duration;
    }
  });

  lodash.forEach(experience, (months, skill) => {
    if (months >= 13) {
      experience[skill as keyof typeof skillMap] = Number(months / 12);
    } else {
      // @ts-expect-error allow this
      delete experience[skill as keyof typeof skill];
    }
  });

  return lodash.orderBy(
    Object.keys(experience).map(skill => {
      return {
        // @ts-expect-error allow this
        experience: experience[skill as keyof typeof skill],
        skill,
      };
    }),
    ['experience'],
    ['desc'],
  );
}
