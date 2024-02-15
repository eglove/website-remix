// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck ignore number types
/* eslint-disable unicorn/prefer-number-properties */
import { useForm } from '@ethang/use-form';
import { isBigIntOrNumber } from '@ethang/util/number.js';
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
          `isNaN(0/0) // ${isNaN(0 / 0)}`,
          `isNaN("not a number") // ${isNaN('not a number')}`,
          `isNaN(undefined) // ${isNaN()}`,
          `isNaN(null) // ${isNaN(null)}`,
          `isNaN("2") // ${isNaN('2')}`,
          `isNaN(2) // ${isNaN(2)}`,
        ]}
      </CodeWrapper>
      <Paragraph>Number.isNaN(n) returns true only if n is NaN.</Paragraph>
      <CodeWrapper>
        {[
          `Number.isNaN(0/0) // ${Number.isNaN(0 / 0)}`,
          `Number.isNaN("not a number") // ${Number.isNaN('not a number')}`,
          `Number.isNaN(undefined) // ${Number.isNaN()}`,
          `Number.isNaN(null) // ${Number.isNaN(null)}`,
          `Number.isNaN("2") // ${Number.isNaN('2')}`,
          `Number.isNaN(2) // ${Number.isNaN(2)}`,
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
          `isNumber(0/0) // ${isBigIntOrNumber(0 / 0)}`,
          `isNumber("not a number") // ${isBigIntOrNumber('not a number')}`,
          `isNumber(undefined) // ${isBigIntOrNumber()}`,
          `isNumber(null) // ${isBigIntOrNumber(null)}`,
          `isNumber("2") // ${isBigIntOrNumber('2')}`,
          `isNumber(2) // ${isBigIntOrNumber(2)}`,
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
          onChange={handleChange}
          type="number"
          value={formState.value1}
        />
        <Input
          label="Value 2"
          name="value2"
          onChange={handleChange}
          type="number"
          value={formState.value2}
        />
        <Input
          label="Epsilon"
          name="epsilon"
          onChange={handleChange}
          value={formState.epsilon}
        />
        <Input
          label="Expected Sum"
          name="expectedSum"
          onChange={handleChange}
          type="number"
          value={formState.expectedSum}
        />
      </div>
      <div className="grid gap-2">
        <CodeWrapper>
          {[
            `${formState.value1} + ${formState.value2} === ${formState.expectedSum} // ${isEqual}`,
          ]}
        </CodeWrapper>
        <CodeWrapper>
          {[
            `areFloatsEqual(${formState.expectedSum}, ${formState.value1} + ${formState.value2}, ${formState.epsilon}) // ${isEpsilonEqual}`,
          ]}
        </CodeWrapper>
      </div>
    </div>
  );
}
