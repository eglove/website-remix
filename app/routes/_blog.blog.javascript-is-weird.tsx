// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck ignore number types
/* eslint-disable unicorn/prefer-number-properties */
import { isBigIntOrNumber } from '@ethang/toolbelt/is/big-int-or-number.js';
import { useForm } from '@ethang/use-form';
import { Input } from '@nextui-org/input';

import { CodeWrapper } from '../components/elements/code-wrapper';
import { Heading } from '../components/elements/heading';
import { Paragraph } from '../components/elements/paragraph';

export default function () {
  const { formState, handleChange } = useForm({
    epsilon: '1e-10',
    expectedSum: '0.3',
    value1: '0.1',
    value2: '0.2',
  });

  const isEqual =
    Number(formState.value1) + Number(formState.value2) ===
    Number(formState.expectedSum);
  const isEpsilonEqual =
    Math.abs(
      Number(formState.expectedSum) -
        (Number(formState.value1) + Number(formState.value2)),
    ) < Number(formState.epsilon);

  return (
    <div>
      <Paragraph>
        JavaScript can be strange. Like any programming language. Here are some
        things to help with that.
      </Paragraph>

      <Heading variant="h2">Checking if numbers can be coerced</Heading>

      <Paragraph>
        isNan(n) returns true if n is NaN or is a value that cannot be coerced
        into a number. (Note that Number(null) === 0).
      </Paragraph>

      <CodeWrapper>
        {[
          `isNaN(0/0) // ${String(isNaN(0 / 0))}`,
          `isNaN("not a number") // ${String(isNaN('not a number'))}`,
          `isNaN(undefined) // ${String(isNaN())}`,
          `isNaN(null) // ${String(isNaN(null))}`,
          `isNaN("2") // ${String(isNaN('2'))}`,
          `isNaN(2) // ${String(isNaN(2))}`,
        ]}
      </CodeWrapper>

      <Paragraph>Number.isNaN(n) returns true only if n is NaN.</Paragraph>

      <CodeWrapper>
        {[
          `Number.isNaN(0/0) // ${String(Number.isNaN(0 / 0))}`,
          `Number.isNaN("not a number") // ${String(Number.isNaN('not a number'))}`,
          `Number.isNaN(undefined) // ${String(Number.isNaN())}`,
          `Number.isNaN(null) // ${String(Number.isNaN(null))}`,
          `Number.isNaN("2") // ${String(Number.isNaN('2'))}`,
          `Number.isNaN(2) // ${String(Number.isNaN(2))}`,
        ]}
      </CodeWrapper>

      <Paragraph>The solution:</Paragraph>

      <CodeWrapper>
        {[
          'export function isNumber(value: unknown): boolean {',
          "  if (typeof value === 'number' && !Number.isNaN(value)) {",
          '    return true;',
          '  }',
          '',
          "  if (typeof value === 'string') {",
          '    return /^-?\\d+$/.test(value);',
          '  }',
          '',
          '  return false;',
          '}',
        ]}
      </CodeWrapper>

      <CodeWrapper>
        {[
          `isNumber(0/0) // ${String(isBigIntOrNumber(0 / 0))}`,
          `isNumber("not a number") // ${String(isBigIntOrNumber('not a number'))}`,
          `isNumber(undefined) // ${String(isBigIntOrNumber())}`,
          `isNumber(null) // ${String(isBigIntOrNumber(null))}`,
          `isNumber("2") // ${String(isBigIntOrNumber('2'))}`,
          `isNumber(2) // ${String(isBigIntOrNumber(2))}`,
        ]}
      </CodeWrapper>

      <Heading variant="h2">Float Imprecision</Heading>

      <CodeWrapper>
        {[
          'function areFloatsEqual(x, y, epsilon = 1e-10) {',
          '  return Math.abs(x - y) < epsilon',
          '}',
        ]}
      </CodeWrapper>

      <CodeWrapper>
        {[
          '0.1 + 0.2 === 0.3 // false',
          'areFloatsEqual(0.3, 0.1 + 0.2); // true',
        ]}
      </CodeWrapper>

      <Heading variant="h3">Try It Out:</Heading>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Value 1"
          name="value1"
          type="number"
          value={formState.value1}
          onChange={handleChange}
        />

        <Input
          label="Value 2"
          name="value2"
          type="number"
          value={formState.value2}
          onChange={handleChange}
        />

        <Input
          label="Epsilon"
          name="epsilon"
          value={formState.epsilon}
          onChange={handleChange}
        />

        <Input
          label="Expected Sum"
          name="expectedSum"
          type="number"
          value={formState.expectedSum}
          onChange={handleChange}
        />
      </div>

      <div className="grid gap-2">
        <CodeWrapper>
          {[
            `${formState.value1} + ${formState.value2} === ${formState.expectedSum} // ${String(isEqual)}`,
          ]}
        </CodeWrapper>

        <CodeWrapper>
          {[
            `areFloatsEqual(${formState.expectedSum}, ${formState.value1} + ${formState.value2}, ${formState.epsilon}) // ${String(isEpsilonEqual)}`,
          ]}
        </CodeWrapper>
      </div>
    </div>
  );
}
