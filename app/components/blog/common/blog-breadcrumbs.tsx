import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs';
import type { JSX } from 'react';

import { A } from '../../elements/a';

type BlogBreadcrumbsProperties = {
  readonly currentSlug: string;
  readonly title: string;
};

export function BlogBreadcrumbs({
  currentSlug,
  title,
}: BlogBreadcrumbsProperties): JSX.Element {
  return (
    <Breadcrumbs underline="hover">
      <BreadcrumbItem>
        <A className="text-sm" color="foreground" href="/">
          Home
        </A>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <A className="text-sm" color="foreground" href={`/blog/${currentSlug}`}>
          {title}
        </A>
      </BreadcrumbItem>
    </Breadcrumbs>
  );
}
