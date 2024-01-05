import type { MetaFunction } from '@remix-run/node';

import { A } from '../components/elements/a';
import { PositionSummary } from '../components/resume/positions/position-summary';
import { ProjectSummary } from '../components/resume/projects/summary';
import { SkillBars } from '../components/resume/skill-bars';

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
      <PositionSummary />
      <ProjectSummary />
    </div>
  );
}
