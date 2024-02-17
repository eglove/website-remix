import { A } from '../components/elements/a';
import { CodeWrapper } from '../components/elements/code-wrapper';
import { Paragraph } from '../components/elements/paragraph';

export default function () {
  return (
    <>
      <Paragraph>
        Writing React to be testable can be a major headache. How do I test
        internal functions? How do I test that setState was run? Why do I hate
        jest.Mock so much?
      </Paragraph>

      <Paragraph>
        Simple project organization can help these issues. Let&apos;s take a
        project that&apos;s using tRPC for example. tRPC uses a lot of complex
        type inference and attaches itself to React Query.{' '}
      </Paragraph>

      <Paragraph>
        How do you mock these? Their creators Alex Johansson and Tanner Linsley
        aren&apos;t likely to give you a clear answer. In fact, they&apos;re
        more likely to tell you not to. And this makes sense. Because A) these
        are trusted, well tested libraries already, there&apos;s no reason to
        test that they work. B) Mocking them is a ton of setup that may not work
        with your stack. And C) This is not good testing.
      </Paragraph>

      <Paragraph>
        I&apos;ve used a few different methods to separate logic from view in
        React components. The two big ones being custom hooks, and data
        components. I think by mixing the two, this can help keep unit tests
        clean, small, and stress free.
      </Paragraph>

      <Paragraph>
        Let&apos;s start with a tRPC call. Below is a tRPC call that uses Prisma
        to creates a &ldquo;Project Preference&rdquo; for a user given a
        username and preference name.
      </Paragraph>

      <CodeWrapper>
        {[
          "import { procedure } from 'source/feature/server/trpc';",
          "import { prisma } from 'source/prisma/client';",
          "import { z } from 'zod';",
          ' ',
          'export const projectPreferenceCreateInputSchema = z.object({',
          '\tusername: z.string(),',
          '\tname: z.string(),',
          '});',
          ' ',
          'export type ProjectPreferenceCreateInput = z.infer<',
          '\ttypeof projectPreferenceCreateInputSchema',
          '>;',
          ' ',
          'export const projectPreferenceCreateReturnSchema = z.object({',
          '\tid: z.string().uuid(),',
          '\tname: z.string(),',
          '});',
          ' ',
          'export type ProjectPreferenceCreateReturn = z.infer<',
          '\ttypeof projectPreferenceCreateReturnSchema',
          '>;',
          ' ',
          'export const create = procedure',
          '\t.input(projectPreferenceCreateInputSchema)',
          '\t.output(projectPreferenceCreateReturnSchema)',
          '\t.mutation(async ({ input }): Promise<ProjectPreferenceCreateReturn> => {',
          '\t\treturn prisma.projectPreference.create({',
          '\t\t\tselect: {',
          '\t\t\t\tid: true,',
          '\t\t\t\tname: true,',
          '\t\t\t},',
          '\t\t\tdata: {',
          '\t\t\t\tname: input.name,',
          '\t\t\t\tuser: {',
          '\t\t\t\tconnect: {',
          '\t\t\t\t\tusername: input.username,',
          '\t\t\t\t},',
          '\t\t\t},',
          '\t\t},',
          '\t});',
          '});',
        ]}
      </CodeWrapper>

      <Paragraph>
        How do we test this call? The answer is we don&apos;t. Instead, we test
        the Zod schemas. In other languages, we would probably call these DTOs.
        We test that they can accept and successfully parse/fail the schemas. We
        can trust that tRPC and Zod are not broken. If they are, we
        shouldn&apos;t be using them.
      </Paragraph>

      <Paragraph>
        If we have more logic around this Prisma call, we probably want to move
        it to it&apos;s own function. The{' '}
        <A href="https://www.prisma.io/docs/guides/testing/unit-testing">
          Prisma Client is incredibly easy to mock
        </A>{' '}
        as the Client itself is only a transportation layer between Node and the
        real Rust-based client. Plus types are generated, not inferred, so
        explicit database types exist within node_modules. Relatively speaking,
        compared to tRPC and React Query, Prisma Client is shallow enough for
        Jest to handle.
      </Paragraph>

      <Paragraph>Let&apos;s take a look at the schema tests.</Paragraph>

      <CodeWrapper>
        {[
          "it('should validate correct input', () => {",
          '\tconst input = generateMock(projectPreferenceCreateInputSchema);',
          '',
          '\tconst parsed = projectPreferenceCreateInputSchema.parse(input);',
          '',
          '\texpect(parsed).toStrictEqual(input);',
          '});',
          '',
          "it('should throw on incorrect input', () => {",
          '\tconst input = {',
          '\t\tusername: true,',
          '\t\tname: 546,',
          '\t};',
          '\tlet errors: ZodError | null = null;',
          '',
          '\ttry {',
          '\t\tprojectPreferenceCreateInputSchema.parse(input);',
          '\t} catch (zError) {',
          '\t\tif (zError instanceof ZodError) {',
          '\t\t\terrors = zError;',
          '\t\t}',
          '\t}',
          '',
          "\texpect(errors?.issues[0].message).toBe('Expected string, received boolean');",
          "\texpect(errors?.issues[1].message).toBe('Expected string, received number');",
          '});',
        ]}
      </CodeWrapper>

      <Paragraph>
        When we use this call in a React component, it&apos;s best to create a
        &ldquo;data component.&rdquo; A component whose only job is to either
        fetch data, or act as a vehicle to mutate it. The below component has a
        &ldquo;useQuery&rdquo; for fetching data, and a
        &ldquo;useMutation&rdquo; which is being used to call our create method
        above.
      </Paragraph>

      <CodeWrapper>
        {[
          'export default function ProjectPreferencesData(): JSX.Element {',
          '\tconst router = useRouter();',
          '',
          '\tconst { data, isLoading, error, refetch } =',
          '\ttrpc.projectPreference.getForUser.useQuery(',
          '\t\t{ username: router.query.user as string },',
          "\t\t{ enabled: typeof router.query.user === 'string' },",
          '\t);',
          '',
          '\tconst { isLoading: isCreating, mutateAsync: create } =',
          '\t\ttrpc.projectPreference.create.useMutation();',
          '',
          '\treturn (',
          '\t\t<ProjectPreferencesView',
          '\t\t\tcreate={create}',
          '\t\t\tdata={data}',
          '\t\t\terror={error}',
          '\t\t\tisLoading={isLoading || isCreating}',
          '\t\t\trefetch={refetch}',
          '\t\t/>',
          '\t);',
          '}',
        ]}
      </CodeWrapper>

      <Paragraph>
        So how do we test this component? The answer is again, we don&apos;t.
        The API call is already tested via the Zod schemas. And of course once
        we get into the view, we can depend on React Testing Library and mocked
        props. Without getting into what&apos;s in the view, let&apos;s just
        skip straight to a test.
      </Paragraph>

      <CodeWrapper>
        {[
          "it('should render the correct elements with data', async () => {",
          '\tconst mockData = generateMock(projectPreferenceGetForUserReturnSchema);',
          '\tconst { container, getByText, getAllByRole, getByRole } = render(',
          '\t\t<ProjectPreferencesView',
          '\t\t\tcreate={jest.fn()}',
          '\t\t\tdata={mockData}',
          '\t\t\tisLoading={false}',
          '\t\t\trefetch={jest.fn()}',
          '\t\t/>,',
          '\t);',
          '',
          '\tawait expectNoA11yViolations(container);',
          '',
          "\tconst heading = getByText('Project Preferences');",
          '',
          '\texpect(heading).toBeInTheDocument();',
          '',
          "\tconst button = getByRole('button', {",
          "\t\tname: 'Add',",
          '\t});',
          '\texpect(button).toBeInTheDocument();',
          '',
          "\tconst items = getAllByRole('listitem');",
          '',
          '\texpect(items).toHaveLength(mockData.length);',
          '\texpect(items[0]).toHaveTextContent(mockData[0].name);',
          '});',
        ]}
      </CodeWrapper>

      <Paragraph>
        And this is my favorite part of using Zod. We&apos;ve tested the schema
        before. But by using @anatine/zod-mock we can generate mock data for it
        and pass it straight to the component! Now, when working with the view
        and RTL, we don&apos;t have to worry about mocking our API first. We
        just give it props. A much simpler and controlled process than the
        sometimes confusing jest.Mock().
      </Paragraph>

      <Paragraph>
        But here&apos;s the kicker, we saw before that this view is taking in a
        create function. And here were passing a jest.fn() to mock it. But this
        view is a form. Which means it has state, and hooks. How do we handle
        those?
      </Paragraph>

      <Paragraph>Move them to a custom hook.</Paragraph>

      <CodeWrapper>
        {[
          'export const useProjectPreferences = ({',
          '\tcreate,',
          '\trefetch,',
          '}: UseProjectPreferencesProperties): UseProjectPreferencesReturn => {',
          '\tconst user = useUser();',
          '',
          '\tconst { handleChange, formState, handleSubmit, setFormError } = useForm<',
          "\t\tPick<ProjectPreferenceCreateInput, 'name'>",
          '\t>(initialState, {',
          '\t\tasync onSubmit() {',
          '\t\t\tif (user?.username === undefined || !user.isLoggedIn) {',
          "\t\t\t\tsetFormError(new Error('Username not found'));",
          '\t\t\t\treturn;',
          '\t\t\t}',
          '',
          '\t\t\tawait create({',
          '\t\t\t  name: formState.name,',
          '\t\t\t  username: user.username,',
          '\t\t\t});',
          '\t\t\tawait refetch();',
          '\t\t},',
          '\t});',
          '',
          '\treturn {',
          '\t\thandleChange,',
          '\t\tformState,',
          '\t\thandleSubmit,',
          '\t};',
          '};',
        ]}
      </CodeWrapper>

      <Paragraph>
        The implementation details of what&apos;s happening here aren&apos;t too
        important. We have two custom hooks, useForm and useUser. Both handle
        what they sound like they handle. The point is, with this hook separated
        from the component, we can test it&apos;s internal state with Testing
        Library&apos;s renderHook()
      </Paragraph>

      <CodeWrapper>
        {[
          "it('should run create on submit', () => {",
          '\tconst create = jest.fn();',
          '\tconst refetch = jest.fn();',
          '\tsetTestUserCookie();',
          '',
          '\tconst { result } = renderHook(() => {',
          '\t\treturn useProjectPreferences({',
          '\t\t\tcreate,',
          '\t\t\trefetch,',
          '\t\t});',
          '\t});',
          '',
          '\texpect(result.current.formState).toStrictEqual({',
          "\t\tname: '',",
          '\t});',
          '',
          '\tact(() => {',
          '\t\tresult.current.handleSubmit({',
          '\t\t\tpreventDefault: jest.fn(),',
          '\t\t} as unknown as FormEvent);',
          '\t});',
          '',
          '\texpect(create).toHaveBeenCalledWith({',
          "\t\tusername: 'developer',",
          "\t\tname: '',",
          '\t});',
          '});',
        ]}
      </CodeWrapper>

      <Paragraph>
        Again, there are some unimportant details here. We have a
        &ldquo;setTestUserCookie()&rdquo; that gives us a logged in state for a
        user with the username &lsquo;developer&rsquo;. But we can test the
        formState&apos;s initial state and make sure &ldquo;create&rdquo; is
        called when the form is submitted.
      </Paragraph>

      <Paragraph>
        This is a contrived example. Because this is just a form submit, we can
        get &ldquo;coverage&rdquo; with user actions on the component. So you
        might say that this hook in particular is unnecessary. And that may be
        true, it&apos;s not always necessary to separate hooks into their own
        functions. But for developers, coverage is not an important metric.
      </Paragraph>

      <Paragraph>
        Writing thorough tests to ensure the stability of the system is. Keeping
        that organized so you can keep writing thorough tests in the future is
        as well. With that in mind, if it makes sense to move the hook and test
        it, I say move the hook and test it.
      </Paragraph>
    </>
  );
}
