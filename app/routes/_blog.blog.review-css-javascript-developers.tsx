import { A } from '../components/elements/a';
import { Paragraph } from '../components/elements/paragraph';

export default function () {
  return (
    <>
      <Paragraph>
        This CSS course introduced me to concepts that I never learned from
        other courses. Most courses will give you a cursory introduction to
        things like flex and grid. But they won&apos;t explain margin collapse,
        layout algorithms, stacking context, and other concepts that are needed
        to understand why CSS acts the way it does.
      </Paragraph>
      <Paragraph>
        Most developers hate CSS because they were never taught these underlying
        principles. Instead we memorize tricks and concepts to try to keep out
        of hot water. It&apos;s like only learning git add and git push. If
        that&apos;s all you know about git, you will find yourself in some deep
        trouble unable to solve a basic problem in the future.
      </Paragraph>
      <Paragraph>
        The course itself is cleanly split up between explaining the technical
        sides of CSS and building components or exercises. I think this
        strategy, while it makes sense structurally, makes the course more
        boring than it needs to be. Each of the 9 modules and it&apos;s
        containing lessons are the same formula, over and over, just for
        different topics. After the first couple of modules I found it very
        difficult to focus for more than a few minutes.
      </Paragraph>
      <Paragraph>
        My suggestion would to be to mix the technical explanations into lessons
        that make up a larger project. I know I say this often, but starting
        from scratch building some basic layouts with the flow layout and
        gradually upgrading that and giving it more detail with newer layouts is
        a great way to learn and keep the context from previous lessons.
      </Paragraph>
      <Paragraph>
        When everything is split up and taught from the ground up for every
        module, this becomes grading and it starts to feel like you&apos;ve
        already done each module because each one feels the same as the last.
      </Paragraph>
      <Paragraph>
        The course did, however get me excited for CSS for the first time. My
        head is full of ideas for building component libraries and finally
        redesigning this site.
      </Paragraph>
      <Paragraph>
        My rating system is based on a lot of things. Presentation and detail
        are very important. Because of the repeating formula approach to the
        course, it has more text to read that it has video. Both the video
        presentation and the use of interactive code in the course are very well
        done. (Although I am personally against the usage of interactive
        material as opposed to building real projects that the viewer has total
        ownership of.)
      </Paragraph>
      <Paragraph>
        Another part of that rating system is how it compares to other courses
        of its category. And there simply is no other comparison. The
        information taught in this course is paramount, and missing among a lot
        of professional developers. With great presentation, competent detail,
        and its ability to rise to the top of the category, I give{' '}
        <A isExternal href="https://css-for-js.com/">
          Josh Comeau&apos;s CSS for JavaScript Developers
        </A>{' '}
        a 5 out of 5.
      </Paragraph>
    </>
  );
}
