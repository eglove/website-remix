import { Card, CardBody } from '@nextui-org/card';
import type { PropsWithChildren } from 'react';
import type { ReadonlyDeep } from 'type-fest';

import { Navigation } from '../navigation';

export function MainCard({ children }: ReadonlyDeep<PropsWithChildren>) {
  return (
    <>
      <Navigation />
      <Card className="mx-auto my-4 max-w-5xl">
        <CardBody>{children}</CardBody>
      </Card>
    </>
  );
}
