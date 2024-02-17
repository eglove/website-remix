// eslint-disable-next-line unicorn/prevent-abbreviations
import { A } from '../components/elements/a';
import { Heading } from '../components/elements/heading';
import { Paragraph } from '../components/elements/paragraph';

export default function () {
  return (
    <>
      <Paragraph>
        When I wrote{' '}
        <A href="https://ethang.dev/blog/i-love-nest-js">I Love NestJS</A>, I
        made a mistake. I was in the middle of exploring a lot of options for
        GraphQL when I came across it. I got excited by the fact that I could
        easily use the framework to generate a GraphQL API with a simple OOP
        approach. I forgot that{' '}
        <A isExternal href="https://youtu.be/QM1iUe6IofM">
          Object Oriented Programming is Bad
        </A>
        . In that excitement I wrote up the post comparing the{' '}
        <span className="font-bold">syntax</span> to Nexus and Apollo. The
        simple syntax made things feel cleaner and more organized.
      </Paragraph>

      <Paragraph>
        The irony is that I started that article with the words, “Decorators and
        Dependency Injection containers. Gross.” But I wasn&apos;t giving proper
        weight to the fact that NestJS uses patterns that are meant to solve
        problems with OOP. In a hybrid language like TypeScript, they just get
        in the way.
      </Paragraph>

      <Paragraph>
        Shortly after, I added two NestJS courses to my{' '}
        <A
          isExternal
          href="https://introspect.dev/list/6cb1ab98-e847-408d-b64d-4a47f2e8a2dc"
        >
          recommended list
        </A>
        . I feel bad about this. That list is supposed to be a way for people to
        start from knowing nothing about programming to learning the industry
        standards of web development. NestJS does not follow industry standards.
        And so I want to apologize for including those courses on that list. I
        let my excitement over the illusion that NestJS casts cloud my
        judgement.
      </Paragraph>

      <Paragraph>
        So I will be removing those courses from that list. But I also want to
        list the reasons why you should not use NestJS.
      </Paragraph>

      <Heading variant="h3">Decorators</Heading>

      <Paragraph>
        Decorators are used to add new behaviors to objects without extending or
        affecting the base class.
      </Paragraph>

      <Paragraph>
        This is a problem we don&apos;t have in standard TypeScript design. If
        we use a class in TypeScript it is meant as a simple way to instantiate
        an object and couple methods. It is NOT used as a way to design a
        system.
      </Paragraph>

      <Paragraph>
        Let&apos;s take an example from{' '}
        <A isExternal href="https://refactoring.guru/design-patterns/decorator">
          Refactoring Guru
        </A>
        . In this example a decorator is used to create a composition pattern in
        order to send notifications via various channels. But with TypeScript,
        we should never find ourselves in this mess to begin with. Instead, a
        simple exported function which accepts a notification type as an
        argument suffices.
      </Paragraph>

      <Paragraph>
        Decorators help solve a problem when ALL code MUST reside within classes
        and you do not want the overhead of inheritance. But because in
        TypeScript, all code does not have to reside in classes, this pattern is
        solving no problems. It is simply unnecessary complexity resulting from
        improper thinking and design.
      </Paragraph>

      <Heading variant="h3">Dependencies</Heading>

      <Paragraph>
        <span className="font-bold">class-validator</span>: For a long time
        NestJS depended on class-validator which famously has scarce open-source
        support, has never hit a full version 1, and regularly suffers from
        security vulnerabilities that can take years to fix. While NestJS was
        finally able to rid itself of the class-validator dependency by forking
        it with @nestjs/class-validator, it&apos;s not exactly a full
        replacement. NestJS still depends on class-validator to a degree as they
        have not exactly rewritten the library to fix all of its known problems.
      </Paragraph>

      <Paragraph>
        <span className="font-bold">TypeORM</span>: This has to be the worst ORM
        on the market. For the life of me, I have now idea how simple connectors
        like TypeORM manage to maintain any popularity when alternatives like
        Prisma exist. TypeORM is not even typed. When you run a .findOne()
        method is just passes back a generic. Compared to Prisma which returns a
        specific type according to the columns and relationships chosen. Not to
        mention the more intuitive API, cursor pagination, the fluent API for
        relationships, nested reads and writes (no JOIN madness), more robust
        filtering, and the fact that the query engine runs on the native
        machine. And yes, you can use any ORM with Nest, but the fact that they
        recommend it shows how out of touch NestJS is.
      </Paragraph>

      <Heading variant="h3">Dependency Injection</Heading>

      <Paragraph>
        This is the stupidest part of NestJS and one they seem to be the most
        proud of. Dependency Injection is again a way to bring composition to
        OOP. (Which again is irrelevant to TypeScript.) The idea goes that while
        writing unit tests, you don&apos;t want to have to deal with nested
        objects. If the class instantiates and runs another class, you have to
        worry about effectively testing it as well. So instead, you pass classes
        needed into the constructor and instantiate them there.
      </Paragraph>

      <Paragraph>
        NestJS is meant to handle this process automatically so long as you tell
        it which classes the current one depends on. What this creates however,
        is a mess of having to add dependencies to a module file and tests,
        which then expands to any parent classes of that class. Adding simple
        functionality to anything gets to be a massive pain of watching a dev
        server fail, adding dependencies, watching it fail again, on loop until
        you finally chain your way up to whatever level its happy with. And when
        you run your tests, you have to go through the whole process all over
        again.
      </Paragraph>

      <Paragraph>
        But is the pay off worth it? Nope, you still have to create manual mocks
        for everything or depend on jest.spyOn() in order to make sure that you
        don&apos;t have to run methods from other classes. So this entire ritual
        becomes completely meaningless. Composition with classes works just fine
        in TypeScript without the modules to manage them.
      </Paragraph>

      <Paragraph>
        jest.spyOn() in your tests would have solved this entire problem. And of
        course, if you&apos;re writing as many pure functions as possible, your
        code is always going to be far more testable than trying to trap
        everything within the confines of objects to begin with.
      </Paragraph>

      <Paragraph>
        Like everything else, dependency injection solves a problem that does
        not exist in standard TypeScript best practices. It is a way to support
        poor, and naive code design.
      </Paragraph>

      <Heading variant="h3">DTOs</Heading>

      <Paragraph>
        This is just another word for object validation. class-validator sucks.
        For a more complete solution I recommend{' '}
        <A isExternal href="https://github.com/colinhacks/zod">
          Zod
        </A>{' '}
        but there is also{' '}
        <A isExternal href="https://github.com/jquense/yup">
          Yup
        </A>{' '}
        and{' '}
        <A isExternal href="https://joi.dev/">
          Joi
        </A>
        . All of these follow a more standard syntax, are regularly updated,
        don&apos;t depend on things like decorators, and have far more features.
      </Paragraph>

      <Heading variant="h3">False Comfort</Heading>

      <Paragraph>
        NestJS is one of those things where people coming from other languages
        like Java don&apos;t know how to develop without the patterns that Java
        gave them.
      </Paragraph>

      <Paragraph>
        It&apos;s like when people first hear about GraphQL, they&apos;ll look
        at GQL as a service providers like Hasura and think, “This is putting
        database logic in the browser, SQL injection!” So they just don&apos;t
        use it. That surface-level judgement is as naive and nubile as it gets.
      </Paragraph>

      <Paragraph>
        Java developers think, “If I can&apos;t use decorators, how can I change
        methods without affecting the base class?” ...What base class? Why are
        you extending anything? Your reusable methods should not be trapped
        within the confines of inheritance chains, or even classes for that
        matter.
      </Paragraph>

      <Paragraph>
        “If there&apos;s no dependency injection, you can&apos;t test classes
        with dependencies!” jest.spyOn works fine if needed, and in fact you
        still have to use it with dependency injection. But this is still
        thinking in inherited classes and not really the kind of problem you
        should be thinking about with TS.
      </Paragraph>

      <Paragraph>
        The perceived need for these things are a naive misunderstanding of how
        a language like TypeScript is typically designed. By forcing solutions
        to problems that don&apos;t exist, NestJS creates 3x-5x the amount of
        work and code that it would take to do the same thing with established
        best practices.
      </Paragraph>

      <Paragraph>
        Which is why I say, for the love of god, do not ruin TypeScript
        development with awful instant legacy garbage like NestJS. It may feel
        exciting to see how it generates GraphQL, or having an Angular-like CLI.
        But good GraphQL takes a lot of work no matter how you slice it, and if
        you want the CLI, try{' '}
        <A isExternal href="https://nx.dev/">
          NX
        </A>
        . NestJS just creates a mess and nothing more. You&apos;re better off
        learning how to code.
      </Paragraph>
    </>
  );
}
