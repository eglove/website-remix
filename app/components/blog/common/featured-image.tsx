import { Image } from '@nextui-org/image';
import type { JSX } from 'react';

type FeaturedImageProperties = {
  readonly description: string;
  readonly imageUrl: string;
};

export function FeaturedImage({
  imageUrl,
  description,
}: FeaturedImageProperties): JSX.Element {
  return (
    <div className="p-2">
      <Image
        alt={description}
        className="object-contain"
        height={72}
        src={imageUrl}
        width={72}
      />
    </div>
  );
}
