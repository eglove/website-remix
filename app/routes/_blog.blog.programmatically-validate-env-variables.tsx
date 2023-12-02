// eslint-disable-next-line unicorn/prevent-abbreviations
import { CodeWrapper } from '../components/elements/code-wrapper';

export default function () {
  return (
    <CodeWrapper styles={{ maxHeight: undefined }}>
      {[
        'const envVariables = process.env;',
        '           ',
        'export const envCheck = () => {',
        '  const defaultVariables = {',
        '    API_TOKEN: undefined,',
        "    API_ROOT: 'https://example.com',",
        '    DATABASE_URL: undefined,',
        '  };',
        '           ',
        '  const envVariableKeys = Object.keys(envVariables);',
        '  const defaultVariableKeys = Object.keys(defaultVariables);',
        '  const missingKeys = [];',
        '',
        '  for (const key of defaultVariableKeys) {',
        '    if (!envVariableKeys.includes(key) || envVariables[key] === undefined) {',
        '      missingKeys.push(key);',
        '    }',
        '  }',
        '           ',
        '  if (missingKeys.length > 0) {',
        '    throw new Error(',
        '      `Missing the following env variables, add them to .env: ${missingKeys.join(',
        "      ', '",
        '    )}`',
        '  );',
        '}',
      ]}
    </CodeWrapper>
  );
}
