import { isEmpty } from '@ethang/toolbelt/is/empty.js';
import { isNil } from '@ethang/toolbelt/is/nil.js';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import type { JSX, ReactNode } from 'react';
import type { ReadonlyDeep } from 'type-fest';

import type { skillMap } from './skills';
import { dateFormatter, formatTech } from './tech-format';

type ContractPositionProperties = ReadonlyDeep<{
  readonly children: ReactNode;
  readonly endDate?: string;
  readonly methodologiesUsed: (keyof typeof skillMap)[];
  readonly startDate?: string;
  readonly techUsed: (keyof typeof skillMap)[];
  readonly title: string;
}>;

export function ExperienceCard({
  children,
  endDate,
  title,
  methodologiesUsed,
  startDate,
  techUsed,
}: ContractPositionProperties): JSX.Element {
  return (
    <Card className="mb-2 mt-6 border-2" shadow="none">
      <CardHeader className="flex items-center justify-between">
        <span className="text-medium font-bold">{title}</span>

        {!isNil(startDate) && isNil(endDate) && (
          <span>{dateFormatter.format(new Date(startDate))} - (Current)</span>
        )}

        {!isNil(startDate) && !isNil(endDate) && (
          <span>
            {dateFormatter.format(new Date(startDate))} -{' '}
            {dateFormatter.format(new Date(endDate))}
          </span>
        )}
      </CardHeader>

      <CardBody>
        <ul className="list-inside list-disc">
          {children}

          {!isEmpty(techUsed) && (
            <li>
              <span className="font-bold">Tech Used:</span>{' '}
              {formatTech(techUsed)}
            </li>
          )}

          {!isEmpty(methodologiesUsed) && (
            <li>
              <span className="font-bold">Methodologies Used:</span>{' '}
              {formatTech(methodologiesUsed)}
            </li>
          )}
        </ul>
      </CardBody>
    </Card>
  );
}
