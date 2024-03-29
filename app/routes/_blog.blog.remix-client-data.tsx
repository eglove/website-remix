import { isNil } from '@ethang/toolbelt/is/nil.js';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import type { ClientLoaderFunctionArgs } from '@remix-run/react';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { useCallback } from 'react';
import { twMerge } from 'tailwind-merge';
import type { ReadonlyDeep } from 'type-fest';

import { Blockquote } from '../components/elements/blockquote';
import { CodeWrapper } from '../components/elements/code-wrapper';
import { Paragraph } from '../components/elements/paragraph';
import { getPosts, getPostsRequest } from '../data/typicode';

let isRetrievingFromServer = false;
let isRetrievingFromCache = false;

export async function loader() {
  isRetrievingFromServer = true;
  return getPosts();
}

export async function clientLoader({
  serverLoader,
}: ReadonlyDeep<ClientLoaderFunctionArgs>) {
  isRetrievingFromCache = true;
  const request = getPostsRequest();

  const cache = await caches.open('ethang');
  const cachedRequest = await cache.match(request);

  if (isNil(cachedRequest)) {
    await cache.add(request);
    isRetrievingFromCache = false;
    return serverLoader();
  }

  isRetrievingFromCache = false;
  return cachedRequest;
}

clientLoader.hyrdate = true;

export default function () {
  useLoaderData<typeof clientLoader>();
  const navigate = useNavigate();

  const navigateWithScroll = useCallback(() => {
    navigate('/blog/remix-client-data', {
      preventScrollReset: true,
    });
  }, [navigate]);

  const reload = useCallback(() => {
    location.reload();
  }, []);

  return (
    <div>
      <Paragraph>
        I&apos;ve always been a little annoyed that browser state is treated as
        a second class citizen in JS frameworks. In order to use powerful
        browser tools like{' '}
        <Link
          isExternal
          href="https://developer.mozilla.org/en-US/docs/Web/API/Cache"
        >
          Cache API
        </Link>{' '}
        and{' '}
        <Link
          isExternal
          href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API"
        >
          IndexedDB
        </Link>{' '}
        in React you need escape hatch APIs like useEffect.
      </Paragraph>

      <Paragraph>
        That&apos;s why I was very happy to see Remix working on what
        they&apos;re calling &ldquo;Client Data&rdquo;.
      </Paragraph>

      <Blockquote
        link="https://github.com/remix-run/remix/discussions/7634"
        source="Client Data RFC"
      >
        Client loaders are just like React Router loaders receiving the request
        and params for the next location. They also have a loader function that
        they can call to get the data from the server. This enables a client
        loader to be able to return data from the server, the client, or both.
      </Blockquote>

      <Paragraph>
        So let&apos;s give this a shot. First we can create a basic API call.
        There&apos;s many advantages to separating Request creation from
        actually calling the API. First, if you want to ignore the default fetch
        function and customize Request headers, or if you have no need from
        response.json(), it&apos;s very easy to opt out of the default call.
        Second, we can use Cache API.
      </Paragraph>

      <CodeWrapper>
        {[
          "export const TYPICODE_BASE_URL = 'https://jsonplaceholder.typicode.com';",
          '',
          'export type Post = {',
          '  body: string;',
          '  id: number;',
          '  title: string;',
          '  userId: number;',
          '};',
          '',
          'export const getPostsRequest = () => {',
          "  const url = new URL('posts', TYPICODE_BASE_URL);",
          '',
          '  return new Request(url);',
          '};',
          '',
          'export const getPosts = async () => {',
          '  const response = await fetch(getPostsRequest());',
          '',
          '  return response.json() as Promise<Post[]>;',
          '};',
        ]}
      </CodeWrapper>

      <Paragraph>
        Then we can fetch this data server side with the usual Remix loader.
      </Paragraph>

      <CodeWrapper>
        {['export async function loader() {', '  return getPosts();', '}']}
      </CodeWrapper>

      <Paragraph>Finally, we can use the client loader.</Paragraph>

      <CodeWrapper>
        {[
          'export async function clientLoader({ serverLoader }: ClientLoaderFunctionArgs) {',
          '  const request = getPostsRequest();',
          '',
          "  const cache = await caches.open('ethang');",
          '  const cachedRequest = await cache.match(request);',
          '',
          '  if (isNil(cachedRequest)) {',
          '    await cache.add(request);',
          '    return serverLoader();',
          '  }',
          '',
          '  return cachedRequest;',
          '}',
        ]}
      </CodeWrapper>

      <Paragraph>
        Regardless of which the data comes from, they&apos;re both available on
        useLoaderData.
      </Paragraph>

      <CodeWrapper>
        {['const { data, success } = useLoaderData<typeof loader>();']}
      </CodeWrapper>

      <Paragraph>
        In this scenario, on the initial load the server loader will be called
        to get initial data. On subsequent calls, the server loader is not
        called, and instead only client loader is called. It checks if the data
        is in cache. If it is, it simply returns cached data. If it&apos;s not,
        it will make a call to the server loader.
      </Paragraph>

      <Paragraph>
        And because this blog is written in Remix you can try these fun buttons
        to get an idea for how this works. (Don&apos;t forget to try deleting
        data from Cache API).
      </Paragraph>

      <div className="mb-4 flex gap-2">
        <Button
          className="rounded-none"
          color="primary"
          onPress={navigateWithScroll}
        >
          Client Navigate
        </Button>

        <Button className="rounded-none" color="secondary" onPress={reload}>
          Hard Reload
        </Button>
      </div>

      <div className="flex gap-2">
        <div
          className={twMerge(
            'text-white p-2',
            isRetrievingFromServer ? 'bg-green-500' : 'bg-red-500',
          )}
        >
          Getting data from API
        </div>

        <div
          className={twMerge(
            'text-white p-2',
            isRetrievingFromCache ? 'bg-green-500' : 'bg-red-500',
          )}
        >
          Getting data from Cache
        </div>
      </div>

      <Paragraph>
        The question is now, why? Why not just depend on the built in caching of
        Remix? I think this opens up a lot of possibilities, there&apos;s a lot
        to play with here. We can now use browser state such as local storage,
        Cache API, and IndexedDB within the same paradigm. Keeping control over
        how we handle our data, and use browser API&apos;s to do it.
      </Paragraph>
    </div>
  );
}
