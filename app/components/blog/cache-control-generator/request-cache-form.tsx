import { useForm } from '@ethang/use-form';
import type { JSX } from 'react';

import type { InputList } from './cache-control-form';
import { CacheControlForm } from './cache-control-form';

export function RequestCacheForm(): JSX.Element {
  const { formState, handleChange } = useForm({
    'max-age': '',
    'max-stale': '',
    'min-fresh': '',
    'no-cache': false,
    'no-store': false,
    'no-transform': false,
    'only-if-cached': '',
    'stale-if-error': '',
  });

  const checkBoxes: InputList<typeof formState> = [
    {
      description:
        'Client asks the cache to validate the response against the server before returning a cached response.',
      key: 'no-cache',
    },
    {
      description: 'Client asks the server to not store the response in cache.',
      key: 'no-store',
    },
    {
      description:
        'Client asks the server not to alter the response such as for image compression, optimizations, etc.',
      key: 'no-transform',
    },
    {
      description:
        'Client will only accept a response from cache, otherwise the cache should return 504 (Gateway Timeout)',
      key: 'only-if-cached',
    },
  ];

  const inputs: InputList<typeof formState> = [
    {
      description:
        'Client will accept a response that has been in cache for x seconds.',
      key: 'max-age',
    },
    {
      description:
        'Client is willing to use a cached response that is x seconds stale.',
      key: 'max-stale',
    },
    {
      description:
        'Client wants the response to be fresh x seconds after the time of the request.',
      key: 'min-fresh',
    },
    {
      description:
        'Client is willing to accept a response from cache on error if it is x seconds stale.',
      key: 'stale-if-error',
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
