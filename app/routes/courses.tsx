import { isNil } from '@ethang/util/data.js';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import type { MetaFunction, TypedResponse } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { JSX } from 'react';

import { A } from '../components/elements/a';
import { Heading } from '../components/elements/heading';
import { Paragraph } from '../components/elements/paragraph';
import type { Course } from '../controllers/get-recommended-courses';
import { getRecommendedCourses } from '../controllers/get-recommended-courses';
import { CONTENT_CACHE_CONTROL } from '../util';

const authorFormat = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});

export const meta: MetaFunction = () => {
  const description = 'Recommended courses for learning web development';
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

export async function loader(): Promise<TypedResponse<Course[]>> {
  const courses = await getRecommendedCourses();

  return json(courses, {
    headers: CONTENT_CACHE_CONTROL,
  });
}

export default function Courses(): JSX.Element | null {
  const courses = useLoaderData<typeof loader>();

  if (isNil(courses)) {
    return null;
  }

  return (
    <>
      <Heading variant="h1">Learn Web Dev</Heading>

      <Paragraph>
        I have been maintaining this list of course for over 4 years. It&apos;s
        meant as a way to provide a straightforward curriculum of what you need
        to learn for web development. It&apos;s updated constantly but at any
        given point in time, I believe this is the best way to get started with,
        and learn everything you need to know to work with the web.
      </Paragraph>

      <Paragraph>
        <span className="font-bold">
          What about free sources like Odin Project?
        </span>{' '}
        If free learning resources were at the same quality of the paid courses
        found on this list, they&apos;d be here. I do not use affiliate links,
        there is 0 incentive for me to suggest any particular source. The Odin
        Project looks very thorough on the outside to beginners, but it&apos;s
        dialogue around being the &ldquo;proper way to learn&rdquo; because it
        links to documentation is misleading. As courses in this list will also
        link to that same documentation and give you the same advice. Yes, you
        need to read documentation, in fact React&apos;s official documentation
        is on this list. But it&apos;s simply not enough to gain the context,
        mental models, and advice that can be provided by experienced, quality
        instructors.
      </Paragraph>

      <Accordion variant="bordered">
        {courses.map((course, index) => {
          const INCREMENT = 1;
          const title = `#${index + INCREMENT} ${course.title}`;

          return (
            <AccordionItem key={course._id} aria-label={title} title={title}>
              <div>
                <span className="font-bold">Instructors:</span>{' '}
                {authorFormat.format(
                  course.authors.map(author => {
                    return author.name;
                  }),
                )}
              </div>

              <div>
                <span className="font-bold">Publisher:</span>{' '}
                {course.publisher.name}
              </div>

              <div className="mt-3 flex gap-2">
                {course.links.map(link => {
                  return (
                    <A key={link} isExternal showAnchorIcon href={link}>
                      {new URL(link).hostname}
                    </A>
                  );
                })}
              </div>
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
}
