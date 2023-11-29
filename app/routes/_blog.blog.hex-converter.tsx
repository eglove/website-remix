import { useForm } from '@ethang/use-form/index.js';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Input } from '@nextui-org/input';
import { Snippet } from '@nextui-org/snippet';
import convert from 'color-convert';
import type { JSX } from 'react';
import { z } from 'zod';

import styles from '../assets/css/snippet.module.css';
import { Paragraph } from '../components/elements/paragraph';

const hexConverterSchema = z.object({
  color: z
    .string()
    .regex(/^[\dA-Fa-f]{3,6}$/, 'Invalid Hex Format')
    .transform(color => {
      if (!color.startsWith('#')) {
        return `#${color}`;
      }

      return color;
    })
    .default('#000'),
});

export default function (): JSX.Element {
  const { handleChange, formState, handleSubmit, fieldErrors } = useForm(
    { color: '#000' },
    {
      zodValidator: hexConverterSchema,
    },
  );

  const hsl = convert.hex.hsl(formState.color);
  const hslString = `hsl(${hsl[0]}deg ${hsl[1]}% ${hsl[2]}%)`;

  const rgb = convert.hex.rgb(formState.color);
  const rgbString = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;

  const hwb = convert.hex.hwb(formState.color);
  const hwbString = `hwb(${hwb[0]}deg ${hwb[1]}% ${hwb[2]}%)`;

  const keyword = convert.hex.keyword(formState.color);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <fieldset className="mx-auto my-4 max-w-fit">
          {typeof fieldErrors?.color === 'string' && (
            <Paragraph className="text-red-500">
              {fieldErrors?.color ?? ''}
            </Paragraph>
          )}
          <Input
            label="Hex Color"
            name="color"
            value={formState.color}
            variant="bordered"
            onChange={handleChange}
          />
        </fieldset>
      </form>

      <div className="flex flex-wrap gap-2">
        <Card className="grow border-2" shadow="none">
          <CardHeader className="bg-black text-white">Keyword</CardHeader>
          <CardBody style={{ backgroundColor: keyword }}>
            <Snippet
              className={styles.Snippet}
              color="primary"
              variant="solid"
            >{`color: ${keyword};`}</Snippet>
          </CardBody>
        </Card>
        <Card className="grow border-2" shadow="none">
          <CardHeader className="bg-black text-white">HSL</CardHeader>
          <CardBody style={{ backgroundColor: hslString }}>
            <Snippet
              className={styles.Snippet}
              color="primary"
              variant="solid"
            >{`color: ${hslString};`}</Snippet>
          </CardBody>
        </Card>
        <Card className="grow border-2" shadow="none">
          <CardHeader className="bg-black text-white">RGB</CardHeader>
          <CardBody style={{ backgroundColor: rgbString }}>
            <Snippet
              className={styles.Snippet}
              color="primary"
              variant="solid"
            >{`color: ${rgbString};`}</Snippet>
          </CardBody>
        </Card>
        <Card className="grow border-2" shadow="none">
          <CardHeader className="bg-black text-white">HWB</CardHeader>
          <CardBody style={{ backgroundColor: hwbString }}>
            <Snippet
              className={styles.Snippet}
              color="primary"
              variant="solid"
            >{`color: ${hwbString};`}</Snippet>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
