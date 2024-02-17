import { A } from '../components/elements/a';
import { Blockquote } from '../components/elements/blockquote';
import { Heading } from '../components/elements/heading';
import { Paragraph } from '../components/elements/paragraph';
import { SanityImage } from '../components/elements/sanity-image';

export default function () {
  return (
    <>
      <Paragraph>
        Next 12 introduced an alpha version of server components but it seems
        not a lot of people bothered to try them out. But with the introduction
        of nested layouts and server components as a default in beta with Next
        13, it seems everyone is jumping to try to get it all implemented and
        working as soon as possible.
      </Paragraph>

      <Paragraph>
        I will say that layouts are rough. Unless you&apos;re doing everything
        static, there are a lot of issues. A lot of components that use React
        hooks just don&apos;t work with &ldquo;client components&rdquo;. Third
        party libraries aren&apos;t likely to work with Next 13 layouts just
        yet.
      </Paragraph>

      <Paragraph>
        That being said, this is all bringing huge changes to the way we build
        React apps. Whether you use NextJS or not.
      </Paragraph>

      <Heading variant="h3">React is Officially Recommending NextJS</Heading>

      <Blockquote
        link="https://react.dev/learn/start-a-new-react-project"
        source="Start a New React Project"
      >
        If you&apos;re learning React, we recommend Create React App. ... If
        you&apos;re looking to start a production-ready project, Next.js is a
        great place to start.
      </Blockquote>

      <Paragraph>
        To understand why React is moving in this direction of recommending
        frameworks, it&apos;s worth noting what they said at Next.js Conf 2022.
      </Paragraph>

      <Blockquote source="Next.js Conf 2022">
        I&apos;ve been thinking of NextJS 13 as really like, this is the real
        React 18 release. Because even though we have a lot of primitives in
        React 18, you can&apos;t really take advantage of them unless you have a
        framework that takes... that is built on top of those architectural
        primitives. So on Facebook.com, Facebook has an infrastructure
        that&apos;s based on Relay and some other routing concepts that... I
        mean one way to think of it is that NextJS is an open source
        implementation of that. In some ways it even goes a step further now
        with server components. I&apos;m really excited for the rest of the
        React community to now be able to take advantage of all of these
        improvements that we spent so many years researching and building.
      </Blockquote>

      <Paragraph>
        Or to solidify this further, it&apos;s worth reading Dan Abramov&apos;s
        thoughts on Next 13.
      </Paragraph>

      <Blockquote
        link="https://twitter.com/dan_abramov/status/1585076899126345728"
        source="Dan Abramov"
      >
        on the other hand, for the past five years, much of our work has been
        directed towards features that can only truly shine within a deeper
        stack integration. the most basic one is server rendering; it makes
        sense to render React to HTML, but this requires a bit of manual wiring!
      </Blockquote>

      <Blockquote
        link="https://twitter.com/dan_abramov/status/1585076899126345728"
        source="Dan Abramov"
      >
        this is why I like to think of React as two things. React is a library.
        it is *also* an architecture (which frameworks may implement). this
        architecture doesn&apos;t specify things like filename conventions, but
        it&apos;s focused on pieces where deep integration with React has most
        value.
      </Blockquote>

      <Heading variant="h3">Caching = Global State</Heading>

      <Paragraph>
        You may have already ditched global state providers like Redux for
        client-side cache invalidation via React Query or SWR, and switched to{' '}
        <A href="https://beta.reactjs.org/learn/managing-state">
          Reacts recommended way of handling state management
        </A>
        . (
        <A href="https://hswolff.com/blog/why-i-love-usereducer/">
          Harry Wolff recommended this pattern
        </A>{' '}
        2 years before it became a part of official docs.) If you have,
        you&apos;re already familiar with this concept, if you haven&apos;t,
        it&apos;s coming.
      </Paragraph>

      <Paragraph>
        Not only does the new router in Next 13 introduce global caching and
        deduplication,{' '}
        <A href="https://github.com/facebook/react/blob/main/packages/react/src/ReactFetch.js#L42">
          but React is now overriding the global fetch method to add caching
        </A>
        . Of course this is a very controversial decision as overriding native
        methods isn&apos;t exactly in good taste.
      </Paragraph>

      <SanityImage
        alt="React overrides globalThis.fetch instead of using import {fetch}"
        height={Math.round(1117 / 3)}
        src="https://cdn.sanity.io/images/drccvtog/production/612503262c745fc1a51a67a922ec84f77e0e57ac-1095x1117.jpg"
        width={Math.round(1095 / 3)}
      />

      <Paragraph>
        But overall the point is, with data fetching handled by built in caching
        in both React and NextJS, the need for state management decreases
        significantly. Suddenly the idea of only creating small, scoped
        contexts, makes a lot more sense than a global provider.
      </Paragraph>

      <Paragraph>
        It&apos;s important to remember that NextJS components in the beta app/
        directory are server side by default. And on the server, context
        doesn&apos;t exist. I would of course say to avoid the temptation to
        just make everything client side just to force old mental models.
      </Paragraph>

      <Paragraph>
        I have enough experience building highly dynamic complex apps without
        global providers to give the &ldquo;but my app is bigger than your app,
        you just don&apos;t understand&rdquo; much attention.
      </Paragraph>

      <Heading variant="h3">Edge Deployments</Heading>

      <Paragraph>
        Serverless deployments are coming in hot whether we want to embrace it
        or not. There is still a minority of projects out there trying to
        deliver React apps as a single bundle on S3 buckets or CDN.
      </Paragraph>

      <Paragraph>
        This is not realistic for the modern dynamic app. As apps have grown, we
        know the performance hit they take on hydration. Trying to load all JS
        at once just doesn&apos;t make sense. Nor does it make sense to make
        everything static again.
      </Paragraph>

      <Paragraph>
        By delivering frontend servers to the edge that can build, render, and
        create a client side cache for each user, we can have customizable,
        dynamic experiences without the sacrifice to performance.
      </Paragraph>

      <Heading variant="h3">It&apos;s Not Just NextJS</Heading>

      <Paragraph>
        It&apos;s not just that React has cozied up close with Vercel. Or
        it&apos;s not that Vercel has just influenced React. Shopify Hydrogen
        and Gatsby have been very influential in making these changes too.
        Because they&apos;re all trying to solve the same problems.
      </Paragraph>

      <Paragraph>
        This has been a collaborative effort and many years of work to make
        happen. If you haven&apos;t already, it&apos;s worth going in to the{' '}
        <A href="https://react.dev">new React documentation</A> and{' '}
        <A href="https://beta.nextjs.org/docs">NextJS Beta documentation</A>{' '}
        with a clear mind and intention to relearn everything you know about
        working with React. Because I believe this is the direction the rest of
        the world is going to go in with or without us.
      </Paragraph>
    </>
  );
}
