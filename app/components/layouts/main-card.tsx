import { Card, CardBody } from '@nextui-org/card';
import type { PropsWithChildren } from 'react';

import { Navigation } from '../navigation';

export function MainCard({ children }: Readonly<PropsWithChildren>) {
  return (
    <>
      <Navigation />
      <Card className="mx-auto my-4 max-w-5xl">
        <CardBody>{children}</CardBody>
      </Card>
    </>
  );
}
