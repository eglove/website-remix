import type { ImageProps } from '@nextui-org/image';
import { Image } from '@nextui-org/image';
import type { JSX } from 'react';

import { sanityImageBuilder } from '../../clients/sanity';

type SanityImageProperties = ImageProps & {
  height: number;
  src: string;
  width: number;
};

export function SanityImage(properties: SanityImageProperties): JSX.Element {
  const url = sanityImageBuilder
    .image(properties.src)
    .height(properties.height)
    .width(properties.width)
    .format('webp')
    .url();

  const fallback = sanityImageBuilder
    .image(properties.src)
    .height(10)
    .width(10)
    .blur(60)
    .format('webp')
    .url();

  return <Image {...properties} fallbackSrc={fallback} src={url} />;
}
