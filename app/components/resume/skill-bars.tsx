import type { JSX } from 'react';

import { getExperience } from './positions/positions';
import { skill } from './skills';

const yearFormatter = Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
  style: 'unit',
  unit: 'year',
});

export function SkillBars(): JSX.Element {
  const experience = getExperience();

  return (
    <div className="grid grid-cols-3 gap-4 border-2 p-2">
      {[...experience].map(item => {
        return (
          <div className="grid items-center gap-2" key={item.skill}>
            <div className="flex justify-between">
              <div>{skill[item.skill as keyof typeof skill]}</div>
              <div>{yearFormatter.format(item.experience)}</div>
            </div>
            <div className="w-full rounded bg-gray-300" key={item.skill}>
              <div
                className="h-2 rounded bg-blue-500"
                style={{
                  width: `${
                    (item.experience / experience[0].experience) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
