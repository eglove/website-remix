import { useForm } from '@ethang/use-form/index.js';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { Select, SelectItem } from '@nextui-org/select';
import { Snippet } from '@nextui-org/snippet';
import { DateTime } from 'luxon';
import type { ChangeEventHandler, JSX } from 'react';
import { useState } from 'react';
import { undefined, z } from 'zod';

import styles from '../../../assets/css/snippet.module.css';
import { Heading } from '../../elements/heading';
import { locales } from './locales';

const dateStyles = ['', 'full', 'long', 'medium', 'short'];
const numberDigits = ['', 'numeric', '2-digit'];
const lengths = ['', 'narrow', 'short', 'long'];
const fits = ['', 'basic', 'best fit'];
const fits2 = ['', 'lookup', 'best fit'];
const fractionalSecondDigits = ['', '1', '2', '3'];
const booleans = ['', 'true', 'false'];
const hourCycles = ['', 'h11', 'h12', 'h23', 'h24'];
const monthOptions = ['', 'numeric', '2-digit', 'long', 'short', 'narrow'];
const timeZoneNames = [
  '',
  'long',
  'short',
  'shortOffset',
  'longOffset',
  'shortGeneric',
  'longGeneric',
];

const localeDateStringSchema = z.object({
  calendar: z.string().optional(),
  date: z.string().default(DateTime.now().toFormat("yyyy-MM-dd'T'HH:mm")),
  dateStyle: z.enum(['', 'full', 'long', 'medium', 'short']).optional(),
  day: z.string().optional(),
  dayPeriod: z.string().optional(),
  era: z.string().optional(),
  formatMatcher: z.string().optional(),
  fractionalSecondDigits: z.string().optional(),
  hour: z.string().optional(),
  hour12: z.string().optional(),
  hourCycle: z.string().optional(),
  // @ts-expect-error Accept string
  locale: z.enum(locales).default('en-US'),
  localeMatcher: z.string().optional(),
  minute: z.string().optional(),
  month: z.string().optional(),
  numberingSystem: z.string().optional(),
  second: z.string().optional(),
  timeStyle: z.string().optional(),
  timeZone: z.string().default('America/Chicago'),
  timeZoneName: z.string().optional(),
  weekday: z.string().optional(),
  year: z.string().optional(),
});

