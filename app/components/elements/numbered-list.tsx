import type { JSX, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import { v4 } from 'uuid';

type NumberedListProperties = {
  items: ReactNode[];
  liClassname?: string;
};

export function NumberedList({
  items,
  liClassname,
}: Readonly<NumberedListProperties>): JSX.Element {
  const itemsWithKey = items.map(item => {
    return {
      id: v4(),
      item,
    };
  });

  return (
    <ul className="list-inside list-decimal">
      {itemsWithKey.map(item => {
        return (
          <li key={item.id} className={twMerge('mb-2', liClassname)}>
            {item.item}
          </li>
        );
      })}
    </ul>
  );
}
