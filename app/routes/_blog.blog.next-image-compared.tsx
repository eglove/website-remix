import { A } from '../components/elements/a';
import { CodeWrapper } from '../components/elements/code-wrapper';
import { Heading } from '../components/elements/heading';
import { Paragraph } from '../components/elements/paragraph';

export default function () {
  return (
    <>
      <Paragraph>
        There seems to be come confusion about what exactly the new next/image
        does. People are recommending using next/future/image as a way to embed
        images without width and height. This is not the purpose of the change.
        Rather, the component is integrating native browser APIs instead of the
        custom solutions built into the original component with the help of{' '}
        <A href="https://developer.chrome.com/blog/image-component/">
          Google&apos;s Project Aurora
        </A>
        .
      </Paragraph>
      <Paragraph>
        If you actually read the documentation instead of just linking to it,
        you&apos;ll see no mention of not needing image dimensions. Instead, you
        will see a list of examples to deal with the{' '}
        <span className="font-bold">
          removal of the layout, objectFit, and objectPosition props
        </span>
        .
      </Paragraph>
      <Paragraph>
        Previously, in order to use next/image without image dimensions, you
        would simply use a parent container to set those dimensions:
      </Paragraph>
      <CodeWrapper language="tsx">
        {[
          "<div style={{ height: '300px', position: 'relative', width: 'auto' }}>",
          '  <Image',
          '    layout="fill"',
          '    objectFit="contain"',
          '    src="image.png"',
          '  />',
          '</div>',
        ]}
      </CodeWrapper>
      <Paragraph>
        The current perception seems to be that with the next Image component,
        you can just do a simple {`<Image src="" />`} and everything is
        magically taken care of for you. This is not the case. The effect is the
        same.{' '}
        <span className="font-bold">
          By default, width and height are still required.
        </span>{' '}
        And by using the fill property to skip using width/height{' '}
        <span className="font-bold">
          you still need to define object fit inside of a relative container
        </span>
        . Here is the equivalent code using next/future/image:
      </Paragraph>
      <CodeWrapper>
        {[
          '<div',
          '  style={{',
          "    height: '300px',",
          "    position: 'relative',",
          "    width: 'auto'",
          '  }}',
          '>',
          '  <Image',
          '    fill',
          '    alt="REQUIRED!"',
          '    src="image.png"',
          "    style={{ objectFit: 'contain' }}",
          '  />',
          '</div>',
        ]}
      </CodeWrapper>
      <Paragraph>
        Are you can see,{' '}
        <span className="font-bold">
          there is no difference except moving objectFit into the style object
        </span>
        . The original objectFit argument was simply a redundancy.
      </Paragraph>
      <Heading variant="h3">
        Focus on Necessary Information for Content, Not Shortcuts
      </Heading>
      <Paragraph>
        The Next image component is amazing. It does a ton of performance work
        we don&apos;t typically think of. A huge amount of work went into a lot
        of small details to produce it. By wanting to embed images without
        dimensions, people are focusing on the wrong problems.
      </Paragraph>
      <Paragraph>
        <span className="font-bold">
          If you&apos;re not storing width/height with your images, where are
          you getting alt texts from?
        </span>
      </Paragraph>
      <Paragraph>
        Standard practice for me for a very long time has been to store image
        URLs with, at a minimum, width, height and altText. Some image hosts
        like Cloudinary can store dimensions for you. But none of them can take
        care of readable, accessible alt text. That is something you need to be
        storing alongside your content anyway.
      </Paragraph>
      <Paragraph>
        Dimensions are the same story. Instead of depending on Next.js to
        magically take care of performance without necessary information, I
        argue that you should never be using the fill layout except as a very
        rare escape hatch. And that looking for a solution that involves not
        using dimensions should only be a last resort.
      </Paragraph>
    </>
  );
}
