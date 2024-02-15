import type { LinkProps } from '@nextui-org/link';
import { Link } from '@nextui-org/link';
// @ts-expect-error this type exists
import type { RemixLinkProps } from '@remix-run/react';
import { Link as RemixLink } from '@remix-run/react';
import type { JSX, PropsWithChildren } from 'react';

type AProperties = JSX.IntrinsicElements['a'] &
  LinkProps &
  Omit<RemixLinkProps, 'to'> &
  PropsWithChildren;

export function A(properties: AProperties): JSX.Element {
  const { href, to } = properties;

  return (
    <Link
      as={RemixLink}
      prefetch="viewport"
      {...properties}
      href={undefined}
      to={href ?? (to as string)}
    />
  );
}
