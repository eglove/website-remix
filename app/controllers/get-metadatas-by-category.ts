import { sanityClient } from '../clients/sanity';
import type { Category } from './types';

export type Metadata = {
  _id: string;
  featuredImage: {
    description: string;
    image: {
      asset: {
        url: string;
      };
    };
  };
  slug: { current: string };
  tags: string[];
  title: string;
  updatedAt: string;
};

export type MetaDataReturn = {
  count: number;
  metadata: Metadata[];
};

export const METADATA_PAGE_LENGTH = 3;

export async function getMetadatasByCategory(
  category: Category,
  page = 1,
): Promise<MetaDataReturn> {
  const start = (page - 1) * METADATA_PAGE_LENGTH;
  const end = start + METADATA_PAGE_LENGTH - 1;

  const where = `*[_type == "metadata" && "${category}" in tags[]]`;
  const count = `count(${where})`;
  const select = `{_id, title, updatedAt, tags, slug, featuredImage->{
    description,
    image{
      asset->{
        url
      }
    }
  }}`;
  const order = 'order(updatedAt desc)';
  const paginate = `[${start}..${end}]`;

  const query = `{
    "metadata": ${where}${select} | ${order}${paginate},
    "count": ${count},
  }`;

  return sanityClient.fetch(query);
}
