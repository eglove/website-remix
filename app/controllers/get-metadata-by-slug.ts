import { sanityClient } from '../clients/sanity';

export type GetMetadataBySlug = {
  _id: string;
  authors: Array<{ name: string }>;
  description: string;
  featuredImage: {
    description: string;
    image: {
      asset: {
        metadata: {
          dimensions: {
            height: number;
            width: number;
          };
        };
        url: string;
      };
    };
  };
  slug: {
    current: string;
  };
  title: string;
  updatedAt: string;
};

export async function getMetadataBySlug(
  slug: string,
): Promise<GetMetadataBySlug> {
  const where = `*[_type == "metadata" && slug.current == "${slug}"]`;
  const select = `{_id, title, slug, updatedAt, description,
  authors[]->{
    name
  },
  featuredImage->{
    description,
    image{
      asset->{
        url,
        metadata
      }
    }
  }}`;

  const query = `${where}${select}`;

  const data = await sanityClient.fetch<GetMetadataBySlug[]>(query);
  return data[0];
}
