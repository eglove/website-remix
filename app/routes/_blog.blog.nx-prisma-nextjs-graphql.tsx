import { A } from '../components/elements/a';
import { CodeWrapper } from '../components/elements/code-wrapper';
import { Heading } from '../components/elements/heading';
import { Paragraph } from '../components/elements/paragraph';
import { SanityImage } from '../components/elements/sanity-image';

export default function () {
  return (
    <>
      <Paragraph>
        Building out a monorepo for the first time was a huge “Aha!” moment and
        complete mental model shift for me. Traditionally monorepos have been
        inaccessible and reserved for companies like Google who are writing
        their own build systems and git software. NX has brought monorepos to
        the mainstream and made maintaining them very easy. On a large scale
        where cloning a lot of projects at once can effect your system
        performance, you may have to write up a CLI to implement{' '}
        <A href="https://github.blog/2020-01-17-bring-your-monorepo-down-to-size-with-sparse-checkout/">
          sparse-checkout
        </A>{' '}
        with the NX workspace package. But for everything else, NX provides all
        the tools necessary for efficient linting, building, testing, and
        managing multiple libraries and apps.
      </Paragraph>
      <Paragraph>
        But I want to talk about something more specific. Organizing monorepos
        with NextJS apps and Prisma to take full advantage of what NX has to
        offer.
      </Paragraph>
      <Paragraph>
        The basic idea of a monorepo is that 80% of your code is in libraries,
        20% is in apps. Or as I like to put it, the logic is in the libraries.
        And the wrappers and layouts are in the apps.
      </Paragraph>
      <Heading variant="h3">Prisma and the Backend</Heading>
      <Paragraph>
        Let&apos;s take a database API for example. If you&apos;re using Prisma,
        you already have prebuilt, typed methods to access your database.
        However that doesn&apos;t complete a REST, GraphQL or RPC API.
      </Paragraph>
      <Paragraph>
        The first thing I like to do is setup Prisma to plan for multiple
        databases. By specifying an output directory for the Prisma client I can
        change it&apos;s import from &lsquo;@prisma/client&rsquo; to
        &lsquo;@ethang/sterett-data&rsquo; as a way to differentiate it from
        other databases. I will typically then create a sterett-client.ts file
        in the Prisma folder to initialize and export that client.
      </Paragraph>
      <SanityImage
        alt="Monorepo directory in WebStorm IDE"
        height={Math.round(688)}
        src="https://cdn.sanity.io/images/drccvtog/production/3e970ebc74107e9ab6c87f1e08b72e2e51c02f94-1026x688.png"
        width={Math.round(1026)}
      />
      <Paragraph>
        Second is starting a library to hold the models for this database. Below
        you&apos;ll see I&apos;ve created a library called
        &lsquo;sterett-database&rsquo; to contain model methods. I&apos;m also
        using prisma-zod-generator to generate Zod validations for incoming
        arguments. The parse will throw an error if any arguments do not meet
        validation. Those validations can also be used on the frontend. Also
        notice I&apos;m using a object here, not a class. This means this will
        be called with EventModel.findUnique(), rather than having to use the
        new keyword.
      </Paragraph>
      <SanityImage
        alt="Example of model in monorepo."
        height={471}
        src="https://cdn.sanity.io/images/drccvtog/production/d75ad42d845c28b2b862bfd168095119c5e47787-1365x471.png"
        width={1365}
      />
      <Paragraph>
        <span className="font-bold">
          With this library setup you can call this from any server-side
          function. From within Next.js getServerSideProps(), from a REST API,
          from a GraphQL resolver, or from an RPC function.
        </span>{' '}
        If you&apos;re familiar with Nest.JS, think of this as your service.
        It&apos;s where you&apos;ll put validations and decide on what to return
        (such as never returning a password column). Authentication and public
        endpoints are up to the app to create. The point is to have common code
        you can import and use in any app, no matter its structure.
      </Paragraph>
      <Paragraph>
        For me, you might have also noticed another generator I&apos;m using in
        the Prisma schema.{' '}
        <A href="https://prisma.typegraphql.com/">typegraphql-schema</A>. This
        generates into the node_modules directory as a package labeled
        &lsquo;@ethang/sterett-typegraphql&rsquo;. Basically it generates an
        entire GraphQL schema and its resolvers from the Prisma schema.
      </Paragraph>
      <Paragraph>
        I don&apos;t necessarily recommend always generating GraphQL resolvers.
        A lot of times generation simply can not properly handle the custom
        logic required to build production apps. If you&apos;re putting together
        a federation, this might be a good option. But I only use it here
        because it&apos;s for a small admin dashboard app that only needs
        read/write access as defined by the client.
      </Paragraph>
      <Paragraph>
        To build a more robust GraphQL API that can take full advantage of
        something like Prisma, I recommend NestJS and{' '}
        <A href="https://www.npmjs.com/package/prisma-nestjs-graphql">
          prisma-nestjs-graphql
        </A>
        . The reason I recommend NestJS here is because of that generator.
        Writing out schema by hand to match Prisma arguments is unrealistic.
        This generator will allow you to do that and still give you the control
        you likely need.
      </Paragraph>
      <SanityImage
        alt="GraphQL api importing TypeGraphQL generated resolvers."
        height={867}
        src="https://cdn.sanity.io/images/drccvtog/production/8421ddc1f08f69e7e399516a2703d59f6b8f7e35-606x867.png"
        width={606}
      />
      <Paragraph>
        But with typegraphql-schema, all I have to do to setup a fully
        functional GraphQL server is import those generated resolvers, then add
        the previously created client to context as &lsquo;prisma&rsquo;. The
        only thing the backend is missing at this point is authentication which
        I&apos;ll add later.
      </Paragraph>
      <Heading variant="h3">Organizing NextJS</Heading>
      <Paragraph>
        We&apos;ve now got a GraphQL server very quickly up and running that
        will allow us to flexibly interact with the database. So let&apos;s move
        on to the client.
      </Paragraph>
      <Paragraph>
        NextJS already makes it very easy to organize routes out of the box with
        it&apos;s file based routing. Typically it&apos;s in the page file where
        I&apos;ll make calls for data and setup a layout. It&apos;s important to
        keep components small, when they start to exceed 100 lines, they&apos;re
        probably too big.
      </Paragraph>
      <Paragraph>
        The way I go about this is to write out everything I need on the page,
        then push view layers down and as small as possible after. For a long
        time, I always put logic into custom hooks, but I&apos;ve since changed
        my position on that and started doing logic components and view
        components.
      </Paragraph>
      <Paragraph>
        My reasoning for this comes from the idea of reducing unnecessary
        rerenders by making use of props. This is a more comfortable way to me,
        to write out logic and send individual props to the component to tell it
        when to rerender.
      </Paragraph>
      <Paragraph>
        For example, this Next page has one simple state property and a GraphQL
        fetch. The Create New button will never rerender as the Route and name
        props are both static. The ShowEvents component rerenders when the list
        of events changes. And the Paginate component rerenders with the skip
        variable changes (on page traversal) or if the total count of events
        changes.
      </Paragraph>
      <SanityImage
        alt="NextJS page showing components."
        height={834}
        src="https://cdn.sanity.io/images/drccvtog/production/676bb02390f464d93749484116f11ec59551bc9d-1857x834.png"
        width={1857}
      />
      <Paragraph>
        If we extend that into something a little more robust we get something
        like this with form and form-view components. This is an upsert (update
        or insert) form that prefills the form with data if an object is passed
        to the component, and updates or creates based on that presence.
      </Paragraph>
      <Paragraph>
        <span className="font-bold">upsert-event-form.tsx</span>
      </Paragraph>
      <CodeWrapper>
        {[
          'export function UpsertEventForm({',
          '  event,',
          '}: UpsertEventFormProperties): JSX.Element {',
          '  const router = useRouter();',
          '  const [createEventMutation] = useMutation(CreateEvent);',
          '  const [updateEventMutation] = useMutation(UpdateEvent);',
          '',
          "  const isCreating = typeof event?.id === 'undefined';",
          '',
          '  const initialUpsertEventState = {',
          "    description: event?.description ?? '',",
          "    endsAt: defaultDateTimeInputFormat(event?.endsAt) ?? '',",
          "    startsAt: defaultDateTimeInputFormat(event?.startsAt) ?? '',",
          "    title: event?.title ?? '',",
          '  };',
          '',
          '  const handleUpsertEvent = async (): Promise<void> => {',
          "    await (typeof event?.id === 'undefined'",
          '      ? createEventMutation({',
          '          variables: {',
          '            data: {',
          '              ...formState,',
          '            },',
          '          },',
          '        })',
          '      : updateEventMutation({',
          '          variables: {',
          '            data: {',
          '              description: { set: formState.description },',
          '              endsAt: { set: formState.endsAt },',
          '              startsAt: { set: formState.startsAt },',
          '              title: { set: formState.title },',
          '            },',
          '            where: {',
          '              id: event.id,',
          '            },',
          '          },',
          '        }));',
          '',
          '    await router.push(Routes.events.index);',
          '  };',
          '',
          '  const {',
          '    handleSubmit,',
          '    fieldErrors,',
          '    formState,',
          '    handleInputChange,',
          '    setFormState,',
          '  } = useForm(initialUpsertEventState, {',
          '    onSubmit: handleUpsertEvent,',
          '    zodValidator: upsertEventValidation,',
          '  });',
          '',
          '  return (',
          '    <UpsertEventFormView',
          '      fieldErrors={fieldErrors}',
          '      formState={formState}',
          '      handleInputChange={handleInputChange}',
          '      handleSubmit={handleSubmit}',
          '      initialDescription={event?.description}',
          '      isCreating={isCreating}',
          '      setFormState={setFormState}',
          '    />',
          '  );',
          '}',
        ]}
      </CodeWrapper>
      <Paragraph>
        <span className="font-bold">upsert-event-form-view.tsx</span>
      </Paragraph>
      <CodeWrapper>
        {[
          'export function UpsertEventFormView({',
          '  fieldErrors,',
          '  formState,',
          '  handleInputChange,',
          '  handleSubmit,',
          '  initialDescription,',
          '  isCreating,',
          '  setFormState,',
          '}: UpsertEventFormViewProperties): JSX.Element {',
          '  return (',
          '    <Container>',
          '      <TrussForm',
          '        isLarge',
          "        legend={isCreating ? 'Create Event' : 'Update Event'}",
          '        onSubmit={handleSubmit}',
          '      >',
          '        <TrussTextInput',
          '          isRequired',
          '          errorMessages={fieldErrors?.title}',
          '          label="Title"',
          '          name="title"',
          '          value={formState.title}',
          '          onChange={handleInputChange}',
          '        />',
          '        <TrussDateTimePicker',
          '          isRequired',
          '          errorMessages={fieldErrors?.startsAt}',
          '          label="Start Time"',
          '          name="startsAt"',
          '          value={formState.startsAt}',
          '          onChange={handleInputChange}',
          '        />',
          '        <TrussDateTimePicker',
          '          isRequired',
          '          errorMessages={fieldErrors?.endsAt}',
          '          label="End Time"',
          '          name="endsAt"',
          '          value={formState.endsAt}',
          '          onChange={handleInputChange}',
          '        />',
          '        <TinyMceEditor',
          '          initialValue={initialDescription}',
          '          onEditorChange={(description): void => {',
          '            setFormState(formState_ => {',
          '              return {',
          '                ...formState_,',
          '                description,',
          '              };',
          '            });',
          '          }}',
          '        />',
          '        <ButtonGroup>',
          "          <Button type=\"submit\">{isCreating ? 'Create' : 'Update'}</Button>",
          '          <TrussNextLink href={Routes.events.index}>',
          '            <Button className="bg-accent-cool-dark" type="button">',
          '              Go Back',
          '            </Button>',
          '          </TrussNextLink>',
          '        </ButtonGroup>',
          '      </TrussForm>',
          '    </Container>',
          '  );',
          '}',
        ]}
      </CodeWrapper>
      <Paragraph>
        Logic and view are kept separate, and React is left to handle props as
        needed. If you&apos;re passing context to a view component, you can also
        wrap the return function in a useMemo hook and provide it with
        dependencies specific to the item you&apos;re pulling off of context.
      </Paragraph>
      <Heading variant="h3">NextJS Directory Structure</Heading>
      <Paragraph>
        For directory structure I like to start with the{' '}
        <A href="https://angular.io/guide/file-structure">Angular approach</A>{' '}
        and move files up in a way similar to{' '}
        <A href="https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md">
          Bulletproof React
        </A>
        . Taking the below for example, I categorize components by
        &lsquo;feature&rsquo;. There are common components that can be used
        anywhere, and there are components specific to features. These feature
        components setup a layout with grid or flex, make network requests, pull
        together multiple components to form a larger view, and handle any
        client side logic.
      </Paragraph>
      <Paragraph>
        As for common components, it&apos;s always worth considering if those
        components are only specific to the app. If they can be used by other
        apps, they should be moved to a monorepo library. In the form example
        above, all of the Truss components are imported from a
        &lsquo;trussworks-components&rsquo; library on my NX monorepo.
      </Paragraph>
      <SanityImage
        alt="Example NextJS file structure."
        height={555}
        src="https://cdn.sanity.io/images/drccvtog/production/4332c94399368a3ec734151df20dea3a1f034173-337x555.png"
        width={337}
      />
      <Paragraph>
        Unlike what Bulletproof React recommends, I think it&apos;s more
        comfortable to keep styles, tests and types specific to a component
        within that component directory like Angular does. It is only when you
        need something general to the entire feature that you should move those
        up to new style/types/etc. directories. Start small and atomic, and only
        escalate files when needed.
      </Paragraph>
      <Paragraph>
        If you need to{' '}
        <A href="https://beta.reactjs.org/learn/scaling-up-with-reducer-and-context">
          escalate state into context
        </A>
        , a context wrapper can be created for the parent component of the
        feature, the page, or wherever the lowest level it&apos;s needed at. For
        anything store related, you&apos;re still following the same directory
        structure. I&apos;m using Apollo Client here and have no need for any
        other state management.
      </Paragraph>
      <Heading variant="h3">NextJS GraphQL Structure</Heading>
      <Paragraph>
        Finally, when it comes to organizing GraphQL calls, that can be a little
        awkward. Traditionally you might put all of your API calls into one
        directory and map then to an object like Api.GetEvent(). You can still
        do that, it&apos;s absolutely a good choice. Personally, because GraphQL
        calls are just template strings, I like to just organize constants into
        separate files along with return types that use TypeScript&apos;s Pick
        utility to state exactly what&apos; returned.
      </Paragraph>
      <SanityImage
        alt="File structure for organization GraphQL calls."
        height={739}
        src="https://cdn.sanity.io/images/drccvtog/production/2eb149f15fb5022b8f7aba41fbda57c7113987e3-1106x739.png"
        width={1106}
      />
      <Heading variant="h3">But don&apos;t listen to me...</Heading>
      <Paragraph>
        This is only the structure I&apos;ve come up with that I find to be
        comfortable in almost all cases. But I always like to say, every project
        deserves its own opinions. You might find something that works better
        for you and your app. There is no one, magic way to organize anything.
        But organization, in general, helps apps scale and organize very
        quickly. It&apos;s important to make sure that you can be comfortable
        browsing, reading and modifying code without confusion or getting lost.
      </Paragraph>
      <Paragraph>
        Continued reading:{' '}
        <A href="https://ethang.dev/blog/nx-prisma-nextjs-graphql">
          For the Scaling JS Playbook
        </A>
      </Paragraph>
    </>
  );
}
