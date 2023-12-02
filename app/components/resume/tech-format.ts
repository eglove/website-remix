import { skill } from './skills';

export const unitFormat = new Intl.ListFormat('en-US', {
  type: 'unit',
});

export function formatTech(techs: Array<keyof typeof skill>): string {
  const sorted = [...new Set(techs)]
    .map(tech => {
      return skill[tech];
    })
    .sort((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });

  return unitFormat.format(sorted);
}

export const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
});
