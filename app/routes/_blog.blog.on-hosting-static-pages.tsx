import { A } from '../components/elements/a';
import { Paragraph } from '../components/elements/paragraph';
import { SanityImage } from '../components/elements/sanity-image';

export default function () {
  return (
    <>
      <Paragraph>
        I&apos;ve jumped around between different methods of creating static
        websites. Jekyll, Hugo, Gatsby, Sanity, Keystone, Contentful, Wordpress,
        etc. I can&apos;t count how many times I&apos;ve had to copy paste data
        from one platform to another only to be disappointed by the features.
      </Paragraph>
      <Paragraph>
        When using some sort of rich text markup editor, there&apos;s always an
        issue of parsing. I remember Sanity portable text being a nightmare when
        it initially released. Although I believe it&apos;s gotten much better.
      </Paragraph>
      <Paragraph>
        There&apos;s a wide flavor of methods for using markdown flavored
        editors. But I&apos;m going to say something controversial. I don&apos;t
        really like Markdown.
      </Paragraph>
      <Paragraph>
        So in the past I&apos;ve always stored HTML as text on a database and
        used something like{' '}
        <A isExternal href="https://www.npmjs.com/package/react-html-parser">
          react-html-parser
        </A>{' '}
        to parse it on the page. Then it&apos;s just a matter of using server
        side rendering to make things SEO friendly.
      </Paragraph>
      <Paragraph>
        But that still leaves me with having to build an API. And the last thing
        I want to do is build a CMS for a site I only maintain for fun.
        That&apos;s way too many forms.
      </Paragraph>
      <Paragraph>
        Something like Contentful is nice, it gives you the GUI editors, the
        storage and the API. But there are tradeoffs. You can&apos;t directly
        embed a YouTube video, for example. You don&apos;t get as much control
        over the structure of your data as you do with your own database. And of
        course there&apos;s the matter of what if I want to switch to something
        new? Can&apos;t exactly transfer that data to the next thing, can I?
      </Paragraph>
      <Paragraph>
        Today I&apos;ve finally thought of a solution. HTML. Not storing it,
        just writing it, and writing it directly into my code. I know, sounds
        horrible, so many things wrong with that right? But I thought I&apos;d
        give it a go. Here&apos;s what I&apos;ve come up with so far and why I
        think it may be more viable than it sounds.
      </Paragraph>
      <Paragraph>
        First I set up TypeScript classes as “Models” to represent my data, I
        even created a singleton to represent me as an author:
      </Paragraph>
      <SanityImage
        alt="Static Site Models"
        height={869}
        src="https://cdn.sanity.io/images/drccvtog/production/9c4864e7577db710759a2f47736158f862d9b44e-1810x869.png"
        width={1810}
      />
      <Paragraph>
        With the models set up I can create an object dictionary with a slug as
        a key and metadata as the value. For reference I created an enum to
        represent the slug. This helps me keep slugs unique and gives me a short
        reference to each one.
      </Paragraph>
      <SanityImage
        alt="Blog Object"
        height={347}
        src="https://cdn.sanity.io/images/drccvtog/production/73e7aff7c353e5b4c94508ee151e270ec6cb2f8b-1003x347.png"
        width={1003}
      />
      <Paragraph>
        From there, all I had to do was recreate a layout that accepts the slug
        as a prop and start writing the content as a child component.
      </Paragraph>
      <SanityImage
        alt="Blog Layout Component"
        height={496}
        src="https://cdn.sanity.io/images/drccvtog/production/4ea19b9226ad41ae97245fc3a5cacf5b7441bff6-711x496.png"
        width={711}
      />
      <SanityImage
        alt="Blog HTML"
        height={518}
        src="https://cdn.sanity.io/images/drccvtog/production/adcabd5a4fd30b896662ce7e237da7cc82cbfd58-655x518.png"
        width={655}
      />
      <Paragraph>
        As to the question of how to get all blogs for the home page, it&apos;s
        as simple as using Object.getOwnPropertyNames on that enum I created
        before:
      </Paragraph>
      <SanityImage
        alt="Blogs Page Code"
        height={594}
        src="https://cdn.sanity.io/images/drccvtog/production/68978141e29439f2e688088e2e169456b6e3098f-685x594.png"
        width={685}
      />
      <Paragraph>
        That&apos;s it, Emmet means I don&apos;t really have to write much HTML
        and ESLint/Prettier keeps me from having to deal with long lines.
        It&apos;s really not much extra effort than typing into an editor. Plus,
        I don&apos;t have to worry about weird markup languages, video support
        or dealing with an API. Just add a new blog object with some metadata,
        create a file with NextJS file based routing, and start typing. I can
        even use hot reload to see how my content looks on the page. For static
        content, I can just write static content. I don&apos;t know why I
        didn&apos;t think of this before.
      </Paragraph>
      <Paragraph>
        When I first built my site in React it was exciting, and with every new
        tool I did a rewrite, that was fun. But now I want to move on to
        different kinds of projects. And I&apos;d like to talk about them here.
        What I don&apos;t want to do is have to worry about not having a CMS or
        needing to move to new tools. I just want to be able to host on Vercel
        and move on.
      </Paragraph>
      <Paragraph>
        I&apos;ll be migrating all of my previous posts over to this format.
        Which realistically won&apos;t take nearly as long as it took to move it
        from Sanity to my own database. I&apos;ll shut down the Digital Ocean
        DB, close the Hasura account, stop trying to figure out how to generate
        GraphQL types from generated Prisma schema (way harder than it sounds)
        and move on to learning new stuff. I know React, I know API&apos;s, I
        know SEO and building content sites. I don&apos;t want to be spending
        much time on those things. But I&apos;m glad I&apos;ll get to keep the
        content flowing.
      </Paragraph>
    </>
  );
}
