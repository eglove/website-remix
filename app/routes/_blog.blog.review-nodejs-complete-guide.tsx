import { A } from '../components/elements/a';
import { Paragraph } from '../components/elements/paragraph';

export default function () {
  return (
    <>
      <Paragraph>
        This NodeJS course from Academind starts off very well, covers an
        impressive number of subjects, and then sort of slowly fizzles out into
        a hodge podge of side quests.
      </Paragraph>

      <Paragraph>
        I always appreciate how Maximilian Schwarzmüller is willing to spend a
        little extra time on the small details that really help out later. For
        example, spending a section of the beginning of this course talking
        about different types of errors and how to debug them. Often times,
        these detailed segments on basic subjects can feel boring but they are
        very well worth spending the time on.
      </Paragraph>

      <Paragraph>
        One of those things is middleware. You would think that in a course
        about Node and Express, a lot of time would be spent explaining the
        concept of middleware. But in a lot of courses, the word “middleware”
        seems to come out of nowhere when the section on authentication comes
        up. This is a subject I was confused about for a very long time. But Max
        introduces and explains the concept early. It&apos;s the best breakdown
        of middleware I have yet to come across. He explains it from the context
        of how Express is built around it. Not as some random “thing” you kind
        of have to do when you want to create a sign in route.
      </Paragraph>

      <Paragraph>
        This is the general vibe I got from the course. Great explanations and
        demonstrations of core principles.
      </Paragraph>

      <Paragraph>
        There&apos;s even an entire section on downloading and uploading files.
        This is nice because creating a file upload and dealing with multipart
        formdata for the first time can be very frustrating. File uploads are
        the only common reason you have to deal with this sort of thing, but
        it&apos;s common nonetheless. So its a very undercovered subject.
      </Paragraph>

      <Paragraph>
        There are a few other side adventures that come along at just the right
        time. Such as going over CSRF during authentication and PDF generation
        during payment processing.
      </Paragraph>

      <Paragraph>
        This isn&apos;t a “build one big project” sort of course, but you will
        spend a significant amount of time on a few medium sized projects.
        Enough time to gain perspective on different approaches and tools
        through the context of that project.
      </Paragraph>

      <Paragraph>
        It&apos;s through that process that the course covers a lot of stuff.
        Slowly upgrading as you go. Such as transitioning from raw SQL, to
        sequelize, to Mongoose ORM.
      </Paragraph>

      <Paragraph>
        Overall this is a fantastic course, however the last few sections feel
        tacked on. They don&apos;t really feel like they&apos;re a part of the
        rest of the course. This isn&apos;t the end of the world, but I suspect
        a lot of people are going to get bored at this point and move on to the
        next subject.
      </Paragraph>

      <Paragraph>
        I also have to harp on the fact that testing is one of these tacked on
        subjects. I long for the day when I see an instructor using a test first
        approach in their tutorials. Using the test writing process as an
        opportunity to talk about what the functionality should achieve.
      </Paragraph>

      <Paragraph>
        There are also elements of building a web app without talk of
        accessibility and usability. I think this is a subject that needs to be
        drilled over and over into nearly every aspect of development.
      </Paragraph>

      <Paragraph>
        Because this is a well put together course, with a ton of awesome
        information I give{' '}
        <A href="https://pro.academind.com/p/nodejs-the-complete-guide-incl-mvc-rest-apis-graphql">
          Maximilian Schwarzmüller&apos;s NodeJS - The Complete Guide
        </A>{' '}
        a 4 out of 5.
      </Paragraph>
    </>
  );
}
