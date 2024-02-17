import type { JSX } from 'react';

import { ExperienceCard } from '../experience-card';
import { positions } from './positions';

export function Avatara(): JSX.Element {
  return (
    <ExperienceCard {...positions.avatara}>
      <li>
        Worked with multiple technologies in an experimental environment using
        WebRTC, GraphQL, Rust, WebAssembly, Web Components, .NET MAUI and more.
      </li>

      <li>
        Built a team collaboration app from scratch which included features such
        as P2P video conferences, chat, phone calls, calendar, file sharing and
        more. All with realtime notifications between users and teams provided
        by websockets and styled with CSS modules. I was by myself on this
        project tasked with bringing a general idea to life.
      </li>

      <li>
        Rewrote REST API to GraphQL and wrote abstractions to get the best of
        Apollo Server and Prisma working together. This resulted in a 7x
        performance improvement for many backend queries.
      </li>

      <li>
        Created monorepo architecture with NX as well as a custom Node CLI as a
        wrapper for additional utilities. Such as using git sparse-checkout to
        pull projects and their shared libraries the developer is working with.
        For example, if the collaboration UI uses the utility library. When a
        developer wants to work on the collaboration UI, they would check it out
        and git would do a sparse checkout of both the collaboration UI and
        utility library, but would not checkout the GraphQL API on the same
        repo.
      </li>
    </ExperienceCard>
  );
}
