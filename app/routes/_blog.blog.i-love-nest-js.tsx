// eslint-disable-next-line unicorn/prevent-abbreviations
import { A } from '../components/elements/a';
import { Paragraph } from '../components/elements/paragraph';
import { SanityImage } from '../components/elements/sanity-image';

export default function () {
  return (
    <>
      <Paragraph>
        <span className="font-bold">Update:</span> I have updated this article
        in <A href="https://ethang.dev/blog/i-hate-nest-js">I Hate NestJS</A>.
      </Paragraph>
      <Paragraph>
        Decorators and Dependency Injection containers. Gross. What is this,
        Java? JavaScript is flexible enough that these kinds of structures
        aren&apos;t needed. Functions are first-class citizens. Objects can be
        immutably recreated with something as simple as a spread operator. Why,
        on earth, do we need NestJS?
      </Paragraph>
      <Paragraph>
        NestJS is something I&apos;ve avoided for awhile, it&apos;s not very
        popular, and not well loved. Frameworks like it make initial building
        very easy but very quickly become unreadable and difficult to work with.
        JavaScript (and TypeScript) are very flexible in that you can customize
        your design fairly easily. There&apos;s no need for the traditional
        opinionation of frameworks like Spring in the JS world.
      </Paragraph>
      <Paragraph>
        However, there&apos;s a use case I recently came across that very
        quickly turned NestJS into a part of my regular stack. GraphQL.
      </Paragraph>
      <Paragraph>
        I know the pains of writing a GraphQL system. It&apos;s much more
        difficult to write and organize than REST. I originally started with
        Apollo&apos;s suggested way of doing schema-first design. This provides
        a lot of flexibility and really shows the strength of GraphQL. You very
        quickly realize that each Node on a graph just maps to functions and
        their return structures.
      </Paragraph>
      <Paragraph>
        With schema first design you can very quickly start adding anything and
        everything to your graph. Database calls? Obviously, add it to the
        graph. Third party REST APIs? Type them, add them to the graph, hell
        even create relationships between what they return and your database.
        Arbitrary computed data? Add it to the graph.
      </Paragraph>
      <Paragraph>
        It&apos;s as easy as writing REST endpoints, except everything is under
        one URL that can be introspected with automatic documentation.
      </Paragraph>
      <Paragraph>
        There&apos;s an issue here though. GraphQL types. Or the schema to be
        exact. With schema first design it means writing all the schema yourself
        and mapping functions to each node. This gets very tiresome, very quick.
        It&apos;s all boilerplate. Not to mention after you write the schema,
        you might have to write TypeScript types. And everything has to match
        database introspection if you&apos;re not using the GraphQL schema to
        generate your DB.
      </Paragraph>
      <Paragraph>
        You might be tempted to find way to generate everything, but that&apos;s
        a long, dark, rabbit hole with some very unsatisfying answers. How do
        you generate as much as possible, but still leave plenty of room to
        customize logic and do whatever YOU want with YOUR graph?
      </Paragraph>
      <Paragraph>
        Which brings me to code first GraphQL design. Nexus. Am I the only one
        that thinks this syntax is awful? t.field? type: list(Account)? What is
        even ‘t’?
      </Paragraph>
      <SanityImage
        alt="Example of NexusJS syntax."
        height={549}
        src="https://cdn.sanity.io/images/drccvtog/production/b4d3295b12d3d5b26037571ed46cb66acf219e27-484x549.png"
        width={484}
      />
      <Paragraph>
        Sure it looks OK at first glance. And it generates the schema
        definitions for you! But I&apos;ve seen this in production at scale.
        I&apos;ve written schema-first in production at scale. They are both
        nightmares. Schema first sucks because of how much boilerplate work it
        inevitably leads to. Code first sucks because it&apos;s an unreadable
        mess the second your complexity goes from 0 to 0.2.
      </Paragraph>
      <Paragraph>This, finally, is where NestJS comes in.</Paragraph>
      <SanityImage
        alt="Example of NestJS GraphQL syntax."
        height={743}
        src="https://cdn.sanity.io/images/drccvtog/production/faad3e657de386da290c162b9aa885295b93e2fb-834x743.png"
        width={834}
      />
      <Paragraph>
        Simple, readable classes. If you&apos;re curious about what the
        “habitService” is, that&apos;s just where the actual logic runs. The
        beauty of NestJS is I can also create a controller file and make any of
        these queries or mutations a REST endpoint and they would use the exact
        same service for validation. Granted, that&apos;s perfectly doable
        without Nest, but you have to appreciate the little things.
      </Paragraph>
      <Paragraph>
        The point is, this markup is relatively obvious. Decorators generate the
        schema and the code stays readable. And if you&apos;re curious where the
        types like “FindUniqueHabitArguments” come from, those are also
        generated by a little NPM package called “
        <A
          href="https://www.npmjs.com/package/prisma-nestjs-graphql"
          isExternal
        >
          prisma-nestjs-graphql
        </A>
        ”. All of Prisma&apos;s arguments neatly packed into GraphQL schema.
        This is what I&apos;ve been looking for.
      </Paragraph>
      <Paragraph>
        So there&apos;s a last question remaining, do I now prefer NestJS for
        everything? Not exactly. The opinionated way of doing things is often
        way too strong. My thought is that if you spend more time Googling how
        to do X in Y framework, than you do how to do X in Y language,
        you&apos;ve got a bad framework.
      </Paragraph>
      <Paragraph>
        Frameworks limit flexibility. They inevitably cause blockers and
        bottlenecks that are specific to your app. Issues that could have been
        avoided had you designed the system (or framework) for your app to begin
        with.
      </Paragraph>
      <Paragraph>
        But damn is GraphQL hard to get right. I may continue learning Nest and
        finding more uses for it. Maybe this is only the beginning of this
        journey. I&apos;ll continue to explore but I just wanted to share what a
        great solution Nest is for GraphQL.
      </Paragraph>
    </>
  );
}
