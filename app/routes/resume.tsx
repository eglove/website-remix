import type { MetaFunction } from '@remix-run/node';

import { A } from '../components/elements/a';
import { Avatara } from '../components/resume/positions/avatara';
import { CenturyLink } from '../components/resume/positions/century-link';
import { EightBase } from '../components/resume/positions/eight-base';
import { Epa } from '../components/resume/positions/epa';
import { Proagrica } from '../components/resume/positions/proagrica';
import { Prologue } from '../components/resume/positions/prologue';
import { SeoConsulting } from '../components/resume/positions/seo-consulting';
import { StLouisCounty } from '../components/resume/positions/st-louis-county';
import { EslintConfig } from '../components/resume/projects/eslint-config';
import { Fetch } from '../components/resume/projects/fetch';
import { Hooks } from '../components/resume/projects/hooks';
import { Introspect } from '../components/resume/projects/introspect';
import { Sterett } from '../components/resume/projects/sterett';
import { UseForm } from '../components/resume/projects/use-form';
import { SkillBars } from '../components/resume/skill-bars';
import { dateFormatter } from '../components/resume/tech-format';

export const meta: MetaFunction = () => {
  return [{ title: 'Ethan Glover Resume' }];
};

export default function () {
  return (
    <div className="p-4 text-sm">
      <h1 className="text-xl font-bold">Ethan Glover</h1>
      <p>
        St. Louis, MO 63017 (Open to Relocation) |{' '}
        <A isExternal color="foreground" href="tel:8165420568">
          (816) 542-0568
        </A>
      </p>
      <p>
        <A isExternal color="foreground" href="mailto:hello@ethang.email">
          hello@ethang.email
        </A>{' '}
        |{' '}
        <A isExternal color="foreground" href="https://ethang.dev">
          https://ethang.dev
        </A>
      </p>
      <p className="my-4">
        Software engineer with experience across many different technologies. I
        have been writing code and working with the web for most of my life. I
        built my first website at around 9 years old, it was a green neon
        background with 10 pictures of monkeys written in HTML/CSS. I&apos;ve
        continued to learn through my life by getting into the
        advantages/disadvantages of different perspectives like OOP, functional
        programming, hybrid paradigms, test-driven development and
        behavior-driven development. I am constantly working on side projects
        and love jumping in and learning new things.
      </p>
      <h2 className="my-4 text-xl font-bold">Core Skills</h2>
      <SkillBars />
      <h2 className="mt-8 flex items-center justify-between">
        <span className="text-xl font-bold">
          {' '}
          Software Contractor/Consultant
        </span>
        <span>
          {dateFormatter.format(new Date('Nov 2018'))} -{' '}
          {dateFormatter.format(new Date('Aug 2023'))}
        </span>
      </h2>
      <StLouisCounty />
      <Proagrica />
      <Epa />
      <EightBase />
      <Avatara />
      <Prologue />
      <CenturyLink />
      <SeoConsulting />
      <h2 className="my-4 text-xl font-bold">Projects</h2>
      <Fetch />
      <UseForm />
      <Hooks />
      <EslintConfig />
      <Sterett />
      <Introspect />
    </div>
  );
}
