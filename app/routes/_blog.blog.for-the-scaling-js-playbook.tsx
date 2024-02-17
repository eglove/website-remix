import { A } from '../components/elements/a';
import { CodeWrapper } from '../components/elements/code-wrapper';
import { Heading } from '../components/elements/heading';
import { Paragraph } from '../components/elements/paragraph';
import { SanityImage } from '../components/elements/sanity-image';
import { YouTube } from '../components/elements/youtube';

export default function () {
  return (
    <>
      <Paragraph>
        I want to start this by saying that this is only my current thinking. If
        you&apos;ve found a way that works better for you, that&apos;s
        fantastic. This is a description of what I&apos;ll call one of my
        favorite plays in my playbook for starting a JS project and leaving room
        for it to scale without pain. I am very specifically anti-monolithic
        framework, but not specifically anti-monolith. If everything in a
        project can fit comfortably in a small set of features, that&apos;s
        good. Don&apos;t do anything more than you need to do. But the last
        thing you want to do is get locked into a framework unable to
        realistically refactor yourself out of it. I suppose I can add this to
        the list of reasons <A href="/blog/i-hate-nestjs">I Hate NestJS</A>. But
        the point of this article is to describe my current strategy for
        starting with a monolith to get going and slowly split out into
        microservices when and if needed relatively pain free.
      </Paragraph>

      <Paragraph>
        As you read through this you may think that some changes are more
        difficult to make than it seems like I&apos;m making it out to be.
        That&apos;s not my intention. My intention is to summarize a path of
        scale. Any major change to an app requires work, nothing goes perfectly
        all of the time. But I do think this helps keep the pain minimal.
      </Paragraph>

      <Heading variant="h3">Starting Small</Heading>

      <Paragraph>
        Let&apos;s say you&apos;re building a productivity app. Users sign up,
        they track their habits/todos and their weight/calories as well. A
        common thing for me is to deploy a postgres database to{' '}
        <A href="https://render.com">Render</A> and plan on using{' '}
        <A href="https://www.prisma.io">Prisma</A> as an ORM.
      </Paragraph>

      <Paragraph>
        The problem is, however, I always have a temptation to reach straight
        for something like GraphQL.
      </Paragraph>

      <Paragraph>
        I&apos;m thinking of how nice it is to have a fully documented,
        type-safe, and introspectable API, and forgetting how much work it is. I
        understand the fallacy of tools like Hasura or TypeGraphQL. I know that
        they miss the point. By generating GQL schema from a database
        you&apos;re not just creating security problems for yourself, but
        you&apos;re losing all of the advantages of being able to create a
        flexible graph based API. If you&apos;re just using GraphQL as a client
        side ORM or to remove client side over fetching, you&apos;re not using
        GraphQL. Nor are you setting yourself up to scale for the problems that
        GraphQL so gracefully solves. But we&apos;ll get back to those later.
      </Paragraph>

      <Paragraph>So the question is, what do I fall back to?</Paragraph>

      <Paragraph>
        For me currently, it&apos;s just NextJS. Make full use of it&apos;s
        server side prop methods and API routes. This sounds like a mess to some
        people, but let&apos;s start off right. Let&apos;s rewind even more.
      </Paragraph>

      <Paragraph>
        <A href="https://nx.dev">Start with NX.</A>
      </Paragraph>

      <Paragraph>
        Starting with an &ldquo;extensible build system&rdquo; is, in my
        opinion, the key to scale without pain. The point of a monorepo is not
        necessarily to put all of a companies work into a single repository.
        We&apos;re not going from 0 to Google here. We are still starting small.
        We&apos;re talking about an NX workspace for this productivity app
        we&apos;re starting right now.
      </Paragraph>

      <Paragraph>
        In fact, with a workspace started, we can start the project with:
      </Paragraph>

      <CodeWrapper language="powershell">
        {['npx nx g @nrwl/next:app productivity-app']}
      </CodeWrapper>

      <Paragraph>
        However, the first thing I&apos;d actually work on is creating a library
        for our Prisma schema:
      </Paragraph>

      <CodeWrapper language="powershell">
        {['npx nx g @nrwl/node:lib productivity-app-prisma']}
      </CodeWrapper>

      <Paragraph>
        There&apos;s not much to add to this. Simply a .prisma file to start
        planning out schema, and a client file to{' '}
        <A href="https://www.prisma.io/docs/guides/database/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices">
          export a global instance of the generated client
        </A>{' '}
        to avoid issues with too many connections.
      </Paragraph>

      <Paragraph>
        With a Prisma client in place, you can now call it inside of server only
        contexts. Meaning API Routes, getServerSideProps, getStaticProps, etc.
      </Paragraph>

      <Paragraph>
        Now you can just start building the app. To get page data I recommend
        using{' '}
        <A href="https://tanstack.com/query/v4/docs/guides/ssr">
          TanStack Query SSR
        </A>
        . This will allow you to get the advantages of server-side rendering +
        hydration without prop drilling. This blog uses TanStack Query and
        getStaticProps. An initial load of a page will show the last statically
        built version, then update with any changes during hydration. I build
        often enough that this works ok for a small blog.
      </Paragraph>

      <Paragraph>
        For our app features, user sign-ups, todo-tracking, basically any POST
        request, Next API routes work just fine. If all you&apos;re doing is
        posting to a database to retrieve it later, there&apos;s nothing wrong
        with going this route. If for GET requests, you want client side
        rendering, you can add API calls to an API route as well.
      </Paragraph>

      <Paragraph>
        To help keep things organized I like to centralize fetches to the API in
        a callable object.
      </Paragraph>

      <SanityImage
        alt="Example of centralizing API in NextJS"
        height={927}
        src="https://cdn.sanity.io/images/drccvtog/production/3f42812d4c43a73bc90214c09dbc12531fc2575b-758x927.png"
        width={758}
      />

      <Paragraph>
        On the note of the actual logic of the calls here, it would be a good
        idea to put that logic in a separate NX library. So instead of the Next
        API route creating a new user, it just calls a function in another
        library.
      </Paragraph>

      <Paragraph>
        This sets things up so that when you want to move your API to it&apos;s
        own server, all you have to do is create new routes and call the same
        functions. Then from there just add a new root URL to your centralized
        calls on your frontend.{' '}
        <span className="font-bold">
          As long as inputs and outputs are the same, no further refactoring is
          required.
        </span>
      </Paragraph>

      <Paragraph>
        But to get this app going for now. This is all you need. We&apos;ve
        achieved the goal of setting ourselves up to be able to build a
        productivity app. The question of when more is needed, or when we need
        to &ldquo;scale up&rdquo;, isn&apos;t necessarily about number of users
        or number of features. This setup can go very, very far.
      </Paragraph>

      <Paragraph>
        As a quick note on state, do not add another state management library
        until you can not find an answer for what you&apos;re trying to do. I
        can tell you now that this app should never need one. For your own
        sanity, and for the performance of this app, make sure you understand
        <A href="https://beta.reactjs.org/learn/managing-state">
          how to manage state the React way
        </A>
        .
      </Paragraph>

      <Paragraph>
        When using analytics or third party scripts, I would recommend enabling{' '}
        <A href="https://nextjs.org/docs/basic-features/script">
          NextScript web workers
        </A>{' '}
        which in the background uses{' '}
        <A href="https://partytown.builder.io">PartyTown</A>.
      </Paragraph>

      <Heading variant="h3">Going Bigger</Heading>

      <Paragraph>
        This productivity app is getting popular. It&apos;s gained a lot of
        users, you&apos;ve added paid plans, everything is going well. But now
        you&apos;ve got some new ideas. Let&apos;s say that you want to add a
        feature to recommend new habits for people to add. In order to create
        these recommendations you&apos;re going to look at accounts with similar
        habits and find what they are also doing. Or even better yet, you want
        to help people find balance. For example, someone reads and codes
        everyday, but has no exercise habits, so you might put a &ldquo;Go for a
        walk&rdquo; recommendation in front of them.
      </Paragraph>

      <Paragraph>
        As an additional feature, if someone is missing a particular habit
        often, the app might recommend that they plan to do it less often. Such
        as every 3 days instead of every day. This helps them stay consistent
        without learning to ignore it.
      </Paragraph>

      <Paragraph>
        You determine to build a series of algorithms that run for every user
        and build a unique recommendation list for them that will show up on
        their page. This is certainly not something you want running on a server
        route every time they try to go to their profile. It&apos;s going to
        cause some major performance problems.
      </Paragraph>

      <Paragraph>
        Someone might suggest serverless functions to run CRON jobs, but this
        isn&apos;t quite the right fit. You&apos;ve got more features planned
        and you want to keep control over how all of this is handled. Maybe this
        is better triggered every time someone adds or removes a habit to help
        keep that recommendation relevant to the data its pulling from.
      </Paragraph>

      <Paragraph>
        Now might be a good time to move to a standalone Node server. But
        there&apos;s no reason to restrict the app to the rules of REST. And, we
        probably want end to end type safety. Until now you may have been
        inferring types from Prisma and passing that into NextJS props.
      </Paragraph>

      <Paragraph>
        At this point I would recommend using tRPC to build this new server. Add
        it as a new app on your monorepo, and set it up to call the logic you
        put in your API library earlier. tRPC is a natural fit for monorepos
        with the way it shares types.
      </Paragraph>

      <Paragraph>
        Then go into the centralized object and update the calls to use the tRPC
        client.{' '}
        <span className="font-bold">
          As long as the inputs and outputs at the same, no further refactoring
          is required.
        </span>
      </Paragraph>

      <Paragraph>
        The reason I didn&apos;t recommend starting with tRPC is because in
        terms of starting the app as a small serverless build, I think using it
        as a NextJS API route, similar to GraphQL, kind of misses the point.
        There are plenty of tools that require less configuration that can do
        the same job. NextJS handles itself at that size just fine. So tRPC is
        really needed if you never make it to this point.
      </Paragraph>

      <Paragraph>
        But with tRPC setup as its own server, you can start triggering any
        heavy processes as jobs every time someone adds or updates a habit to
        their profile. With TanStack queries cache invalidation, it will start
        pulling new recommendations after they&apos;re written to the database
        by these jobs rather than waiting on them to show the page.
      </Paragraph>

      <Paragraph>
        You&apos;ve now got a space for dedicated backend work and you can start
        getting fancy without overloading a serverless frontend deployment or
        slowing down your users experience.
      </Paragraph>

      <Paragraph>
        All with minimal refactoring. By just calling the same logic from a new
        server we didn&apos;t have to copy/paste a bunch of stuff into a new
        repository or go through a painful process of rewriting everything under
        a new context.
      </Paragraph>

      <Heading variant="h3">Going Biggest</Heading>

      <Paragraph>
        This app exploded in popularity. You&apos;ve got 2 separate teams to
        maintain the frontend and backend. And you&apos;ve got a huge list of
        features in the works.
      </Paragraph>

      <Paragraph>
        You want people to be able to follow one another. Maybe add some social
        network features like posting updates, images, adding likes etc. Images
        will be hosted with <A href="https://cloudinary.com">Cloudinary</A> to
        help with performance and handle transformations/filters. You want to
        synchronize calorie and activity tracking with smartphones. You&apos;d
        like a way for people to track their finances and create a budget. This
        will integrate with the Plaid API. You want to start splitting off all
        these new features into microservices to keep things manageable and
        testable in isolation.
      </Paragraph>

      <Paragraph>
        This means using an API gateway to route calls to all of these services
        and build flexible responses.{' '}
        <A href="https://www.youtube.com/watch?v=QrEOvHdH2Cg">
          And as Netflix learned, REST is not the right answer for that
        </A>
        . It needs to be well documented, type safe, and expandable to handle
        any number of services.
      </Paragraph>

      <Paragraph>
        This, finally, is where GraphQL comes in. Using GraphQL as a gateway we
        can use federation to merge multiple graphs into one central API. All
        services, even third party APIs can be put on a graph with relationships
        created between them to allow for nested calls where appropriate.
      </Paragraph>

      <Paragraph>
        The only way to do this right, for it to match the needs of this app or
        any app, is to write the schema incrementally by hand. Not generate it.
        We need to establish for example, that on the graph a User node has a
        relationship to a Plaid node. Or a SocialPost node has a relationship to
        a CloudinaryImage node. You need the relationship structure of a
        relational database without everything being on the same database. Or to
        put it another way, you need to maintain control over the relationships.
        This is the point of GraphQL. It is the point of graphs. The
        relationships are the most important part.
      </Paragraph>

      <Paragraph>
        As this becomes established, the frontend can use a mix of TanStack
        Query and and Prisma&apos;s{' '}
        <A href="https://github.com/prisma-labs/graphql-request">
          graphql-request
        </A>{' '}
        library. You could move to Apollo Client, but to be honest, doing SSR
        correctly with Apollo Client and getting caching right it&apos;s
        actually kind of difficult. To me it&apos;s easier to just combine
        graphql-request and TanStack. And because we&apos;re already using
        TanStack, once again this is just a case of updating our centralized API
        object.
      </Paragraph>

      <Paragraph>
        <span className="font-bold">
          As long as the inputs and outputs are the same, no further refactoring
          is required.
        </span>
      </Paragraph>

      <Heading variant="h3">Concluding</Heading>

      <Paragraph>
        Just to reiterate, this is only my current favorite play in my playbook.
        It&apos;s not the answer to every app. But it&apos;s a pretty decent one
        in my opinion. It&apos;s allowed me to move forward without worrying too
        much about the future. In 2-3 years time I&apos;ll likely have an
        entirely different opinion. That&apos;s how technology works.
      </Paragraph>

      <Paragraph>
        By moving logic, validations, etc., into libraries, the way that code is
        delivered becomes increasingly unimportant.{' '}
        <span className="font-bold">
          It separates implementation details from delivery details.
        </span>{' '}
        I think that&apos;s a great way to keep things flexible and open to
        evolution.
      </Paragraph>

      <Paragraph>
        Continued reading:{' '}
        <A href="https://ethang.dev/blog/nx-prisma-nextjs-graphql">
          Organizing NX, Prisma, NextJS and GraphQL
        </A>
      </Paragraph>

      <Paragraph>
        As some additional resources, I recommend the following two videos. One
        is a short conversation on microservices, the other is the previously
        linked video on how Netflix scaled it&apos;s API:
      </Paragraph>

      <YouTube
        id="Hybt9NdmsBw"
        title={`"People Get Microservices Wrong All The Time!" | Dave, Simon Brown & Hannes Lowette On Microservices`}
      />

      <YouTube
        id="QrEOvHdH2Cg"
        title="How Netflix Scales Its API with GraphQL Federation"
      />
    </>
  );
}
