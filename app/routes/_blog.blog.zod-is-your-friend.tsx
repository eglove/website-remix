import { useLoaderData, useLocation } from '@remix-run/react';
import type { JSX } from 'react';

import { ExampleForm } from '../components/blog/zod-is-your-friend/example-form';
import { zodDownloadsSchema } from '../components/blog/zod-is-your-friend/schema';
import { A } from '../components/elements/a';
import { Blockquote } from '../components/elements/blockquote';
import { CodeWrapper } from '../components/elements/code-wrapper';
import { Paragraph } from '../components/elements/paragraph';
import { TocHeader } from '../components/elements/toc-header';

const numberFormatter = Intl.NumberFormat('en-US');

export async function loader(): Promise<number> {
  const zodDownloadsResponse = await fetch(
    'https://api.npmjs.org/downloads/point/last-week/zod',
  );

  const zodDownloadsData = zodDownloadsSchema.safeParse(
    await zodDownloadsResponse.json(),
  );

  return zodDownloadsData.success ? zodDownloadsData.data.downloads : 5_395_424;
}

export default function ZodIsYourFriend(): JSX.Element {
  const { pathname } = useLocation();
  const zodDownloads = useLoaderData<typeof loader>();

  const tableOfContents = [
    { href: `/blog/${pathname}#tldr`, label: 'TL;DR' },
    { href: `/blog/${pathname}#inputsOutputs`, label: 'Inputs and Outputs' },
    { href: `/blog/${pathname}#forms`, label: 'Forms' },
    { href: `/blog/${pathname}#apis`, label: "API's" },
    { href: `/blog/${pathname}#testing`, label: 'Testing' },
    { href: `/blog/${pathname}#environment`, label: 'Environment Variables' },
  ];

  return (
    <div>
      <ul className="my-2 list-inside" id="toc">
        {tableOfContents.map(item => {
          return (
            <li key={item.href}>
              <A href={item.href}>{item.label}</A>
            </li>
          );
        })}
      </ul>

      <Paragraph>
        {numberFormatter.format(zodDownloads)} weekly NPM downloads. Over{' '}
        {numberFormatter.format(3000)} dependent libraries. Built in support
        with most React form libraries, QwikJS, tRPC, and{' '}
        <A href="https://github.com/sponsors/colinhacks">
          a healthy amount of funding
        </A>
        . What is the value of Zod? TypeScript itself can create a strong level
        of type safety. But it doesn&apos;t protect you from runtime type bugs.
        If it isn&apos;t used properly, it can provide effectively zero type
        safety on the edges of your application.{' '}
        <span className="font-bold">
          Misused, TypeScript will do more harm than good.
        </span>
      </Paragraph>

      <Paragraph>
        For example, to get the number of downloads for Zod I make a fetch call
        to the NPM registry:
      </Paragraph>

      <CodeWrapper>
        {[
          'const zodDownloadsResponse = await fetch(',
          "  'https://api.npmjs.org/downloads/point/last-week/zod',",
          ');',
        ]}
      </CodeWrapper>

      <Paragraph>
        To get the response data you need to parse the JSON from the Response
        object.
      </Paragraph>

      <CodeWrapper>
        {['const zodDownloadsData = await zodDownloadsResponse.json()']}
      </CodeWrapper>

      <Paragraph>
        There should be a glaring issue with this. zodDownloadsData is now
        implicitly typed as &lsquo;any&rsquo;. People new to TypeScript might
        solve this problem by casting it to a type.
      </Paragraph>

      <CodeWrapper>
        {[
          'type ZodDownloads = {',
          '  downloads: number',
          '  end: string',
          '  package: string',
          '  start: string',
          '}',
          '',
          'const zodDownloadsData = await zodDownloadsResponse.json() as ZodDownloads;',
        ]}
      </CodeWrapper>

      <Paragraph>
        This is a terrible mistake. It gives the developer the illusion of type
        safety and doesn&apos;t make use of TypeScript at all. This is
        effectively the same as using JSDocs comments. It provides no type
        safety, it is only for in-editor documentation. The point of TypeScript
        is not to create handy autocompletes that reassure you everything is OK,
        it is to help you create a type safe application.
      </Paragraph>

      <Blockquote
        link="https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/"
        source="Parse, don’t validate"
      >
        Shotgun parsing is a programming antipattern whereby parsing and
        input-validating code is mixed with and spread across processing
        code—throwing a cloud of checks at the input, and hoping, without any
        systematic justification, that one or another would catch all the “bad”
        cases.
      </Blockquote>

      <TocHeader href={`/blog/${pathname}`} id="tldr" text="TL;DR" />

      <Paragraph>
        Zod provides a functional approach to parsing data without being purist
        or dogmatic about functional programming. Never assume you&apos;re
        getting the correct data from an external system. Check it first.
      </Paragraph>

      <CodeWrapper>
        {[
          'const zodDownloadsSchema = z.object({',
          '  downloads: z.number(),',
          '  end: z.string(),',
          '  package: z.string(),',
          '  start: z.string(),',
          '});',
          '',
          '// You can also leave out unused values',
          'const zodDownloadsSchema = z.object({',
          '  downloads: z.number(),',
          '});',
          '',
          '// With try/catch',
          'try {',
          '  const zodDownloadsData = zodDownloadsSchema.parse(',
          '    await zodDownloadsResponse.json(),',
          '  );',
          '} catch (error: unknown) {',
          '  if (error instanceof ZodError) {',
          '    // Handle ZodError',
          '  }',
          '}',
          '',
          '// With functional error handling',
          'const zodDownloadsData = zodDownloadsSchema.safeParse(',
          '  await zodDownloadsResponse.json(),',
          ');',
          '',
          'if (zodDownloadsData.success) {',
          '  // Success case',
          '  // zodDownloadsData.data is defined',
          '  // zodDownloadsData.error is undefined',
          '} else {',
          '  // Error case',
          '  // zodDownloadsData.error is defined',
          '  // zodDownloadsData.data is undefined',
          '}',
        ]}
      </CodeWrapper>

      <TocHeader
        href={`/blog/${pathname}`}
        id="inputsOutputs"
        text="Inputs and Outputs"
      />

      <Paragraph>
        Zod goes beyond simple types because it is making runtime checks, we can
        add any parsing logic we want. For example I have a
        &ldquo;createBlog&rdquo; function:
      </Paragraph>

      <CodeWrapper>
        {[
          'const createBlog = (',
          '  properties: Readonly<z.input<typeof createBlogSchema>>,',
          '): z.output<typeof createBlogSchema> => {',
          '  return createBlogSchema.parse(properties);',
          '};',
        ]}
      </CodeWrapper>

      <Paragraph>
        First thing, I&apos;m letting this function throw. Mostly because it
        runs for every blog at build time. I&apos;m OK with letting the build
        fail on error. But also notice the &lsquo;z.{' '}
        <span className="font-bold">input</span> &rsquo; and &lsquo;z.{' '}
        <span className="font-bold">output</span> &rsquo; for the parameter and
        return types. The schema looks like this:
      </Paragraph>

      <CodeWrapper>
        {[
          'export const createBlogSchema = z',
          '  .object({',
          '    authors: z.array(z.object({ name: z.string() })).default(DEFAULT_AUTHORS),',
          '    featuredImage: z.object({ description: z.string(), url: z.string() }),',
          '    slug: z.string(),',
          "    timezone: z.string().default('America/Chicago'),",
          '    title: z.string(),',
          '    updatedAt: z.string(),',
          '  })',
          '  .transform(schema => {',
          '    return {',
          '      ...schema,',
          '      _id: v4(),',
          '    };',
          '  });',
        ]}
      </CodeWrapper>

      <Paragraph>
        The defaults and transformations help create two different types. The
        input types equivalent looks like this:
      </Paragraph>

      <CodeWrapper>
        {[
          'type CreateBlogInput = {',
          '  authors?: Array<{ name: string }> | undefined;',
          '  featuredImage: { description: string; url: string };',
          '  slug: string;',
          '  timezone?: string | undefined;',
          '  title: string;',
          '  updatedAt: string;',
          '};',
        ]}
      </CodeWrapper>

      <Paragraph>
        Notice there is no _id, and authors and timezone are both optional due
        to the fact that they have default values. The equivalent output type
        will look like this:
      </Paragraph>

      <CodeWrapper>
        {[
          'type CreateBlogOutput = {',
          '  _id: string;',
          '  authors: Array<{ name: string }>;',
          '  featuredImage: { description: string; url: string };',
          '  slug: string;',
          '  timezone: string;',
          '  title: string;',
          '  updatedAt: string;',
          '};',
        ]}
      </CodeWrapper>

      <Paragraph>
        Now _id is included and all fields are required. Two types for the price
        of one! We know exactly what we can pass in and exactly what we&apos;ll
        get back. And we know this for sure because of the runtime parsing.
      </Paragraph>

      <Paragraph>
        Of course as a last note, the triviality of this function makes getting
        both input and output types from a single Zod schema possible. This is
        basically treating Zod as a class constructor. Which is entirely valid.
        But maybe not the usual use case.
      </Paragraph>

      <TocHeader href={`/blog/${pathname}`} id="forms" text="Forms" />

      <Paragraph>
        <A href="https://react-hook-form.com">React Hook Form</A>
        is just one example of a form library with built in support for
        validation. This provides an easy way to create complex validations for
        forms without lengthy if/else conditions and checks within a submit
        function.
      </Paragraph>

      <Paragraph>A sign up form may use a schema like this:</Paragraph>

      <CodeWrapper>
        {[
          'const nameSchema = z.string().min(3).max(100);',
          '',
          'export const exampleSignUpSchema = z',
          '  object({',
          '    confirmPassword: z.string(),',
          "    email: z.string().email('Invalid email address'),",
          '    firstName: nameSchema,',
          '    lastName: nameSchema,',
          '    password: z',
          '      .string()',
          "      .min(8, 'Password must be at least 8 characters long')",
          "      .max(30, 'Password cannot be longer than 30 characters')",
          '      .regex(',
          '        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!#$%&*@^])/,',
          "        'Password must contain at least one lowercase letter, one uppercase letter, one digit, and one special character (!@#$%^&*)',",
          '      ),',
          '  })',
          '  .refine(',
          '    data => {',
          '      return data.password === data.confirmPassword;',
          '    },',
          '    {',
          "      message: 'Passwords do not match.',",
          "      path: ['confirmPassword'],",
          '    },',
          '  );',
        ]}
      </CodeWrapper>

      <Paragraph>
        This gives us a pretty straightforward and quickly readable definition
        of this forms rules. names need to be between 3 and 100 characters. We
        have built-in email validation. A regex test for the password. And a
        final refine to make sure the password and confirmPassword are equal.
      </Paragraph>

      <Paragraph>
        When using react hook form, all you have to do is include the ZodSchema
        as a &ldquo;resolver&rdquo; and it will run before the form onSubmit.
      </Paragraph>

      <CodeWrapper>
        {[
          'const { formState: { errors } } = useForm({',
          '  resolver: zodResolver(exampleSignUpSchema),',
          '});',
        ]}
      </CodeWrapper>

      <Paragraph>Go ahead and give it a try.</Paragraph>

      <ExampleForm />

      <TocHeader href={`/blog/${pathname}`} id="apis" text={"API's"} />

      <Paragraph>
        tRPC makes beautiful use of Zod by baking it into the framework itself.{' '}
        I used tRPC and Zod as{' '}
        <A href="/blog/making-react-testable">
          a great example of how to separate parsing from API logic for
          testability
        </A>
        . For the tl;dr, tRPC provides a clean interface to parse and validate
        all incoming and outgoing data from your API:
      </Paragraph>

      <CodeWrapper>
        {[
          'export const create = procedure',
          '  .input(projectPreferenceCreateInputSchema)',
          '  .output(projectPreferenceCreateReturnSchema)',
          '  .mutation(async ({ input }): Promise<ProjectPreferenceCreateReturn> => {',
          '    return prisma.projectPreference.create({',
          '      select: {',
          '        id: true,',
          '        name: true,',
          '      },',
          '      data: {',
          '        name: input.name,',
          '        user: {',
          '        connect: {',
          '          username: input.username,',
          '        },',
          '      },',
          '    },',
          '  });',
          '});',
        ]}
      </CodeWrapper>

      <Paragraph>
        But of course because Zod is a standalone library it works fine anywhere
        with TypeScript. Just create a schema and parse it. Handle errors with
        the previously mentioned try/catch or functional safeParse.
      </Paragraph>

      <TocHeader href={`/blog/${pathname}`} id="testing" text="Testing" />

      <Paragraph>
        Again, Zod as a tool for testing is largely covered in the previously
        mentioned &ldquo;
        <A href="/blog/making-react-testable">Making React Testable</A>
        &rdquo; . With{' '}
        <A
          isExternal
          href="https://github.com/anatine/zod-plugins/tree/main/packages/zod-mock"
        >
          @anatine/zod-mock
        </A>{' '}
        it&apos;s very easy to mock data from Zod schemas. Using{' '}
        <A isExternal href="https://fakerjs.dev">
          faker.js
        </A>{' '}
        as a dependency this library will do it automatically. Using tools like
        Zod and it&apos;s supporting libraries will quickly help you find a path
        towards better unit testing. Many developers struggle to really
        understand separation of concerns. Doing &ldquo;stream of consciousness
        coding&rdquo; creates bad tests whether you prescribe to any tribe like
        TDD or BDD or none at all. These frameworks won&apos;t help you if you
        don&apos;t split up your code.
      </Paragraph>

      <Paragraph>
        Learning to separate parsing from logic means smaller, more concise, and
        more accurate tests. With each piece easier to test in full. Schema can
        be tested with correct error handling and logic can be tested given
        variations of that schemas parsed output. Mixing parsing and logic
        eventually leads to missed tests due to the fact that the code ran and
        we long longer see the misstep in coverage reports.
      </Paragraph>

      <CodeWrapper>
        {[
          "it('should validate correct input', () => {",
          '  const input = generateMock(projectPreferenceCreateInputSchema);',
          '',
          '  const parsed = projectPreferenceCreateInputSchema.parse(input);',
          '',
          '  expect(parsed).toStrictEqual(input);',
          '});',
          '',
          "it('should throw on incorrect input', () => {",
          '  const input = {',
          '    username: true,',
          '    name: 546,',
          '  };',
          '  let errors: ZodError | null = null;',
          '',
          '  try {',
          '    projectPreferenceCreateInputSchema.parse(input);',
          '  } catch (zError) {',
          '    if (zError instanceof ZodError) {',
          '      errors = zError;',
          '    }',
          '  }',
          '',
          "  expect(errors?.issues[0].message).toBe('Expected string, received boolean');",
          "  expect(errors?.issues[1].message).toBe('Expected string, received number');",
          '});',
        ]}
      </CodeWrapper>

      <TocHeader
        href={`/blog/${pathname}`}
        id="environment"
        text="Environment Variables"
      />

      <Paragraph>
        As a bonus, and a testament to the flexibility of Zod. For every
        project, I always include a .environment.ts file which reads
        process.env. If for example, you have a OPENAI_KEY variable, the type of
        process.env.OPENAI_KEY is &lsquo;string | undefined&rsquo;. If all of
        your environment variables are defined, this isn&apos;t true. It should
        be &lsquo;string&rsquo;. Nor does this help you determine{' '}
        <span className="font-bold">what</span> is and isn&apos;t defined{' '}
        <span className="font-bold">when</span> it is defined. In other words,
        process.env has to be shotgun parsed. So we can simply parse it with
        Zod.
      </Paragraph>

      <CodeWrapper>
        {[
          'const environmentSchema = z.object({',
          '  OPENAI_KEY: z.string(),',
          "  DB_CONNECTION: z.string().default('sqlite://...'),",
          '});',
          '',
          'export default environmentSchema.parse(process.env);',
          '',
          'environment.OPENAI_KEY // Type is string, not string | undefined!',
        ]}
      </CodeWrapper>

      <Paragraph>
        This conveniently forces environment variables to be checked when the
        app is started or during build. If something is missing, it throws and
        we get a helpful reminder to make sure to define all required
        environment variables.
      </Paragraph>
    </div>
  );
}
