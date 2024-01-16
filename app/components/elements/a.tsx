import type { LinkProps } from '@nextui-org/link';
import { Link } from '@nextui-org/link';
// @ts-expect-error this type exists
import type { RemixLinkProps } from '@remix-run/react';
import { Link as RemixLink } from '@remix-run/react';
import type { JSX, PropsWithChildren } from 'react';

type AProperties = Omit<RemixLinkProps, 'to'> &
  JSX.IntrinsicElements['a'] &
  LinkProps &
  PropsWithChildren;

export function A(properties: AProperties): JSX.Element {
  return (
    <Link
      as={RemixLink}
      prefetch="viewport"
      {...properties}
      href={undefined}
      to={properties.href ?? (properties.to as string)}
    >
      {properties.children}
    </Link>
  );
}
