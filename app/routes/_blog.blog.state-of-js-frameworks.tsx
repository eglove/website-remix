import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  NoSymbolIcon,
} from '@heroicons/react/24/solid';
import type { JSX } from 'react';

import { A } from '../components/elements/a';
import { Paragraph } from '../components/elements/paragraph';

export default function (): JSX.Element {
  return (
    <>
      <Paragraph>
        After I wrote{' '}
        <A href="/blog/moving-away-from-vercel">
          Moving Away from Vercel and NextJS
        </A>
        , I converted a couple of projects over to AstroJS. I do not regret it
        at all, Astro&apos;s simplicity made it very easy to move over my
        projects and get deployed to CloudFlare Pages with 0 effort.
      </Paragraph>
      <Paragraph>
        But there&apos;s another project I&apos;ve been struggling with,
        Introspect. My home for my{' '}
        <A
          isExternal
          href="https://introspect.dev/list/e7f779a0-838f-48d1-9aa7-3b3b5c534b8a"
        >
          recommended courses.
        </A>
        I&apos;m set on taking full advantage of modern JS frameworks for
        Introspect. But the problem is we&apos;re in the early stages of
        changing times. It&apos;s something I hinted at but didn&apos;t fully
        understand in{' '}
        <A href="/blog/react-development-about-change">
          React Development is about to Change.
        </A>
        A move to make static websites as dynamic as single-page apps. I think
        it&apos;s very interesting that a lot of frameworks seem to be
        converging on this idea. But the question is, who is doing it best?
      </Paragraph>
      <Paragraph>
        I&apos;ve been exploring different JS frameworks and I&apos;ve started
        to develop a few requirements that I need met.
      </Paragraph>
      <ul className="grid list-inside list-decimal gap-2">
        <li>
          Uses JSX for{' '}
          <A isExternal href="https://github.com/eglove/eslint-config-ethang">
            eslint-config-ethang
          </A>{' '}
          compatibility.
        </li>
        <li>Router is coupled with forms for data invalidation.</li>
        <li>Makes use of Browser APIs over React APIs.</li>
        <li>
          Has adapter support for CloudFlare Pages and using Edge runtime rather
          than Node. (With NodeJS compatibility for things like Buffer.)
        </li>
        <li>
          Makes use of form action interception so I don&apos;t have to write
          JSON endpoints, but provides good escape hatches for building and
          using JSON API&apos;s.
        </li>
      </ul>
      <Paragraph>Let&apos;s talk about the options.</Paragraph>
      <Paragraph>
        <A isExternal className="font-bold" href="https://htmx.org/">
          HTMX:
        </A>{' '}
        The JavaScript library that pretends not to be JavaScript to appeal to
        backend-only devs who hate JavaScript. The{' '}
        <A isExternal href="https://htmx.org/essays/">
          HTMLX Essay page
        </A>{' '}
        is full of rants about how nothing follows REST, and why HTMX&apos;s
        specific opinion of REST + HyperMedia was the way the web is MEANT to
        be. HTMX is not a framework, it&apos;s an opinion. It&apos;s use case is
        more for augmenting frameworks that lack the capability to build modern
        frontends. But HTMX itself can not be used to build a modern frontend.
        As it lacks abstractions to deal with DOM manipulation (it has only a
        few basic functions). HTMX has no router, and thereby no intelligent way
        to handle data holistically.
      </Paragraph>
      <div className="grid gap-2">
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <NoSymbolIcon color="red" height={16} width={16} />
          No JSX
        </p>
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <NoSymbolIcon color="red" height={16} width={16} />
          No Router
        </p>
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <NoSymbolIcon color="red" height={16} width={16} />
          Abstracts Browser APIs into HTML.
        </p>
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <NoSymbolIcon color="red" height={16} width={16} />
          Needs framework for work with edge such as creating Buffer&apos;s for
          PassKey Auth.
        </p>
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <NoSymbolIcon color="red" height={16} width={16} />
          No form action interception, defaults to AJAX APIs.
        </p>
      </div>
      <Paragraph>
        <A isExternal className="font-bold" href="https://astro.build/">
          Astro:
        </A>{' '}
        This is of course what I landed on originally. And it works great for my
        blog and CMS backed apps. Linting it isn&apos;t great. Even with
        modifying my own config, dealing with .astro files have been a small,
        but acceptable headache. Because Astro just builds to static files, you
        can do the same things with it that you can with HTMX. Except you can
        use JSX and TypeScript to achieve it. Which means much faster
        development. Also, with Astro you have to choose between static HTML
        forms (with full page reloads) or using a UI library for AJAX
        submissions + data invalidation. For an app like introspect, this means
        writing JSON API routes for a lot of interactions (including many future
        planned features with a lot more user interactions). Astro is a little
        weak with dashboard type apps, but to be fair, so was SPA. SPA only made
        them viable/realistic.
      </Paragraph>
      <div className="grid gap-2">
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <CheckCircleIcon color="green" height={16} width={16} />
          Uses JSX
        </p>
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <CheckCircleIcon color="green" height={16} width={16} />
          Frontmatter allows you to write server side logic for form actions.
        </p>
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <CheckCircleIcon color="green" height={16} width={16} />
          Exposes plain Request/Response objects to use native browser APIs.
        </p>
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <CheckCircleIcon color="green" height={16} width={16} />
          Excellent CloudFlare adapter that automatically adds NodeJS
          compatibility. Deploying to pages doesn&apos;t feel like you&apos;re
          deploying to a different environment. Even environment variables are
          available on the newer import(dot)meta(dot)env. (process does not
          exist on edge runtime).
        </p>
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <NoSymbolIcon color="red" height={16} width={16} />
          Astro does not have a client side router that allows form actions to
          invalidate data and refresh that data without full page reloads.
        </p>
      </div>

      <Paragraph>
        <A isExternal className="font-bold" href="https://nextjs.org/">
          NextJS:
        </A>{' '}
        The framework that swears it&apos;s stable, even if the entire world is
        disagreeing. NextJS released an incomplete version of what I&apos;ve
        been looking for and it&apos;s the reason I&apos;m looking for an
        alternative. Before App Router, people used NextJS JSON routes and tRPC
        to write endpoints for their server logic and called them with TanStack
        Query which handled client side data invalidation. It&apos;s the writing
        endpoints I&apos;d like to get away from. A GET request to a route
        should return HTML, and a POST request should run some logic and
        invalidate the content/cache of the GET request. That is the basic idea
        Next has been trying to move to, but by choosing to go server-side cache
        instead of client-side cache they&apos;ve created some difficult to work
        with, and very broken APIs that depend on Vercel infrastructure. And to
        achieve this, they are exposing experimental imports from the React
        library for tracking form status, and using RSC which is canary in
        React. But according them... it&apos;s &ldquo;stable&rdquo;.
      </Paragraph>
      <div className="grid gap-2">
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <CheckCircleIcon color="green" height={16} width={16} />
          Uses JSX
        </p>
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <NoSymbolIcon color="red" height={16} width={16} />
          This gets a no because this is not currently possible without using
          experimental React imports. Anyone using stable APIs must depend on
          JSON API routes and TanStack Query the same way we did before app
          router.
        </p>
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <NoSymbolIcon color="red" height={16} width={16} />
          Use of browser APIs is severly limited because of the Vercel
          infrastructure strategy, server-side caching, and HTML streaming.
          Developers have lost access to simple things like headers and cookies
          which makes it difficult to work with Browser APIs.
        </p>
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <ExclamationCircleIcon color="orange" height={16} width={16} />
          NextJS was built with edge runtime in mind. However basic things like
          the Image component do not work outside of Vercel. Every provider has
          to go through great pains to support NextJS without guidance on how do
          so. To get images to display with CloudFlare, they have a guide on
          creating a custom loader for images on CloudFlare CDN. But that is not
          a complete solution.
        </p>
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <NoSymbolIcon color="red" height={16} width={16} />
          Same as the second point, in terms of intercepting HTML form actions,
          these features are experimental.
        </p>
      </div>
      <Paragraph>
        <A isExternal className="font-bold" href="https://remix.run/">
          Remix:
        </A>{' '}
        This framework has always felt like a response to NextJS. Always
        comparing themselves to Next, always proclaiming that their way is the
        right way of doing things. And granted, in terms of how things are
        evolving right now, Remix is in a great position. I rebuilt parts of
        Introspect with Remix and really like the way they handle forms. Most of
        it&apos;s core features are specifically what I&apos;m looking for.
      </Paragraph>
      <div className="grid gap-2">
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <CheckCircleIcon color="green" height={16} width={16} />
          Uses JSX
        </p>
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <CheckCircleIcon color="green" height={16} width={16} />
          Remix was basically made to couple React Router, server side logic,
          and HTML forms.
        </p>
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <CheckCircleIcon color="green" height={16} width={16} />
          Does a great job of exposing Browser APIs where they&apos;re used and
          encouraging their use as much as possible.
        </p>
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <NoSymbolIcon color="red" height={16} width={16} />
          The CloudFlare adapter is a bit rough. You have to get environment
          variables off of context in loaders/actions, which isn&apos;t the end
          of the world, but can be annoying. And NodeJS compatibility is not
          available.
        </p>
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <CheckCircleIcon color="green" height={16} width={16} />
          By default Remix encourages using React Router + HTML forms for data
          invalidation, which is amazing. But it also provides a
          &lsquo;useSubmit&rsquo; hook that can be good for running client side
          logic before posting a form while still keeping the invalidation
          features.
        </p>
      </div>
      <Paragraph>
        <A isExternal className="font-bold" href="https://qwik.builder.io/">
          QwikCity:
        </A>{' '}
        I have been watching Qwik for a very long time and have been enamored by
        it&apos;s idea of resumability. Qwik is able to make the page
        interactive extemely quickly by using a service worker to pre-populate
        the browsers cache instead of hydrating with JavaScript. However, the
        framework built around it isn&apos;t great. There&apos;s not a lot of
        quality support or much of a full time team. APIs are inconsistent and
        reactivity is often delayed causing server and client to be out of sync
        enough to cause major bugs. This alone makes QwikCity a non-starter for
        me.
      </Paragraph>
      <div className="grid gap-2">
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <CheckCircleIcon color="green" height={16} width={16} />
          Uses JSX
        </p>
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <NoSymbolIcon color="red" height={16} width={16} />
          QwikCity doesn&apos;t really have much of a client-side anything. It
          uses a very raw and incomplete implementation of signals to
          synchronize state which causes the server to often be one step behind
          the client. And form values are not pulled from input values. Put
          these together and forms are unreliable.
        </p>
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <NoSymbolIcon color="red" height={16} width={16} />
          Doesn&apos;t really use most browser API&apos;s properly. You
          don&apos;t get pure request/response objects on the server and
          redirects often only work in what they call &ldquo;MPA mode&rdquo;
          which apparently just means when JavaScript is disabled.
        </p>
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <ExclamationCircleIcon color="orange" height={16} width={16} />
          The CloudFlare adapter for QwikCity works great as long as you use the
          CloudFlare template. However, the issue I have here is Qwik
          serialization. If you care about NodeJS compatibility, you&apos;re
          thinking about things like Buffer and Crypto. Because these can&apos;t
          be serialized, it&apos;s often difficult to figure out how to get them
          through Qwik&apos;s numerous &ldquo;serialization boundaries&rdquo;.
        </p>
        <p className="grid grid-cols-auto-1fr items-center gap-2">
          <NoSymbolIcon color="red" height={16} width={16} />
          Again the issue here is synchronization. You can not reliably predict
          what a server will return, and when a UI will update. The API&apos;s
          here are not clear and have many inconsistent behaviors due to bad
          state management and the framework apparently being built primarily
          for having JavaScript disabled.
        </p>
      </div>
    </>
  );
}
