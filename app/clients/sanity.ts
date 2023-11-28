import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  apiVersion: '1',
  dataset: 'production',
  projectId: 'drccvtog',
  useCdn: true,
});

export const sanityImageBuilder = imageUrlBuilder(sanityClient);
