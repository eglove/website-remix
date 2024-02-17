import { A } from '../components/elements/a';
import { ColoredText } from '../components/elements/colored-text';
import { Paragraph } from '../components/elements/paragraph';
import { SanityImage } from '../components/elements/sanity-image';

export default function () {
  return (
    <>
      <Paragraph>
        Dan Abramov has always been a great resource for clear and concise
        explanations of some of the technical decisions and directions of React.
        With RSC imminent, his latest tweets have been a great way to get a full
        understanding of why one would use RSC rather than something like Remix,
        Turbolinks, Islands, etc. I wanted to put one of his tweet threads into
        a longer blog form, but you can{' '}
        <A
          isExternal
          href="https://twitter.com/dan_abramov/status/1633574036767662080"
        >
          find the original here
        </A>
        .
      </Paragraph>

      <SanityImage
        alt="React Server Components Architecture"
        height={Math.round((600 / 2214) * 1238)}
        src="https://cdn.sanity.io/images/drccvtog/production/eb5fac193f8bf59556a951c5868038aad783ecb0-2214x1238.jpg"
        width={600}
      />

      <Paragraph>
        In the above image, server components are{' '}
        <ColoredText variant="blue">blue</ColoredText> and run{' '}
        <span className="font-bold">only</span> on the server. They are able to
        securely access a database, the native file system via Node, etc. The{' '}
        <ColoredText variant="green">green</ColoredText> components are client
        components. They run on
        <span className="font-bold">both</span> the client and server. But they
        can not use server-only features. They have to be able to run on
        re-renders. To put it another way{' '}
        <ColoredText variant="blue">server components</ColoredText> send static
        HTML to the browser along with the JSON needed for{' '}
        <ColoredText variant="green">client components</ColoredText> to hydrate.
      </Paragraph>

      <Paragraph>
        In frameworks like <span className="font-bold">Remix</span> and even{' '}
        <span className="font-bold">NextJS 12</span>, everything is green except{' '}
        <ColoredText variant="blue">loaders</ColoredText> or{' '}
        <ColoredText variant="blue">getXProps</ColoredText>. So for every route,
        there is only one blue part. And these blue parts are not composable
        further down the tree.
      </Paragraph>

      <Paragraph>
        Compared to <span className="font-bold">Astro</span>, both blue and
        green parts exist. But they&apos;re written in different languages.{' '}
        <ColoredText variant="blue">Astro</ColoredText> and{' '}
        <ColoredText variant="green">React</ColoredText>. There is also no
        support for rerendering the{' '}
        <ColoredText variant="blue">blue parts</ColoredText> such as on
        navigation or mutation after the page loads.
      </Paragraph>

      <Paragraph>
        Compared to <span className="font-bold">Rails/Turbolinks</span>, the{' '}
        <ColoredText variant="blue">blue parts</ColoredText> are refetchable but
        written in a another language (templates). They also have to be
        synchronous (even when reading from a DB), and the state of the{' '}
        <ColoredText variant="green">green</ColoredText> parts are lost on
        refetch. This is not seamless.
      </Paragraph>
    </>
  );
}
