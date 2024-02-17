import { A } from '../components/elements/a';
import { Paragraph } from '../components/elements/paragraph';

export default function () {
  return (
    <>
      <Paragraph>
        The release of
        <A href="https://nextjs.org/blog/next-13">NextJS 13</A> changes how we
        build React apps. Server components as a default, first-class Promise
        support, and caching built directly into the router. And I couldn&apos;t
        be more excited. I&apos;ve converted this blog to use the new app
        directory (with many headaches and apparently some sacrifices to
        responsiveness). This is expected, it is a beta feature after all.
      </Paragraph>

      <Paragraph>
        But I wanted to take a step back and remind people that if they&apos;re
        angry about the direction Next is going in, or fail to see why it&apos;s
        better than [insert other thing here]. Then you not only don&apos;t have
        to use it, I would plead that you don&apos;t try.
      </Paragraph>

      <Paragraph>
        I&apos;ve switched technologies a lot. For the longest time I hated
        JavaScript. I was all about PHP and going out of my way to never write a
        single line of JS. I even used{' '}
        <A href="https://amp.dev/documentation/guides-and-tutorials/learn/spec/amphtml/">
          Google AMP HTML
        </A>{' '}
        very heavily when it released. Before PHP, I wanted to do everything in
        Java. But when I was introduced to React, I loved it.
      </Paragraph>

      <Paragraph>
        It&apos;s the time that I hated JS that I want to focus on. Everyone has
        their biases. I&apos;ve seen hate of unfamiliar things in teams as well.
        I was once hired to help a team move from Apache Velocity to Vue. They
        wanted Vue because it <span className="font-bold">looked</span>{' '}
        familiar. But they failed to grasp the fundamentals of client-side
        routing, client-side rendering, component based design, state
        management, and so on. I saw the same thing with a PHP team later down
        the line.
      </Paragraph>

      <Paragraph>
        The reason they failed to get it is because they wanted to keep using
        what they were familiar with. They wanted to force Vue to work inside of
        their current mental models.{' '}
        <span className="font-bold">
          They romanticized the idea of being &ldquo;modern&rdquo;, but refused
          to learn what that means.
        </span>
      </Paragraph>

      <Paragraph>
        I recommended that they keep using Apache Velocity and do not attempt to
        switch stacks until they&apos;re ready to A) Learn outside of work, not
        just think they can hack it together within 8 hours a day on user
        stories, and B) take it seriously.
      </Paragraph>

      <Paragraph>
        If you&apos;re not motivated by improvements or new things frustrate
        you, there&apos;s nothing wrong with that. You can rant all day about
        whatever you like, I like to rant too. But please, do not try to force
        your biases on those of us who are always looking to learn and improve.
      </Paragraph>

      <Paragraph>
        Diversity in thinking is great, but by swimming against the tide, you
        become the chink in the armor in any team you work with.
      </Paragraph>

      <Paragraph>
        If you prefer an &ldquo;older&rdquo; way of doing things, I hold no
        stigma against that. Just do it. Find a company that agrees with you.
        You can deliver good user experiences either way. Just don&apos;t try to
        jump in anyone&apos;s path and try to lead them off of it in reaction to
        your own personal fears. You can&apos;t stop the world from moving
        forward. The movements of technology are bigger than you, I, any dumb
        little project we work on, and even Vercel (as difficult to see as that
        is right now).
      </Paragraph>

      <Paragraph>
        If you&apos;re going to hop on this NextJS train, you need to be on
        board at least to an extent that you&apos;re not scoffing and rolling
        your eyes like a child. Believe me, if there were something better
        I&apos;d switch technologies again, just as I&apos;ve always done.
      </Paragraph>

      <Paragraph>
        The same goes for all technologies, if you&apos;re going to switch from
        Apache Velocity to Vue, you had better be ready to forget everything you
        know about building frontends. The alternative is to stick with Apache
        Velocity, there&apos;s nothing wrong with that.
      </Paragraph>

      <Paragraph>
        If you&apos;re going to hop on the Node train, insisting on a DI
        framework like NestJS is just an unwillingness to learn Node and the JS
        ecosystem. The alternative is to stick with Spring Boot, there&apos;s
        nothing wrong with that.
      </Paragraph>

      <Paragraph>
        By trying to force the wrong biases into a community that has rejected
        them, you&apos;re just creating tension, you are the elephant in the
        room that doesn&apos;t belong. Let&apos;s accept that differences in
        doing things is normal and OK, and that not everyone has to be just like
        us.
      </Paragraph>
    </>
  );
}
