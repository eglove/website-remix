import { isNil } from '@ethang/util/data.js';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { json, type MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { A } from '../components/elements/a';
import { Heading } from '../components/elements/heading';
import type { Course } from '../controllers/get-recommended-courses';
import { getRecommendedCourses } from '../controllers/get-recommended-courses';
import { CONTENT_CACHE_CONTROL } from '../util';

const authorFormat = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});

export const meta: MetaFunction = () => {
  const description = 'Recommended cousres for learning web development';
  const title = 'EthanG | Courses';

  return [
    { title },
    { content: description, name: 'description' },
    { content: description, name: 'og:description' },
    { content: title, name: 'og:title' },
    { content: 'EthanG', name: 'og:site_name' },
    { content: 'article', name: 'og:type' },
    { name: 'twitter:card', value: 'summary' },
    { name: 'twitter:title', value: title },
    { name: 'twitter:description', value: description },
  ];
};

export async function loader() {
  const courses = await getRecommendedCourses();

  return json(courses, {
    headers: CONTENT_CACHE_CONTROL,
  });
}

export default function () {
  const courses = useLoaderData<typeof loader>();

  if (isNil(courses)) {
    return null;
  }

  return (
    <>
      <Card className="my-4">
        <CardHeader>
          <Heading variant="h1">Learn Web Dev</Heading>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-ram-300 gap-4">
        {courses.map((course: Course, index: number) => {
          return (
            <Card key={course._id}>
              <CardHeader className="grid">
                <Heading variant="h2">{`#${index + 1} ${
                  course.title
                }`}</Heading>{' '}
                <div>
                  {authorFormat.format(
                    course.authors.map(author => {
                      return author.name;
                    }),
                  )}
                </div>
              </CardHeader>
              <CardBody>
                <div>{course.publisher.name}</div>
                <div className="flex gap-2">
                  {course.links.map(link => {
                    return (
                      <A isExternal showAnchorIcon href={link} key={link}>
                        {new URL(link).hostname}
                      </A>
                    );
                  })}
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </>
  );
}
