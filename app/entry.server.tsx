/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import { PassThrough } from 'node:stream';

import type { AppLoadContext, EntryContext } from '@remix-run/node';
import { createReadableStreamFromReadable } from '@remix-run/node';
import { RemixServer } from '@remix-run/react';
import { isbot } from 'isbot';
import { renderToPipeableStream } from 'react-dom/server';

const ABORT_DELAY = 5000;

/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
// eslint-disable-next-line max-params,@typescript-eslint/max-params
export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,unused-imports/no-unused-vars
  loadContext: AppLoadContext,
) {
  return request.headers.get('user-agent') !== null &&
    isbot(request.headers.get('user-agent'))
    ? handleBotRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext,
      )
    : handleBrowserRequest(
        request,
        responseStatusCode,
        responseHeaders,
        remixContext,
      );
}

// eslint-disable-next-line @typescript-eslint/max-params
async function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        abortDelay={ABORT_DELAY}
        context={remixContext}
        url={request.url}
      />,
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
        onError(error: unknown) {
          // eslint-disable-next-line no-param-reassign
          responseStatusCode = 500;
          /*
           * Log streaming rendering errors from inside the shell.  Don't log
           * errors encountered during initial shell rendering since they'll
           * reject and get logged in handleDocumentRequest.
           */
          if (shellRendered) {
            // eslint-disable-next-line no-console
            console.error(error);
          }
        },
        onShellError(error: unknown) {
          if (error instanceof Error) {
            reject(error);
          }
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}

// eslint-disable-next-line @typescript-eslint/max-params
async function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer
        abortDelay={ABORT_DELAY}
        context={remixContext}
        url={request.url}
      />,
      {
        onError(error: unknown) {
          // eslint-disable-next-line no-param-reassign
          responseStatusCode = 500;
          /*
           * Log streaming rendering errors from inside the shell.  Don't log
           * errors encountered during initial shell rendering since they'll
           * reject and get logged in handleDocumentRequest.
           */
          if (shellRendered) {
            // eslint-disable-next-line no-console
            console.error(error);
          }
        },
        onShellError(error: unknown) {
          if (error instanceof Error) {
            reject(error);
          }
        },
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set('Content-Type', 'text/html');

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          );

          pipe(body);
        },
      },
    );

    setTimeout(abort, ABORT_DELAY);
  });
}
