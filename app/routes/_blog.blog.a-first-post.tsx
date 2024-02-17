import { A } from '../components/elements/a';
import { Paragraph } from '../components/elements/paragraph';

export default function () {
  return (
    <>
      <Paragraph>
        It&apos;s been a while since I&apos;ve had a blog. My first was on
        BlogSpot. It contained a story called, ‘The Incredibly Close to Being
        Absolutely True Adventures of Captain Pringle and His Crew.’ On the
        maybe mostly true but somewhat exaggerated shenanigans of my friends and
        I in high school.
      </Paragraph>

      <Paragraph>
        Then came the WordPress blog. Simply hosted on BlueHost, or HostGator,
        one of those two. And which got a little more serious. I wrote 20 pages
        a week on what I thought were brilliant observations that the world
        needed to know.
      </Paragraph>

      <Paragraph>
        I became obsessed with SEO and getting the perfect design that could
        keep readers glued to my long diatribes about life. None of it worked.
        Although I did start to learn more about web development.
      </Paragraph>

      <Paragraph>
        Eventually, after packing down my WordPress install with way too many
        plugins on a shared server, I got frustrated without how slow its
        performance was getting. Lighthouse scores were not satisfactory. So I
        thought I&apos;d build my own CMS. I bought ‘
        <A
          isExternal
          href="https://smile.amazon.com/PHP-MySQL-Dynamic-Web-Sites/dp/0134301846"
        >
          PHP and MySQL for Dynamic Web Sites
        </A>
        ’ by Larry Ullman and got to work. The book went over a very simple
        stack. Setting up a SQL database and using PHP to query its data
        directly into HTML with PHP. Then using a series of includes functions
        to pull together a header, footer, and some content. From there it was
        just a matter of formatting the data onto the page. After I built a
        “backend” that consisted of a few forms to create or update blogs and
        pages, all I had to do was use FileZilla to FTP the files over to
        BlueHost, and presto, I had myself a blog.
      </Paragraph>

      <Paragraph>
        That site certainly served its purpose. It wasn&apos;t difficult to keep
        load speed times to less than 300ms. And I could do all the fancy SEO I
        wanted without having to install a plugin and have to wait on them for
        updates. It was nice.
      </Paragraph>

      <Paragraph>
        But fast forward to today, and I want to do more. To have something more
        declarative. To handle the minor details for me as defined by me.
      </Paragraph>

      <Paragraph>
        Enter Gatsby. A tool I was previously skeptical of. I thought it would
        be very limited and very opinionated. It&apos;s Next.js or bust. But
        after getting more into how it works and what it can do, I&apos;m more
        confident it&apos;s the place my content should call home.
      </Paragraph>

      <Paragraph>
        With the brilliant, performant way it handles images, its hydration
        capabilities for dynamic content, and its extensibility, it&apos;s an
        obvious choice for my homepage. Add with Sanity as a backend CMS... I
        can just define by schema and generate the create post forms? Sold!
      </Paragraph>

      <Paragraph>
        And so this is the stack <A href="/">ethang.dev</A> will live on for the
        foreseeable future. And where I&apos;ll be writing my thoughts on code
        and fleshing out my portfolio. Expect to see more to come. I can&apos;t
        wait to get to work on refining what&apos;s here.
      </Paragraph>
    </>
  );
}
