import { isNil } from '@ethang/toolbelt/is/nil.js';
import { Card, CardBody } from '@nextui-org/card';
import type { JSX } from 'react';

import { getExperience } from './positions/positions';
import { skillMap } from './skills';

const yearFormatter = Intl.NumberFormat('en-US', {
  maximumFractionDigits: 2,
  style: 'unit',
  unit: 'year',
});

export function SkillBars(): JSX.Element {
  const experience = getExperience();

  return (
    <Card className="border-2" shadow="none">
      <CardBody className="grid grid-cols-3 gap-4 p-2">
        {[...experience].map(item => {
          if (isNil(item.experience) || isNil(experience[0].experience)) {
            return null;
          }

          return (
            <div key={item.skill} className="grid items-center gap-2">
              <div className="flex justify-between">
                <div>{skillMap[item.skill as keyof typeof skillMap]}</div>

                <div>{yearFormatter.format(item.experience)}</div>
              </div>

              <div key={item.skill} className="w-full rounded bg-gray-300">
                <div
                  className="h-2 rounded bg-blue-500"
                  style={{
                    width: `${String(
                      (item.experience / experience[0].experience) * 100,
                    )}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
}
