export const TYPICODE_BASE_URL = 'https://jsonplaceholder.typicode.com';

export type Post = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

export const getPostsRequest = () => {
  const url = new URL('posts', TYPICODE_BASE_URL);

  return new Request(url);
};

export const getPosts = async () => {
  const response = await fetch(getPostsRequest());

  return response.json() as Promise<Post[]>;
};
