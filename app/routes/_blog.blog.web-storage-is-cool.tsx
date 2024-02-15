import { Link } from '@nextui-org/link';
import type { JSX } from 'react';

import { A } from '../components/elements/a';
import { Heading } from '../components/elements/heading';
import { Paragraph } from '../components/elements/paragraph';
import { SanityImage } from '../components/elements/sanity-image';
import { StorageEstimate } from '../components/storage-estimate';

export default function WebStorageIsCool(): JSX.Element {
  return (
    <>
      <Paragraph>
        Browsers provide a dizzying number of methods for storing data. Some of
        them, everyone knows about, a lot of them, many people have never heard
        of. And if you&apos;ve ever popped open dev tools and looked at the
        Application tab, you may have wondered, &ldquo;What is all of
        this?&rdquo;.
      </Paragraph>
      <SanityImage
        alt="Browser storage options in dev tools"
        height={215}
        src="https://cdn.sanity.io/images/drccvtog/production/c9950f24e815bdd3bf35708d33bbaaa170604db7-175x215.png"
        width={175}
      />
      <ol className="list-inside list-decimal">
        <li className="mb-2">
          <A
            className="font-bold"
            href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
            isExternal
          >
            Local Storage:
          </A>{' '}
          If you&apos;ve ever built a dark mode into an app, you may have used
          local storage. This is a synchronous, low storage option that does not
          expire with session. Limited to about 5MB, blocks the main thread, can
          only store strings, and is not available in web workers or service
          workers.
        </li>
        <li className="mb-2">
          <A
            className="font-bold"
            href="https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage"
            isExternal
          >
            Session Storage:
          </A>{' '}
          Tab specific, and scoped to the lifetime of a tab. Similar to local
          storage, this is limited to about 5MB of data, blocks the main thread,
          can only contain strings, and is not accessible from web and service
          workers. This is great for a small amount of session specific data
          such as for multi-step forms, and temporary user customizations.
        </li>
        <li className="mb-2">
          <A
            className="font-bold"
            href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API"
            isExternal
          >
            IndexedDB:
          </A>{' '}
          Asynchronous, does not block the main thread, accessible by both web
          and service workers, and stores... a lot. The amount varies based on
          browser and your local disk space. For example, you have an estimate
          of
          <StorageEstimate />
          available for ethang.dev shared between IndexedDB and Cache API. (Try
          opening FireFox, Safari, and Chromium browsers to see the difference.)
          It also allows you to create indexes, use cursor iteration, and stores
          most complex objects.
        </li>
        <li className="mb-2">
          <span className="font-bold">Web SQL:</span> Deprecated, don&apos;t use
          this.
        </li>
        <li className="mb-2">
          <A
            className="font-bold"
            href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies"
            isExternal
          >
            Cookies:
          </A>{' '}
          Sent with HTTP requests and perfect for things like authentication
          tokens. Cookies should not be used for storage. Unfortunately cookies
          have been abused in the past by third-parties for tracking which sites
          you visit. This has made them the target of privacy laws. An
          alternative for better, more structured analytics reporting would make
          use of the{' '}
          <A href="https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API">
            Beacon API
          </A>
          .
        </li>
        <li className="mb-2">
          <span className="font-bold">Private State Tokens:</span> This is a way
          to validate a users identity between two websites/origins without the
          use of cookies and sending private information. An issuer can validate
          a users identity and store a token in the browser. Then, from another
          origin a publisher can retrieve that token. Unfortunately, this
          feature seems to be in Chromium browsers only.
        </li>
        <li className="mb-2">
          <span className="font-bold">Interest Groups:</span> This is another,
          as of now, Chromium only feature that is meant to help move away from
          third-party cookies. In summary, advertisers can create an
          &ldquo;interest group&rdquo; based on a users interests and behaviors.
          This keeps information in the browser and allows advertisers to create
          targeted ads without the legal risks of collecting identifying
          information from cookies.
        </li>
        <li className="mb-2">
          <span className="font-bold">Shared Storage:</span> Yet another
          Chromium only feature designed to allow for cross-site storage while
          still protecting user privacy. It is a much more general storage than
          Private State Tokens and Interest Groups in that it allows anything to
          be shared between sites.
        </li>
        <li className="mb-2">
          <A
            className="font-bold"
            href="https://developer.mozilla.org/en-US/docs/Web/API/Cache"
            isExternal
          >
            Cache Storage:
          </A>{' '}
          My favorite in the list, a feature in all browsers that simply stores
          Request/Response pairs. This shares a storage limit with IndexedDB (
          <StorageEstimate />
          ). The Cache API is available in both service and web workers, and
          does not block the main thread. Basically, when you add a Request to
          Cache Storage, it will resolve and store the Response as a key/value
          pair. Responses can then be retrieved from storage by using the
          original Request. Requests are considered &ldquo;unique&rdquo; based
          on URL, Vary Header, and HTTP method.
        </li>
      </ol>
      <Heading variant="h2">Why Haven&apos;t I Heard of Most of These?</Heading>
      <Paragraph>
        I would guess that most developers only really know of cookies, session
        storage, and local storage. Why aren&apos;t we using at the very least
        IndexedDB and Cache Storage more often? I think the short answer to that
        is{' '}
        <Link href="https://tanstack.com/query/latest" isExternal>
          TanStack Query
        </Link>{' '}
        and state management. Web standards are very slow to change, and a lot
        of these were created as proposals in reaction to modern web
        development. When building a React app, it is generally smarter to
        choose TanStack Query over Cache Storage. And if needed{' '}
        <Link href="https://redux-toolkit.js.org" isExternal>
          Redux Toolkit
        </Link>{' '}
        over IndexedDB. Mobile developers are familiar with tools like{' '}
        <Link href="https://github.com/localForage/localForage" isExternal>
          localForage
        </Link>
        . All of these options allow you to configure various methods of
        persisting data in the browser. But they also bring a lot more features
        and tooling that are out of scope for JS standardization.
      </Paragraph>
      <Paragraph>
        With React Server Components, React is looking to change the game again.
        No other framework has pulled off an architecture with the seamless
        integration between client and server that RSC has. What this means for
        web apps is, in a lot of cases things like authentication tokens may
        never need to touch a client, and when they do, they can be passed to
        the client via React component props. All of this without losing
        reactivity. In comparison, Astro does not support rerendering
        server-only content. Rails and Turbolinks can only synchronously refetch
        server content, and the client will lose state in the process. Pulling
        browser only APIs into this can complicate matters.
      </Paragraph>
      <figure className="mx-auto">
        <SanityImage
          alt="RSC Architecture"
          height={Math.round((600 / 2214) * 1238)}
          src="https://cdn.sanity.io/images/drccvtog/production/eb5fac193f8bf59556a951c5868038aad783ecb0-2214x1238.jpg"
          width={600}
        />
        <figcaption className="text-center">
          React Server Components (Blue = Server, Green = Client)
        </figcaption>
      </figure>
      <Paragraph>
        That&apos;s not to say I would discourage the use of any of these
        storage APIs. The more well known cookies, session storage, and local
        storage have a place in every web stack. IndexedDB and Cache API may be
        good to reach for in small apps that don&apos;t have a lot of
        interactivity outside of form submissions that just need a little
        offline storage. In fact, I found it very easy to create a{' '}
        <Link href="https://github.com/eglove/fetch" isExternal>
          client-side fetcher
        </Link>{' '}
        that makes use of the Cache API and Indexed DB for cache invalidation in
        about 100 lines of code. But I wouldn&apos;t use this strategy in most
        production apps. I would still recommend TanStack Query in the simplest
        apps just for the ergonomics. Once you go beyond the complexity of a
        website and start building apps, you&apos;re likely going to need
        tooling that can match that complexity anyway.
      </Paragraph>
    </>
  );
}