export function LocaleDateStringForm(): JSX.Element {
  const [isShowingAll, setIsShowingAll] = useState(false);

  const {
    formState,
    handleChange: untypedHandleChange,
    resetForm,
  } = useForm(localeDateStringSchema.parse({}), {
    zodValidator: localeDateStringSchema,
  });

  const handleChange =
    untypedHandleChange as unknown as ChangeEventHandler<HTMLSelectElement>;

  for (const key of Object.keys(formState)) {
    // @ts-expect-error allow this
    if (formState[key] === '' || typeof formState[key] === 'function') {
      // @ts-expect-error allow this

      formState[key] = undefined;
    }
  }

  let formattedDate = '';
  try {
    // @ts-expect-error assumes a correct type
    formattedDate = new Date(formState.date).toLocaleString(formState.locale, {
      ...localeDateStringSchema.parse(formState),
    });
  } catch {
    // Do nothing
  }

  const filteredFormState = {
    ...formState,
    date: undefined,
    locale: undefined,
  };

  const optionsString = JSON.stringify(filteredFormState, null, ' ');
  const dateString = `new Date('${new Date(
    formState.date,
  ).toISOString()}').toLocaleString('${formState.locale}',
        ${JSON.stringify(filteredFormState, null, ' ')} 
       )`;

  return (
    <>
      <Button
        className="my-2"
        type="button"
        onClick={(): void => {
          setIsShowingAll(isShowingAll_ => {
            resetForm();
            return !isShowingAll_;
          });
        }}
      >
        Show {isShowingAll ? 'fewer options' : 'all options'}
      </Button>

      <form>
        <fieldset className="grid gap-4 md:grid-cols-3">
          {isShowingAll ? (
            <Select
              label="Calendar"
              name="calendar"
              value={formState.calendar}
              onChange={handleChange}
            >
              {[...Intl.supportedValuesOf('calendar')].map(item => {
                return (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </Select>
          ) : null}

          <Input
            label="Date"
            name="date"
            type="datetime-local"
            value={formState.date}
            variant="underlined"
            onChange={
              handleChange as unknown as ChangeEventHandler<HTMLInputElement>
            }
          />

          <Select
            label="Date Style"
            name="dateStyle"
            value={formState.dateStyle}
            onChange={handleChange}
          >
            {dateStyles.map(style => {
              return (
                <SelectItem key={style} value={style}>
                  {style}
                </SelectItem>
              );
            })}
          </Select>

          {isShowingAll ? (
            <Select
              label="Day"
              name="day"
              value={formState.day}
              onChange={handleChange}
            >
              {numberDigits.map(item => {
                return (
                  <SelectItem key={item} textValue={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </Select>
          ) : null}

          {isShowingAll ? (
            <Select
              label="Day Period"
              name="dayPeriod"
              value={formState.dayPeriod}
              onChange={handleChange}
            >
              {lengths.map(item => {
                return (
                  <SelectItem key={item} textValue={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </Select>
          ) : null}

          {isShowingAll ? (
            <Select
              label="Era"
              name="era"
              value={formState.era}
              onChange={handleChange}
            >
              {lengths.map(item => {
                return (
                  <SelectItem key={item} textValue={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </Select>
          ) : null}

          {isShowingAll ? (
            <Select
              label="Format Matcher"
              name="formatMatcher"
              value={formState.formatMatcher}
              onChange={handleChange}
            >
              {fits.map(item => {
                return (
                  <SelectItem key={item} textValue={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </Select>
          ) : null}

          {isShowingAll ? (
            <Select
              label="Fractional Second Digits"
              name="fractionalSecondDigits"
              value={formState.fractionalSecondDigits}
              onChange={handleChange}
            >
              {fractionalSecondDigits.map(item => {
                return (
                  <SelectItem key={item} textValue={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </Select>
          ) : null}

          {isShowingAll ? (
            <Select
              label="Hour"
              name="hour"
              value={formState.hour}
              onChange={handleChange}
            >
              {numberDigits.map(item => {
                return (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </Select>
          ) : null}

          {isShowingAll ? (
            <Select
              label="Hour12"
              name="hour12"
              value={formState.hour12}
              onChange={handleChange}
            >
              {booleans.map(item => {
                return (
                  <SelectItem key={item} textValue={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </Select>
          ) : null}

          {isShowingAll ? (
            <Select
              label="Hour Cycle"
              name="hourCycle"
              value={formState.hourCycle}
              onChange={handleChange}
            >
              {hourCycles.map(item => {
                return (
                  <SelectItem key={item} textValue={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </Select>
          ) : null}

          <Select
            label="Locale"
            name="locale"
            value={formState.locale}
            onChange={handleChange}
          >
            {locales.map(item => {
              return (
                <SelectItem key={item} textValue={item} value={item}>
                  {item}
                </SelectItem>
              );
            })}
          </Select>

          {isShowingAll ? (
            <Select
              label="Locale Matcher"
              name="localeMatcher"
              value={formState.localeMatcher}
              onChange={handleChange}
            >
              {fits2.map(item => {
                return (
                  <SelectItem key={item} textValue={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </Select>
          ) : null}

          {isShowingAll ? (
            <Select
              label="Minute"
              name="minute"
              value={formState.minute}
              onChange={handleChange}
            >
              {numberDigits.map(item => {
                return (
                  <SelectItem key={item} textValue={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </Select>
          ) : null}

          {isShowingAll ? (
            <Select
              label="Month"
              name="month"
              value={formState.month}
              onChange={handleChange}
            >
              {monthOptions.map(item => {
                return (
                  <SelectItem key={item} textValue={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </Select>
          ) : null}

          {isShowingAll ? (
            <Select
              label="Numbering System"
              name="numberingSystem"
              value={formState.numberingSystem}
              onChange={handleChange}
            >
              {[...Intl.supportedValuesOf('numberingSystem')].map(item => {
                return (
                  <SelectItem key={item} textValue={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </Select>
          ) : null}

          {isShowingAll ? (
            <Select
              label="Second"
              name="second"
              value={formState.second}
              onChange={handleChange}
            >
              {numberDigits.map(item => {
                return (
                  <SelectItem key={item} textValue={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </Select>
          ) : null}

          <Select
            label="Time Style"
            name="timeStyle"
            value={formState.timeStyle}
            onChange={handleChange}
          >
            {dateStyles.map(item => {
              return (
                <SelectItem key={item} textValue={item} value={item}>
                  {item}
                </SelectItem>
              );
            })}
          </Select>

          <Select
            label="TimeZone"
            name="timeZone"
            value={formState.timeZone}
            onChange={handleChange}
          >
            {Intl.supportedValuesOf('timeZone').map(item => {
              return (
                <SelectItem key={item} textValue={item} value={item}>
                  {item}
                </SelectItem>
              );
            })}
          </Select>

          {isShowingAll ? (
            <Select
              label="TimeZone Name"
              name="timeZoneName"
              value={formState.timeZoneName}
              onChange={handleChange}
            >
              {timeZoneNames.map(item => {
                return (
                  <SelectItem key={item} textValue={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </Select>
          ) : null}

          {isShowingAll ? (
            <Select
              label="Weekday"
              name="weekday"
              value={formState.weekday}
              onChange={handleChange}
            >
              {lengths.map(item => {
                return (
                  <SelectItem key={item} textValue={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </Select>
          ) : null}

          {isShowingAll ? (
            <Select
              label="Year"
              name="year"
              value={formState.year}
              onChange={handleChange}
            >
              {numberDigits.map(item => {
                return (
                  <SelectItem key={item} textValue={item} value={item}>
                    {item}
                  </SelectItem>
                );
              })}
            </Select>
          ) : null}
        </fieldset>
      </form>

      <Heading variant="h3">Shows As</Heading>

      <Snippet className={styles.Snippet} variant="bordered">
        {formattedDate}
      </Snippet>

      <Heading variant="h3">Options</Heading>

      <Snippet className={styles.Snippet} variant="bordered">
        {optionsString}
      </Snippet>

      <Heading variant="h3">new Date()</Heading>

      <Snippet className={styles.Snippet} variant="bordered">
        {dateString}
      </Snippet>
    </>
  );
}
