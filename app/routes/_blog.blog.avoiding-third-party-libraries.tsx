import { A } from '../components/elements/a';
import { Paragraph } from '../components/elements/paragraph';

export default function () {
  return (
    <>
      <Paragraph>
        As a developer, it can be tempting to reach for the latest and greatest
        libraries and frameworks to solve every problem. However, it&apos;s
        important to remember that sometimes the simplest solution is the best
        one.
      </Paragraph>

      <Paragraph>
        In the world of web development, there are many libraries and frameworks
        that offer solutions for common problems, such as authentication and
        managing application state. However, these libraries often come with
        their own set of problems, such as bloat and potential security
        vulnerabilities.
      </Paragraph>

      <Paragraph>
        For example, when it comes to authentication, many developers use
        specialized libraries like{' '}
        <A href="https://next-auth.js.org">NextAuth</A> to handle the process.
        However, HTTP headers and cookies already exist for this purpose and are
        natively supported by web browsers. Using these built-in tools can often
        be a more secure and efficient solution than relying on a third-party
        library.
      </Paragraph>

      <Paragraph>
        Or the use of global providers for managing light theme vs dark theme.
        While these libraries can be useful, the
        &ldquo;prefers-color-scheme&rdquo; media query can be used to access the
        user&apos;s device settings and provide a more consistent experience
        across all of their apps.
      </Paragraph>

      <Paragraph>
        Furthermore, when it comes to network data, many developers will try to
        shove everything into a global provider such as with Redux. But state
        management tools don&apos;t properly use HTTP cache invalidation and
        overcomplicate the idea of caching at all. In these cases, it&apos;s
        often better to use a simpler approach that does support caching such as{' '}
        <A href="https://tanstack.com/query/v4/">React Query</A>,{' '}
        <A href="https://swc.rs">SWC</A>, or the upcoming features built into{' '}
        <A href="https://beta.nextjs.org/docs/data-fetching/caching">NextJS</A>
      </Paragraph>

      <Paragraph>
        While the React ecosystem offers many powerful tools, it&apos;s
        important for developers to remember the native solutions that are
        already available. By using these simple, built-in tools, we can avoid
        the pitfalls of relying on third-party libraries and create more
        efficient and secure applications.
      </Paragraph>
    </>
  );
}
