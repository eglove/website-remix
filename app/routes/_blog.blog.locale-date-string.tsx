import type { JSX } from 'react';

import { LocaleDateStringForm } from '../components/blog/locale-date-string/locale-date-string-form';
import { A } from '../components/elements/a';
import { Paragraph } from '../components/elements/paragraph';

export default function (): JSX.Element {
  return (
    <>
      <Paragraph>
        <A
          isExternal
          className="rounded-lg bg-blue-600 p-2 text-white"
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat"
        >
          Docs
        </A>
      </Paragraph>

      <LocaleDateStringForm />
    </>
  );
}
