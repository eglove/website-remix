import { A } from '../components/elements/a';
import { CodeWrapper } from '../components/elements/code-wrapper';
import { Heading } from '../components/elements/heading';
import { Paragraph } from '../components/elements/paragraph';
import { SanityImage } from '../components/elements/sanity-image';

export default function () {
  return (
    <>
      <Paragraph>
        QwikCity is just about the perfect web framework. It&apos;s far from the
        most popular, and not even well known, but in terms of performance,
        it&apos;s basically an easy 100 lighthouse score.
      </Paragraph>
      <Paragraph>
        I recently moved another project of mine to QwikCity using{' '}
        <A isExternal href="https://qwik.builder.io/docs/integrations/react/">
          React islands
        </A>{' '}
        for the entire app. All of the UI components use NextUI which need to
        exist in islands, which mean very little code is within QwikCity. And
        still the performance is very impressive. Better even than Astro
        islands.
      </Paragraph>
      <SanityImage
        alt="Page speed score for Sterett project. Performance 97"
        height={735}
        src="https://cdn.sanity.io/images/drccvtog/production/ce59d9228a6af318219a26a0de6785b6f11dc101-972x735.png"
        width={972}
      />
      <SanityImage
        alt="Sterett pagespeed issues, properly size images, reduce unused CSS"
        height={744}
        src="https://cdn.sanity.io/images/drccvtog/production/a4b83e3c1d50f5f0863a32390802c87d05009a55-972x744.png"
        width={972}
      />
      <Paragraph>
        So not quite 100. But it&apos;s still very impressive considering the UI
        library I&apos;m using is{' '}
        <A isExternal href="https://nextui.org/">
          NextUI
        </A>{' '}
        which uses framer motion and a very large Tailwind bundle due to
        it&apos;s accessibility styles.
      </Paragraph>
      <Heading variant="h2">What Makes QwikCity So Fast?</Heading>
      <Paragraph>
        Today frameworks like NextJS are implementing more and more,
        increasingly complex render patterns. SSG, SSR, ISR, and now PPR. The
        latter of the two only work with specialized infrastructure, primarily
        Vercel. QwikCity takes a different approach by attempting to open-source
        the methodologies behind Google&apos;s internal Wiz framework. Namely
        instead of JavaScript files being treated as blocking resources, it
        pre-populates the browsers cache in the background with service workers.{' '}
        <A isExternal href="https://qwik.builder.io/docs/concepts/resumable/">
          Qwik has no hydration step.
        </A>{' '}
        <A
          isExternal
          href="https://www.builder.io/blog/our-current-frameworks-are-on-we-need-o1"
        >
          Which gives it O(1) performance.
        </A>
      </Paragraph>
      <SanityImage
        alt="Qwik loading JS files with service workers."
        height={338}
        src="https://cdn.sanity.io/images/drccvtog/production/2a753eb739c265ad45aac4d5d6380d56964f3733-1846x338.png"
        width={1846}
      />
      <Paragraph>
        The two scripts you see above not loaded by service workers is from a
        Chrome extension. Even React itself is pre-populated by Qwik. And the
        only render-blocking resource is NextUI&apos;s large CSS bundle.
      </Paragraph>
      <Heading variant="h2">What else makes it so good?</Heading>
      <Paragraph>
        Aside from being very fast, there&apos;s a lot that makes QwikCity great
        to work with.
      </Paragraph>
      <ul className="list-inside list-decimal">
        <li className="mb-2">
          <strong>Uses JSX:</strong> Let&apos;s be honest, JSX is the best
          template engine. Writing it is far easier than anything else, the
          mental models are straightforward, and it&apos;s very readable.
        </li>
        <li className="mb-2">
          <strong>Loader/Action data pattern:</strong> Borrowing from Remix,
          QwikCity allows the use of{' '}
          <A isExternal href="https://qwik.builder.io/docs/route-loader/">
            loaders
          </A>{' '}
          and{' '}
          <A isExternal href="https://qwik.builder.io/docs/action/">
            actions
          </A>{' '}
          for server communication.
        </li>
        <li className="mb-2">
          <strong>RPC calls:</strong> Taking inspiration from NextJS you can go
          for <A href="https://qwik.builder.io/docs/server$/">RPC calls</A> for
          mutations as well.
        </li>
        <li className="mb-2">
          <strong>Cache-Control Headers:</strong> Next&apos;s ISR is nice, but
          it requires unique infrastructure. QwikCity allows you to go back to
          plain{' '}
          <A href="https://qwik.builder.io/docs/caching/">
            Cache-Control Headers
          </A>{' '}
          while{' '}
          <A href="https://nextjs.org/docs/app/api-reference/next-config-js/headers#cache-control">
            Next will strip them out of your application altogether
          </A>
          .
        </li>
        <li className="mb-2">
          <strong>Progressive Enhancement:</strong> Like Remix, Qwik provides an
          easy way to write{' '}
          <A
            isExternal
            href="https://qwik.builder.io/docs/action/#using-actions-with-form"
          >
            progressively enhanced forms
          </A>{' '}
          using actions.
        </li>
      </ul>
      <Heading variant="h2">What makes it less than perfect?</Heading>
      <Heading className="font-bold" variant="h3">
        Inconsistent State
      </Heading>
      <Paragraph>
        To put it simply, the Qwik implementation of signals isn&apos;t great.
        Pulling from{' '}
        <A
          isExternal
          href="https://dev.to/this-is-learning/the-cost-of-consistency-in-ui-frameworks-4agi"
        >
          Ryan Carniato&apos;s blog post on state consistency
        </A>
        , what does this console log print out in React?
      </Paragraph>
      <CodeWrapper language="tsx">
        {[
          'const [count, setCount] = useState(0);',
          'const doubleCount = useMemo(() => count * 2, [count]);',
          'const element = useRef();',
          '',
          'return (',
          '  <button',
          '    ref={element}',
          '    onClick={() => {',
          '      setCount(count + 1);',
          '      console.log(count, doubleCount, element.current.textContent);',
          '    }',
          '  }>',
          '    {doubleCount}',
          '  </button>',
          ')',
        ]}
      </CodeWrapper>
      <Paragraph>
        The answer is 0 0 0. This is a very good thing. We know state changes
        are not actually made to the DOM until the next render. We can safely
        batch all operations and not deal with an issue where state is different
        in two places that use the same value. This is a much safer model at
        scale.
      </Paragraph>
      <Paragraph>The equivalent code in Qwik looks like this:</Paragraph>
      <CodeWrapper language="tsx">
        {[
          '  const count = useSignal(0);',
          '  const doubleCount = useComputed$(() => {',
          '    return count.value * 2;',
          '  });',
          '',
          '  return (',
          '    <button',
          '      id="buttonId"',
          '      onClick$={() => {',
          '        count.value = count.value + 1;',
          '        const element = document.querySelector("#buttonId");',
          '        console.log(count.value, doubleCount.value, element?.textContent);',
          '      }}',
          '    >',
          '      {doubleCount}',
          '    </button>',
          '  );',
        ]}
      </CodeWrapper>
      <Paragraph>
        And the result is 1 0 0. This is exactly the same as Svelte did in
        Carniato&apos;s post. His comments: &ldquo;Svelte doesn&apos;t even try
        to be consistent. This might be a blessing and a curse.&rdquo; If you
        continue to click, subsequent results are &lsquo;2 2 2&rsquo;, &lsquo;3
        4 4&rsquo;. So the DOM is always one step behind. Inconsistent with
        everything else.
      </Paragraph>
      <Paragraph>
        You could argue that React is always a step behind too, but I think this
        is wrong. Because everything changes at once. Everything is in sync. We
        get consistency. The more complex an application grows, the more likely
        this is to cause problems.
      </Paragraph>
      <Heading className="font-bold" variant="h3">
        Serialization Boundaries
      </Heading>
      <Paragraph>
        Part of what makes Qwik so fast is it&apos;s ability to serialize server
        state so that it can be resumed on the client without the need to
        hydrate. This is fantastic, however it can get confusing trying to
        figure out exactly what a{' '}
        <A
          isExternal
          href="https://qwik.builder.io/docs/guides/serialization/#-boundaries"
        >
          $ boundary
        </A>{' '}
        is doing. If you don&apos;t like React RSC server/client boundaries,
        you&apos;re going to hate serialization boundaries.
      </Paragraph>
      <Heading className="font-bold" variant="h3">
        File Based Layouts
      </Heading>
      <Paragraph>
        File based routing is great, file based layouts are awful. When it comes
        down to it, dealing with websites that have various layouts is a huge
        pain with this method. I think BlitzJS was on the right track by
        implementing route configurations. Making this code level makes it much
        more straight forward without having to deal with things like
        (route-group)/[_layout]/someSimplePage/index.tsx
      </Paragraph>
      <CodeWrapper language="tsx">
        {[
          'const NewProjectPage: BlitzPage = () => {',
          ' //',
          '};',
          '',
          'NewProjectPage.authenticate = true',
          'NewProjectPage.getLayout = (page) => <Layout>{page}</Layout>',
          '',
          'export default NewProjectPage',
        ]}
      </CodeWrapper>
      <Heading variant="h2">Should I use QwikCity?</Heading>
      <Paragraph>
        I think QwikCity is viable with React islands. I wouldn&apos;t use it by
        itself. To me it&apos;s a more high performance version of Remix +
        Astro. I think resumability is the proper path forward for web
        applications, not NextJS render patterns, or even worse WASM. This is a
        proper step forward that I wish more frameworks would attempt to
        implement. For now, I would favor QwikCity with React Islands over any
        other framework.
      </Paragraph>
      <Paragraph>
        With React islands you can get consistent state and not have to worry
        about serialization boundaries, solving two big problems by simply using
        the more intuitive React API&apos;s.
      </Paragraph>
    </>
  );
}
