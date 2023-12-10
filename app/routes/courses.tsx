import { isNil } from '@ethang/util/data.js';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { json } from '@remix-run/node';
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
