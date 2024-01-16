import type { CSSProperties, JSX } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-expect-error fix remix bundling errors
import { okaidia as theme } from 'react-syntax-highlighter/dist/cjs/styles/prism/index.js';

import { codeString } from '../../util';

type CodeProperties = {
  readonly children: string[];
  readonly language?: string;
  readonly styles?: CSSProperties;
};

export function CodeWrapper({
  children,
  language = 'typescript',
  styles = { maxHeight: 500 },
}: CodeProperties): JSX.Element {
  return (
    <SyntaxHighlighter
      showLineNumbers
      customStyle={styles}
      language={language}
      style={theme as Record<string, CSSProperties>}
    >
      {codeString(children)}
    </SyntaxHighlighter>
  );
}
