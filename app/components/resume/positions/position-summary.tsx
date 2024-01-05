import { ExperienceCard } from '../experience-card';

export function PositionSummary() {
  return (
    <ExperienceCard
      methodologiesUsed={[]}
      startDate="Nov 2018"
      techUsed={[]}
      title="Software Contractor/Consultant"
    >
      <li>
        Multiple contracts working with many different stacks. Primarily React
        as a frontend, and many backend technologies such as Node, .NET, Java
        and PHP.
      </li>
      <li>
        At LegrandAV I led an upgrade from vanilla React and Sitecore to NextJS.
        The project had been at a standstill for 2 months due to hosting
        problems. We got it running within a few weeks and moved on to a
        redesign of the user dashboard. I encouraged the the team to move away
        from outsourcing to markup services for frontend work and make use of
        accessible libraries such as NextUI.
      </li>
      <li>
        With St. Louis County, introduced automated testing to legacy codebases
        by setting up and writing unit tests for .NET backends as well as E2E
        and accessibility testing for React frontends. The major challenge with
        introducing tests to legacy codebases is that test runners sometimes
        expect the best practices that they enforce. For example, React state
        was not being handled immutably. While it seemed the applications were
        fine on manual review, tests revealed different states between renders.
        This was causing many very difficult to reproduce bugs. This means
        getting tests set up would require significant refactoring, even entire
        rewrites. This is why we pivoted to a focus on E2E as much as possible.
      </li>
      <li>
        At Proagrica, I worked with a highly dynamic farming dashboard for an
        international audience. Made use of Redux to manage complex state
        interactions and used time travel debugging to discover existing state,
        debug, and build new features.
      </li>
      <li>
        With the EPA, I helped rebuild Emissions Collection and Monitoring
        System (ECMPS) for reporting emission data with a new tech stack. I was
        one of three developers building the backend. We made an effort to
        always increase test coverage. The result was QA asking for us to slow
        down because our production was too fast and not revealing issues. This
        gave us time to produce more reproducible examples and help QA to ensure
        the highest quality possible.
      </li>
      <li>
        At Avatara I built a team collaboration app from scratch which included
        features such as P2P video conferences, chat, phone calls, calendar,
        file sharing and more. All with realtime notifications between users and
        teams provided by websockets and styled with CSS modules. I was by
        myself on this project tasked with bringing a general idea to life.
      </li>
    </ExperienceCard>
  );
}
