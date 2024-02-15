import { A } from '../components/elements/a';
import { Paragraph } from '../components/elements/paragraph';

export default function () {
  return (
    <>
      <Paragraph>
        When courses cover testing it&apos;s typically one or two videos
        covering setup and a sample test, then it&apos;s completely ignored for
        the rest of the course. All these full stack courses that span 30-60
        hours of building one large project and they don&apos;t include testing.
        Like accessibility, testing is a very important, necessary, and an often
        uncovered aspect of development.
      </Paragraph>
      <Paragraph>
        Cypress is an awesome modern testing tool that allows you to write and
        generate E2E tests. Scott&apos;s rundown of it&apos;s features are
        thorough and quick. This course will get you up and running with Cypress
        with best practices in pretty short order.
      </Paragraph>
      <Paragraph>
        The only thing this course really lacks is depth. Again, it would be
        better if every thing were tested in Wes Bos&apos; Advanced React
        course. He would probably argue that&apos;s asking too much. But like
        accessibility I think tests are such a fundamental part of development,
        you shouldn&apos;t be writing code without tests.
      </Paragraph>
      <Paragraph>
        If this course focused less on a being a quick rundown of Cypress and
        it&apos;s features and more on testing a project (normalizing Cypress as
        part of the normal flow of development) this would be a better course in
        my opinion. But Scott is a great presenter and he&apos;s obviously
        knowledgeable on Cypress. Which is why I give Scott Tolinski&apos;s{' '}
        <A
          href="https://leveluptutorials.com/tutorials/testing-with-cypress"
          isExternal
        >
          Testing With Cypress
        </A>{' '}
        a 4 out of 5.
      </Paragraph>
    </>
  );
}
