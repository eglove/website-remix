import type { JSX } from 'react';

type ItemDescriptionProperties = {
  readonly children: string;
};

export function ItemDescription({
  children,
}: ItemDescriptionProperties): JSX.Element {
  return (
    <div className="max-w-xs text-tiny text-foreground-400">{children}</div>
  );
}
