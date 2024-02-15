import type { ImageProps } from '@nextui-org/image';
import { Image } from '@nextui-org/image';
import type { JSX } from 'react';
import type { ReadonlyDeep } from 'type-fest';

import { sanityImageBuilder } from '../../clients/sanity';

type SanityImageProperties = ReadonlyDeep<
  ImageProps & {
    height: number;
    src: string;
    width: number;
  }
>;

// eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
export function SanityImage(properties: SanityImageProperties): JSX.Element {
  const { src, height, width } = properties;

  const url = sanityImageBuilder
    .image(src)
    .height(height)
    .width(width)
    .format('webp')
    .url();

  return <Image {...(properties as ImageProps)} src={url} />;
}
