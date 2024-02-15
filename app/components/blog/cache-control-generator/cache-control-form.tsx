import { Checkbox } from '@nextui-org/checkbox';
import { Input } from '@nextui-org/input';
import { Snippet } from '@nextui-org/snippet';
import type { ChangeEvent, JSX } from 'react';
import { twMerge } from 'tailwind-merge';

import styles from '../../../assets/css/snippet.module.css';
import { ItemDescription } from './item-description';
import { inputGrid } from './util';

export type InputList<T> = {
  description: string;
  key: keyof T;
}[];

type CacheControlFormProperties<T extends Record<string, string | boolean>> = {
  readonly checkBoxes: InputList<T>;
  readonly formState: T;
  readonly handleChange: (event: ChangeEvent) => void;
  readonly inputs: InputList<T>;
};

const formatter = new Intl.ListFormat('en-US', {
  type: 'unit',
});

export function CacheControlForm<T extends Record<string, string | boolean>>({
  checkBoxes,
  formState,
  handleChange,
  inputs,
}: CacheControlFormProperties<T>): JSX.Element {
  let headerArray: string[] = [];

  for (const [key, value] of Object.entries(formState)) {
    if (typeof value === 'boolean' && value) {
      headerArray = [...headerArray, key];
    } else if (
      typeof value !== 'boolean' &&
      !Number.isNaN(value) &&
      value !== ''
    ) {
      headerArray = [...headerArray, `${key}=${value}`];
    }
  }

  let headerString = `  'Cache-Control': '`;

  if (headerArray.length > 0) {
    headerString += formatter.format(headerArray);
  }

  return (
    <>
      <div className={inputGrid}>
        {checkBoxes.map(checkBox => {
          return (
            <div key={checkBox.key as string}>
              <Checkbox
                isSelected={formState[checkBox.key] as boolean}
                name={checkBox.key as string}
                onChange={handleChange}
              >
                {checkBox.key as string}
              </Checkbox>
              <ItemDescription>{checkBox.description}</ItemDescription>
            </div>
          );
        })}
      </div>
      <div className={inputGrid}>
        {inputs.map(input => {
          return (
            <Input
              description={input.description}
              key={input.key as string}
              label={input.key as string}
              name={input.key as string}
              type="number"
              value={formState[input.key] as string}
              onChange={handleChange}
            />
          );
        })}
      </div>
      <Snippet className={twMerge('w-max', styles.Snippet)}>
        <span>{`new Headers({`}</span>
        <span>{`${headerString}'`}</span>
        <span>{`})`}</span>
      </Snippet>
    </>
  );
}
