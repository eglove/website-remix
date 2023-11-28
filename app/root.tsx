import { isNil } from '@ethang/util/data.js';
import { Card, CardBody } from '@nextui-org/card';
import { NextUIProvider } from '@nextui-org/react';
import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';

import styles from './tailwind.css';

export const links: LinksFunction = () => {
  return [
    ...(isNil(cssBundleHref)
      ? [{ href: styles, rel: 'stylesheet' }]
      : [
          { href: cssBundleHref, rel: 'stylesheet' },
          { href: styles, rel: 'stylesheet' },
        ]),
  ];
};

export default function App() {
  return (
    <html className="bg-sky-950" lang="en-US">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body className="mt-4">
        <NextUIProvider>
          <Card className="mx-auto my-4 max-w-5xl">
            <CardBody>
              <Outlet />
            </CardBody>
          </Card>
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </NextUIProvider>
      </body>
    </html>
  );
}
