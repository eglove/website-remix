import type { JSX } from 'react';

import { RequestCacheForm } from '../components/blog/cache-control-generator/request-cache-form';
import { ResponseCacheForm } from '../components/blog/cache-control-generator/response-cache-form';
import { A } from '../components/elements/a';
import { Heading } from '../components/elements/heading';

export default function (): JSX.Element {
  return (
    <>
      <A
        isExternal
        href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control"
        underline="always"
      >
        <Heading variant="h2">Cache-Control Docs</Heading>
      </A>
      <Heading variant="h3">Request Cache-Control</Heading>
      <RequestCacheForm />
      <Heading variant="h3">Response Cache-Control</Heading>
      <ResponseCacheForm />
    </>
  );
}
