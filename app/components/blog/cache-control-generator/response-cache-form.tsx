import { useForm } from '@ethang/use-form/index.js';
import type { JSX } from 'react';

import type { InputList } from './cache-control-form';
import { CacheControlForm } from './cache-control-form';

export function ResponseCacheForm(): JSX.Element {
  const { formState, handleChange } = useForm({
    immutable: false,
    'max-age': '',
    'must-revalidate': false,
    'must-understand': false,
    'no-cache': false,
    'no-store': false,
    'no-transform': false,
    private: false,
    'proxy-revalidate': false,
    public: false,
    's-max-age': '',
    'stale-if-error': '',
    'stale-while-revalidate': '',
  });

  const checkBoxes: InputList<typeof formState> = [
    {
      description:
        "Server asks client not to use a cached response without validating that the data hasn't changed on the origin server.",
      key: 'no-cache',
    },
    {
      description:
        'Server asks all recipients (including cache servers and browsers) not to store a copy of the response.',
      key: 'no-store',
    },
    {
      description:
        'Server asks recipients of response not to modify the response such as for image compression, optimizations, etc.',
      key: 'no-transform',
    },
    {
      description:
        'Server tells the client that it may cache the response indefinitely.',
      key: 'immutable',
    },
    {
      description:
        'Server tells the cache that once a response is expired, it must revalidate data with the origin server.',
      key: 'must-revalidate',
    },
    {
      description:
        'Server tells the cache that it should only store the response if it understands or is compatible with the requirements for caching.',
      key: 'must-understand',
    },
    {
      description:
        'Server indicates the the response can only be stored in private caches such a local caches in browsers.',
      key: 'private',
    },
    {
      description:
        'Server indicates that a response may be stored in a shared cache such as a CDN.',
      key: 'public',
    },
    {
      description:
        'Same as must-revalidate, but for shared caches such as CDN.',
      key: 'proxy-revalidate',
    },
  ];

  const inputs: {
    description: string;
    key: keyof typeof formState;
  }[] = [
    {
      description:
        'Server tells the client that a response should be considered stale after x seconds.',
      key: 'max-age',
    },
    {
      description:
        'Same as max-age but only applies to shared caches such as CDN.',
      key: 's-max-age',
    },
    {
      description:
        'Server tells the cache that if a response returns an error, it may return a cached copy for x seconds after it has gone stale.',
      key: 'stale-if-error',
    },
    {
      description:
        'Server indicates that a response may be served from a cache for x seconds after it has expired while it refetches and validates new data.',
      key: 'stale-while-revalidate',
    },
  ];

  return (
    <CacheControlForm
      checkBoxes={checkBoxes}
      formState={formState}
      handleChange={handleChange}
      inputs={inputs}
    />
  );
}
