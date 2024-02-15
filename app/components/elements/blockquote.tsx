import { isNil } from '@ethang/util/data.js';
import type { JSX, ReactNode } from 'react';

import { A } from './a';

type BlockquoteProperties = {
  children: ReactNode;
  link?: string;
  source: string;
};

export function Blockquote({
  link,
  children,
  source,
}: Readonly<BlockquoteProperties>): JSX.Element {
  return (
    <blockquote className="my-4 border-l-4 border-gray-500 py-2 pl-4 italic">
      <p className="mb-2">{children}</p>
      <cite className="block text-right font-bold">
        {!isNil(link) && <A href={link} isExternal>{`- ${source}`}</A>}
        {isNil(link) && `- ${source}`}
      </cite>
    </blockquote>
  );
}
