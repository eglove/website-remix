import type { JSX } from 'react';

type YouTubeProperties = {
  id: string;
  title: string;
};

export function YouTube({
  id,
  title,
}: Readonly<YouTubeProperties>): JSX.Element {
  return (
    // eslint-disable-next-line react/iframe-missing-sandbox
    <iframe
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      className="my-4 aspect-16/9 w-full border-0"
      sandbox="allow-same-origin allow-scripts allow-presentation"
      src={`https://www.youtube-nocookie.com/embed/${id}`}
      title={title}
    />
  );
}
