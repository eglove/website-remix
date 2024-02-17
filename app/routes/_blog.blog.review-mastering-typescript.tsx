import { A } from '../components/elements/a';
import { CodeWrapper } from '../components/elements/code-wrapper';
import { Paragraph } from '../components/elements/paragraph';

export default function () {
  return (
    <>
      <Paragraph>
        Colt Steele is, as always, a great teacher. He is likely the most
        approachable instructor I know for beginners. While I really like
        Stephen Griders&apos; TypeScript course due to its focus on design
        patterns, it never felt like a proper, easy introduction to TypeScript.
        I think that&apos;s exactly what this course provides. But is it needed?
      </Paragraph>

      <Paragraph>
        This course introduces you to TypeScript as a language and how to use
        it. And to be honest, you could do this yourself after you&apos;ve
        learned JavaScript. If you know JS well, do you really need a course to
        explain TS&apos;s simple syntax? Likely, at this point, you&apos;re ok
        with referencing documentation as you go.
      </Paragraph>

      <Paragraph>
        That&apos;s my only small gripe with this course. I feel like it could
        have gone more in depth on how to REALLY take advantage of TS beyond
        basic type safety. As mentioned before I&apos;m not sure JavaScript
        developers need such a beginner level course on TypeScript. And if you
        don&apos;t know JavaScript, you probably shouldn&apos;t start with
        TypeScript.
      </Paragraph>

      <Paragraph>
        I feel like Colt had an opportunity to take things to a more advanced
        level than most of his courses. Maybe get into writing and reading
        complex types. At the end of the day this is a very basic overview of
        types, enums, classes and generics. Type safety to it&apos;s most basic
        level.
      </Paragraph>

      <Paragraph>
        How do you add type definitions to a third party library that
        doesn&apos;t have them? What about TypeScript&apos;s utility types? What
        the hell is this supposed to be?
      </Paragraph>

      <CodeWrapper>
        {[
          'type Diff<T extends string | number | symbol, U extends string> = (',
          '  { [P in T]: P }',
          '  & { [P in U]: never }',
          '  & { [x: string]: never }',
          '  & { [x: number]: never }',
          ')[T];',
        ]}
      </CodeWrapper>

      <Paragraph>
        I feel like anyone prepared to learn TypeScript are likely to be
        disappointed with the basic rundown this course provides. But the course
        is well done and well taught. So I can&apos;t knock it too much.
        That&apos;s why I give{' '}
        <A isExternal href="https://www.udemy.com/course/learn-typescript/">
          Colt Steele&apos;s Mastering TypeScript
        </A>{' '}
        a 4 out of 5.
      </Paragraph>
    </>
  );
}
