import { A } from '../components/elements/a';
import { Blockquote } from '../components/elements/blockquote';
import { Heading } from '../components/elements/heading';
import { Paragraph } from '../components/elements/paragraph';

export default function () {
  return (
    <>
      <Heading variant="h3">Echoed Opinions</Heading>
      <Paragraph>
        <A href="https://www.epicweb.dev/why-i-wont-use-nextjs" isExternal>
          Why I Won&apos;t Use Next.js
        </A>
        , Kent C. Dodds
      </Paragraph>
      <Paragraph>
        <A href="https://pilcrow.vercel.app/blog/nextjs-why" isExternal>
          Next.js, just why?
        </A>
        , Pilcrow
      </Paragraph>
      <Paragraph>
        <A
          href="https://twitter.com/tannerlinsley/status/1746970043836158330"
          isExternal
        >
          ...dancing around experimental APIs that my open source users think
          are officially ready for prime time
        </A>
        , Tanner Linsley
      </Paragraph>
      <Paragraph>
        <A href="https://blog.cassidoo.co/post/annoyed-at-react/" isExternal>
          Kind of annoyed at React
        </A>
        , Cassidy Williams
      </Paragraph>
      <Paragraph>
        <A
          href="https://macwright.com/2024/01/03/miffed-about-react"
          isExternal
        >
          Increasingly miffed about the state of React releases
        </A>
        , Tom MacWright
      </Paragraph>
      <Paragraph>
        <A href="https://www.youtube.com/watch?v=oQiEZ8adag0" isExternal>
          React&apos;s becoming a bit weird...
        </A>
        , Maximilian Schwarzmuller
      </Paragraph>
      <Paragraph>
        <A
          href="https://www.flightcontrol.dev/blog/nextjs-app-router-migration-the-good-bad-and-ugly"
          isExternal
        >
          Next.Js App Router Migration: The Good, Bad, And Ugly
        </A>
        , Brandon Bayer
      </Paragraph>
      <Paragraph>
        I&apos;ve been a Vercel and NextJS stan for years. Since version 7 when
        it was being compared to Jekyll and Hugo, I&apos;ve been defending it as
        a professional grade tool for building modern web applications. And just
        as public opinion seems to be swaying in favor of NextJS, I&apos;m very
        much done with it. And for the people finally getting on board with
        NextJS in the last year or so, the same people I&apos;ve been trying to
        convince for the last 5 years, I&apos;m sorry we couldn&apos;t meet in
        the middle.
      </Paragraph>
      <Paragraph>
        I&apos;m done with NextJS for the same reason a lot of people are
        hearing about for the first time and thinking, &ldquo;this is actually
        pretty good.&rdquo; React now recommends NextJS for new projects. At
        first, I was excited about this. Finally React is growing up. I gushed
        over the documentation changes in{' '}
        <A href="https://ethang.dev/blog/react-development-about-change">
          React Development is About to Change
        </A>
        .
      </Paragraph>
      <Blockquote
        link="https://react.dev/learn/start-a-new-react-project"
        source="Start a New React Project"
      >
        If you&apos;re learning React, we recommend Create React App. ... If
        you&apos;re looking to start a production-ready project, Next.js is a
        great place to start.
      </Blockquote>
      <Blockquote source="Next.js Conf 2022, October 25, 2022">
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
      <Blockquote
        link="https://twitter.com/dan_abramov/status/1585080534488985601"
        source="Dan Abramov, Oct 25, 2022"
      >
        on the other hand, for the past five years, much of our work has been
        directed towards features that can only truly shine within a deeper
        stack integration. the most basic one is server rendering; it makes
        sense to render React to HTML, but this requires a bit of manual wiring!
      </Blockquote>
      <Blockquote
        link="https://twitter.com/dan_abramov/status/1585076899126345728"
        source="Dan Abramov, Oct 25, 2022"
      >
        this is why I like to think of React as two things. React is a library.
        it is *also* an architecture (which frameworks may implement). this
        architecture doesn&apos;t specify things like filename conventions, but
        it&apos;s focused on pieces where deep integration with React has most
        value.
      </Blockquote>
      <Heading variant="h3">The Abysmal Handling of App Router</Heading>
      <Paragraph>
        Reacts big new change that has lead them to finally recommend frameworks
        is React Server Components. An incredible feature who&apos;s
        architecture allows a client and server state synchronization we
        haven&apos;t seen before with this sort of ease. But NextJS&apos;s
        handling of it has been abysmal. Next 13 was released with an
        experimental app router immediately after the 2022 conference. It was
        rightfully labelled as an alpha feature because it was far from done.
        Still, the closer NextJS got to promoting app router from alpha to
        stable, the social media PR started to get a little heavier. Lee
        Robinson and Sebastian Markbåge started answering more questions and
        frustrations on NextJS on Twitter. When people asked when it would be
        ready for production, their replies would be &ldquo;It&apos;s pretty
        much ready now.&rdquo; This drove some of the more naive to start
        building production apps with app router. Which I&apos;ll get into more
        later.
      </Paragraph>
      <Paragraph>
        Not much longer after, a second conference for the year is scheduled and
        announced by Vercel. Everyone knows what&apos;s coming, it&apos;s just a
        question of why and how. Why another conference in the same year? And
        how is it possible that app router is going to be announced as stable so
        soon? We&apos;re all seeing hundreds of bugs that make this thing
        unusable. The NextJS GitHub goes into overdrive, the Vercel
        representatives start pushing more people to try app router and report
        issues to them. &ldquo;It&apos;s pretty much ready now. But we need more
        reproducible bugs.&rdquo;
      </Paragraph>
      <Paragraph>
        App router is{' '}
        <A href="https://nextjs.org/blog/next-13-4" isExternal>
          announced as ready for production on May 4, 2023
        </A>{' '}
        and create-next-app now recommends starting with it. It is not done. We
        all know this. People are pointing it out, Vercel and React won&apos;t
        even respond. They keep asking for reproducible bugs, they&apos;re
        getting hundreds but not a word about whether this was a good idea to
        begin with. Vercel is communicating through the filter of PR and
        marketing and they are not being transparent.
      </Paragraph>
      <Blockquote
        link="https://twitter.com/dan_abramov/status/1673394979106856960"
        source="Dan Abramov, Jun. 26 2023"
      >
        i still love programming but i’m totally burned out on the programming
        discourse. at least atm. not good energy. i wonder what a fun and
        playful version of this could look like
      </Blockquote>
      <Blockquote
        link="https://twitter.com/dan_abramov/status/1702437951236395087"
        source="Dan Abramov, Jun. 30 2023"
      >
        also i’m obviously speaking from my own personal perspective. the react
        party line is we’re working on it yada yada. because we are.
        non-heckin-stop. but my personal feeling is that this attitude and
        climate will eventually burn people out one by one. no future is assured
      </Blockquote>
      <Blockquote
        link="https://twitter.com/dan_abramov/status/1702437951236395087"
        source="Dan Abramov, Sep. 14 2023"
      >
        imo app router 1.0 was the nextjs ios 7 moment. a radical cleanup but
        everything is too flat, the labels are misaligned, and the moving blur
        is jerky. marked as stable early but clearly (imo!!!) a move into the
        right direction, with the visual layer architecture persisting to now
      </Blockquote>
      <Paragraph>
        Dan is the only person that got close to speaking honestly about the
        reality of app router and it&apos;s RSC implementation. He&apos;s quite
        nice and plays the game well. I feel he does hold back in the interest
        of public image and not hurting feelings. But to me, this is not a
        professional approach, we need to learn to treat our profession as a
        profession, not a family gathering. If something is going wrong, we need
        to be frank and open. If technologies or companies are handling
        something poorly, that has nothing to do with any individual. We can
        allow the building to take the insults get offended while we humans work
        on progress. It&apos;s unhealthy to take criticism against a company or
        product as an individual, no matter how much you&apos;ve contributed.
      </Paragraph>
      <Paragraph>
        While the bloggers were enjoying the ability to async/await their
        favorite CMS directly in a React component, a lot of people were
        discovering some very alarming issues. Losing access to server side
        basics like headers and cookies. loading.tsx files conflicting with one
        another causing Suspense to fire loading states multiple times. No
        official way to handle dynamic forms. No stable way to handle forms
        period. Hundreds of issues related to Next bundling experimental
        versions of React (RSC isn&apos;t even stable in React yet.). Official
        current documentation using experimental imports such as useFormStatus,
        useFormState and useOptimistic. A lot of people seem to have forgotten
        that Next aliased the experimental &ldquo;use&rdquo; hook for React as a
        stable feature and silently removed it soon after because of how many
        bugs it had caused. This is barely touching the tip of the iceberg in
        terms of issues app router has and still has today.
      </Paragraph>
      <Heading variant="h3">Why Leave NextJS Now?</Heading>
      <Paragraph>
        When App Router went stable, I tried building a new application with it
        from scratch. Dynamic content with lots of updates by multiple users.
        Getting it to even build, was a massive headache. I spent weeks trying
        to find workarounds for broken features. What I ended up with is the
        slowest site I have ever built in over 20 years of building for the web.
        One that I don&apos;t trust to work and one that I&apos;m not proud of
        showing off. It killed my energy for the project entirely.
      </Paragraph>
      <Paragraph>
        I won&apos;t say app router didn&apos;t work for everything I migrated
        it to. I have a basic site that pulls data from Sanity. Incremental
        Static Regeneration is good. But moving this project to app router
        wasn&apos;t using anything other than RSC. None of the new NextJS
        features, just the one feature that came from React itself. It was the
        same for my blog, it&apos;s all statically built, very difficult for
        Next to mess it up. Except for my new homepage. Paginating through
        multiple categories of data on the same page. This is what told me
        I&apos;m done with NextJS.
      </Paragraph>
      <Paragraph>
        The simple answer to multiple paginations on the same page is client
        side rendering. But this caused an issue with NextJS because fetching
        new data would trigger Suspense to reload every category. So I thought,
        let me wrap each category in it&apos;s own Suspense boundary. This way,
        the loading state will be caught for the individual category. This does
        not happen. Instead, both loading states are triggered. All categories
        reload, and then the individual category reloads when going to a new
        page. Meaning when you move to a new page on a category, you see all
        categories as a loading spinner or skeleton, they all load, then the one
        that you moved to the next page on goes into a loading spinner or
        skeleton AGAIN, before finally showing the content again.
      </Paragraph>
      <Paragraph>
        The official NextJS solution to this seems to be parallel routing. But
        parallel routing has to be setup in a layout file. And for the homepage,
        that means the RootLayout. If I put those categories in the RootLayout
        that means it shows on every page. Now I&apos;ve got to do some
        ridiculous conditional logic to hide it, or do a URL rewrite from
        another route. And I&apos;ll say, btw, that next config rewrites are
        just redirects. They don&apos;t exactly work.
      </Paragraph>
      <Paragraph>
        I called this out from the beginning. Using file naming conventions to
        handle logic was a bad idea. It creates restrictions and removes escape
        hatches. This is the wrong kind of opinionation. There&apos;s no
        possibility for an inversion of control.
      </Paragraph>
      <Paragraph>
        And of course the NextJS subreddit has become an advertising board,
        immediately deleting any criticism about app router beyond simple issues
        that seem fixable in the immediate future such as the slow dev server
        and hot reloads. And... can I just say, who cares about a slow dev
        server? Why on gods earth would that ever be a priority? There are far
        more important issues to pay attention to. The focus for Vercel seems to
        be to maintain the attention of Twitter and public GitHub issues, which
        lets be honest, is primarily hobbyists who aren&apos;t deploying most of
        what they&apos;re doing.
      </Paragraph>
      <Paragraph>
        When you couple this with all the other frustrations I had building with
        NextJS, I found it&apos;s just not worth it. So I started looking for
        other frameworks. I like .NET as a backend, but Razor pages aren&apos;t
        something you can just whip up in a minute like you can with JSX. Remix
        is basically just a copy of Next 12 and I never really trusted it.
        Gatsby&apos;s data layer is a pest and not great for working with
        anything that isn&apos;t a GraphQL CMS. Svelte has too much Vercel
        influence who I&apos;ve lost all trust in. So I finally landed on Astro.
      </Paragraph>
      <Heading variant="h3">Astro &gt; NextJS</Heading>
      <Paragraph>
        Astro provides an easy way to hydrate client side components via their
        signature islands. And allow you to prebuild pages so they aren&apos;t
        refetched on request. Then this can be opted out of for, let&apos;s say
        a dynamic API route that needs pagination params. It just checks all the
        boxes with none of the headaches.
      </Paragraph>
      <Paragraph>
        The compile step of Astro is refreshing. I get a simple dist directory
        and I can use node to run the index file. Build it with a Dockerfile and
        hand it off to Render for deployment. I feel like Vercel lured me into
        the illusion of convenience. Sure, if I want to build projects and put
        serious time into them, I can&apos;t spend a bunch of time on cloud
        platforms like AWS. That&apos;s a project in itself. So serverless means
        I can focus on building. But there are plenty of great options out there
        that are honestly better than Vercel. So my current stack is as follows:
      </Paragraph>
      <ul className="list-inside list-disc">
        <li>
          Hosting:{' '}
          <A href="https://render.com" isExternal>
            Render.com
          </A>
          , Docker Runtime
        </li>
        <li>
          Database:{' '}
          <A href="https://neon.tech" isExternal>
            Neon.tech
          </A>
        </li>
        <li>
          Domain: <A href="https://www.cloudflare.com">Cloudflare</A>
        </li>
      </ul>
      <Paragraph>
        In the future, I&apos;m likely to move images to Cloudflare as well. (Or
        Cloudinary) I&apos;m very surprised by the number of simple services
        Cloudflare offers. They remind me of a network service version of
        DigitalOcean. A couple clicks and you get what you wanted.
      </Paragraph>
      <Paragraph>
        Astro also provides a simple way to have some fun with multiple
        frameworks such as LitHTML which I&apos;ve always wanted to make use of.
        This feels right. Building with Astro has been as fun and as useful as
        building with NextJS used to be. And I can&apos;t wait to get into
        converting more projects.
      </Paragraph>
    </>
  );
}
