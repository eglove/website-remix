import { sanityClient } from '../clients/sanity';

export type Course = {
  _id: string;
  authors: Author[];
  links: string[];
  publisher: Publisher;
  title: string;
};

export type Author = {
  name: string;
};

export type Publisher = {
  name: string;
};

export function getRecommendedCourses(): Promise<Course[]> {
  const where = '*[_type == "course" && isRecommended == true]';
  const order = 'order(orderRank asc)';
  const select = `{
    _id,
    title, 
    authors[]->{name},
    publisher->{name},
    links
  }`;

  const query = `${where}${select} | ${order}`;

  return sanityClient.fetch(query);
}
