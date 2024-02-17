import { A } from '../components/elements/a';
import { Blockquote } from '../components/elements/blockquote';
import { CodeWrapper } from '../components/elements/code-wrapper';
import { Heading } from '../components/elements/heading';
import { NumberedList } from '../components/elements/numbered-list';
import { Paragraph } from '../components/elements/paragraph';
import { SanityImage } from '../components/elements/sanity-image';

export default function () {
  return (
    <>
      <Paragraph>
        GraphQL is faster than REST. The specification itself doesn&apos;t make
        anything inherently faster. But by allowing the client to make highly
        specific requests, it naturally uses less resources.
      </Paragraph>

      <Paragraph>
        That being said, because GraphQL is just a specification and
        doesn&apos;t handle logic for you, just because you&apos;re using
        GraphQL doesn&apos;t mean you&apos;re taking full advantage.
      </Paragraph>

      <Paragraph>
        For example, when you use Prisma to write a resolver to fetch an item,
        GraphQL itself will only retrieve the data the caller requested.
        However, that does not mean Prisma won&apos;t retrieve that excess data
        from the database server side.
      </Paragraph>

      <Heading variant="h3">Select All</Heading>

      <CodeWrapper language="graphql">
        {['query Query {', '  user(id: 123) {', '    username', '  }', '}']}
      </CodeWrapper>

      <Paragraph>
        This query will only return the username field from a user resolver.
        (Let&apos;s assume we&apos;re talking about a user database here.)
        However, that does not mean the Prisma function used to retrieve this
        data doesn&apos;t do:
      </Paragraph>

      <CodeWrapper language="sql">
        {['select * from user where id = 123']}
      </CodeWrapper>

      <Paragraph>
        Luckily, <A href="https://paljs.com/">PalJs</A> provides an easy
        <A href="https://paljs.com/plugins/select">PrismaSelect</A> function
        that looks at the info object from the GraphQL query and makes sure to
        only select the fields requested. You can abstract this into a very
        small and simple function to make it easy to use for all resolvers (info
        comes from every incoming Apollo query):
      </Paragraph>

      <CodeWrapper>
        {[
          "import { PrismaSelect } from '@paljs/plugins';",
          '',
          'export const select = <Type>(info: GraphQLResolveInfo): Type => {',
          '  const { select } = new PrismaSelect(info).value as { select: Type };  ',
          '',
          '  return select;',
          '}',
          '',
          'const user = await prisma.user.findUnique({',
          '  select: select<Prisma.UserSelect>(info),',
          '  where: { id: 123 },',
          '});',
        ]}
      </CodeWrapper>

      <Paragraph>
        This will transform that select all SQL query into the following:
      </Paragraph>

      <CodeWrapper language="sql">
        {['select username from user where id = 123']}
      </CodeWrapper>

      <Heading variant="h3">Relationships</Heading>

      <Paragraph>
        One of the challenges of writing resolvers can be creating relationships
        between tables. For example, I want to make the below query. The user
        table is related to the blog table with a relationship of userId {`=>`}{' '}
        authorId.
      </Paragraph>

      <CodeWrapper language="graphql">
        {[
          'query Query {',
          '  user(id: 123) {',
          '    blogs {',
          '      title',
          '    }',
          '  }',
          '}',
        ]}
      </CodeWrapper>

      <Paragraph>
        There are a couple of things I want Prisma to do here.
      </Paragraph>

      <NumberedList
        items={[
          'Recognize that the initial query to the users table needs to get userId if the child query is querying the blog table.',
          'Recognize that the userId field on user relates to the authorId field on blog.',
        ]}
      />

      <Paragraph>
        I don&apos;t want the caller to have to select the userId field and I
        don&apos;t want to spend too much time writing if statements for every
        resolver relationship. And unfortunately, the GraphQL info object and
        Prisma&apos;s generated types don&apos;t help us much here.
      </Paragraph>

      <Paragraph>
        So what I&apos;ve come up with is a resolveArguments function to do all
        of this work for me. Here&apos;s how it works:
      </Paragraph>

      <Paragraph>
        The key to the functionality is in the array of “RelationInfo” objects.
        Each item in the array represents a relationship between the resolver on
        the current table and the parent table in the nested GraphQL query. We
        use this function in the child resolver. Sticking with our example
        above, we&apos;d put this in the blogs resolver, not the user resolver.
      </Paragraph>

      <CodeWrapper>
        {[
          'export interface RelationInfo {',
          '  parentColumnName: string;',
          '  parentTableName: string;',
          '  relationColumnName: string;',
          '}',
        ]}
      </CodeWrapper>

      <CodeWrapper>
        {[
          'const resolvedArguments = resolveArguments({',
          '  arguments_,',
          '  info,',
          '  parent,',
          '  relationInfo: [',
          '    {',
          '      parentColumnName: Prisma.User.userId,',
          '      parentTableName: Prisma.ModelName.User,',
          '      relationColumnName: Prisma.Blog.authorId,',
          '    },',
          '  ]',
          '});',
        ]}
      </CodeWrapper>

      <Paragraph>
        Let&apos;s walk through what this function does. From the start, while
        we&apos;re resolving arguments we can go ahead and apply our select
        abstraction from above.
      </Paragraph>

      <CodeWrapper>
        {[
          'let resolvedArguments = parameters.arguments_;',
          'if (!ignoreSelect) {',
          '  resolvedArguments.select = select<SelectType>(parameters.info);',
          '}',
        ]}
      </CodeWrapper>

      <Paragraph>
        From here, we can start filling out the request. We do that by looping
        over the relationInfo array and finding which one of it&apos;s parent
        table names relates to the info objects parent table name.
      </Paragraph>

      <CodeWrapper>
        {[
          'for (const relation of parameters.relationInfo) {',
          '  if (parameters.info.parentType.name === relation.parentTableName) {',
          '  }',
          '}',
        ]}
      </CodeWrapper>

      <Paragraph>
        While I mentioned that I don&apos;t want the caller to have to select
        userId, unfortunately you have to remember we&apos;re starting from the
        child table. This logic is happening in the blogs query and we
        don&apos;t have control over what happens in the user query at this
        point. So we need that userId.
      </Paragraph>

      <Paragraph>
        It would at least be a nice courtesy to let users know which field needs
        to be queried:
      </Paragraph>

      <CodeWrapper>
        {[
          "if (typeof thisParent?.[relation.parentColumnName] === 'undefined') {",
          '  throw new TypeError(',
          // eslint-disable-next-line no-template-curly-in-string
          '    `Must call ${relation.parentColumnName} from ${relation.parentTableName}`',
          '  );',
          '}',
        ]}
      </CodeWrapper>

      <Paragraph>
        Otherwise, we can move on and get our resolved arguments. Remember the
        point of this was to make sure we&apos;re using the appropriate
        relationship fields. So essentially all we need to do is make sure
        Prisma&apos;s where statement contains authorId: userId.
      </Paragraph>

      <CodeWrapper>
        {[
          'return {',
          '  ...parameters.arguments_,',
          '  where: {',
          '    [relation.relationColumnName]: thisParent?.[relation.parentColumnName],',
          '    ...parameters.arguments_.where,',
          '  },',
          '}',
        ]}
      </CodeWrapper>

      <Paragraph>
        Simple as that, we use the spread operator to make sure we&apos;re not
        stripping out any fields from the original request and simply add a
        where for the relationship. Altogether it would look something like
        this:
      </Paragraph>

      <CodeWrapper>
        {[
          'interface RelationInfo {',
          '  parentColumnName: string;',
          '  parentTableName: string;',
          '  relationColumnName: string;',
          '}',
          '',
          'interface ResolveParentParameters<ArgumentsType> {',
          '  arguments_: ArgumentsType;',
          '  info: GraphQLResolveInfo;',
          '  parent?: Record<string, unknown>;',
          '  relationInfo?: RelationInfo[];',
          '}',
          '',
          'const resolvedArguments = resolveArguments({',
          '  arguments_,',
          '  info,',
          '  parent,',
          '  relationInfo: [',
          '    {',
          '      parentColumnName: Prisma.User.userId,',
          '      parentTableName: Prisma.ModelName.User,',
          '      relationColumnName: Prisma.Blog.authorId,',
          '    },',
          '  ],',
          '});',
          '',
          'const resolveArguments = <',
          '  ArgumentsType extends ResolvedArguments<SelectType>,',
          '  SelectType',
          '>(',
          '  parameters: ResolveParentParameters<ArgumentsType>,',
          '  ignoreSelect = false',
          '): ArgumentsType => {',
          '  let resolvedArguments = parameters.arguments_;',
          '  if (!ignoreSelect) {',
          '    resolvedArguments.select = select<SelectType>(parameters.info);',
          '  }',
          '',
          '  for (const relation of parameters.relationInfo) {',
          '    if (parameters.info.parentType.name === relation.parentTableName) {',
          "      if (typeof thisParent?.[relation.parentColumnName] === 'undefined') {",
          '        throw new TypeError(',
          // eslint-disable-next-line no-template-curly-in-string
          '          `Must call ${relation.parentColumnName} from ${relation.parentTableName}`',
          '        );',
          '      }',
          '',
          '      return {',
          '        ...resolvedArguments,',
          '        ...parameters.arguments_,',
          '',
          '        where: {',
          '          [relation.relationColumnName]: thisParent?.[relation.parentColumnName],',
          '          ...parameters.arguments_.where,',
          '        },',
          '      }',
          '    }',
          '  }',
          '}',
        ]}
      </CodeWrapper>

      <CodeWrapper>
        {[
          'const blogs = async (',
          '  parent: Record<string, unknown> | undefined,',
          '  arguments_: Prisma.BlogFindManyArgs,',
          '  context: Context',
          '  info: GraphQLResolveInfo',
          '): Promise<Blog[]> => {',
          '  const resolvedArguments = resolveArguments({',
          '    arguments_,',
          '    info,',
          '    parent,',
          '    relationInfo: [',
          '      {',
          '        parentColumnName: Prisma.UserScalarFieldEnum.userId,',
          '        parentTableName: Prisma.ModelName.User,',
          '        relationColumnName: Prisma.BlogScalarFieldEnum.authorId,',
          '      },',
          '    ]',
          '  });',
          '',
          '  return prisma.blogs.findMany({ ...resolvedArguments });',
          '}',
        ]}
      </CodeWrapper>

      <Paragraph>
        This allows you to create boilerplate resolvers that only require a
        relationship array and the default parameters Apollo provides from
        incoming queries. It also helps Prisma generate smarter SQL queries. The
        SQL query here would be something like this:
      </Paragraph>

      <CodeWrapper language="sql">
        {[
          'select userId from User where userId = ‘userId’',
          'select title from blog where authorId = ‘userId’',
        ]}
      </CodeWrapper>

      <Paragraph>
        In case you&apos;re wondering why Prisma generates two SQL statements
        instead of a Join. It&apos;s because it&apos;s more efficient.
        You&apos;ll notice that both are using the same userId from the original
        arguments. These can fire concurrently. This is a simple query, you
        could have queried the blog table directly with the userId. But as these
        scale up and become more complex, Prisma will generate different SQL.
      </Paragraph>

      <Paragraph>
        The point of these abstractions is to take advantage of Prisma as a
        backend. Prisma is really freaking smart. Ideally you want to give it as
        much information as possible (such as relationship info) and let it do
        it&apos;s thing. In the case of GraphQL where a single post request can
        be querying multiple things, Prisma will read everything and generate
        the smartest query it can based on that context. Meaning, it
        doesn&apos;t just fire off SQL queries one at a time as it hits your
        resolvers. It intelligently looks at all incoming requests before
        hitting the database and generates what it believes to be the best
        queries (it&apos;s usually right).
      </Paragraph>

      <Heading variant="h3">Solving The Many-To-Many N+1 Problem</Heading>

      <Paragraph>
        ORM&apos;s get criticized for the N+1 problem. As Prisma&apos;s
        optimization guide says:
      </Paragraph>

      <Blockquote
        link="https://www.prisma.io/docs/guides/performance-and-optimization/query-optimization-performance"
        source="Prisma, Query Optimization"
      >
        The n+1 problem occurs when you loop through the results of a query and
        perform one additional query per result, resulting in n number of
        queries plus the original (n+1). This is a common problem with ORMs,
        particularly in combination with GraphQL, because it is not always
        immediately obvious that your code is generating inefficient queries.
      </Blockquote>

      <Paragraph>
        However, that doesn&apos;t mean this issue can&apos;t be solved on a
        programmatic level such that we can automatically generate efficient
        queries. As noted before, Prisma batches incoming queries to create more
        intelligent SQL queries. However, this does not apply to findMany
        queries.
      </Paragraph>

      <Paragraph>
        Because this site doesn&apos;t use a database. (
        <A href="https://ethang.dev/blog/on-hosting-static-pages">
          On Hosting Static Pages
        </A>
        ) I&apos;m going to pull an example from a real-world production app
        where I implemented this solution. I&apos;m running this query where
        sites refers to a location and caseData refers to a support ticket. I
        used the following query:
      </Paragraph>

      <CodeWrapper language="graphql">
        {[
          'query Query {',
          '  sites',
          '    SiteID',
          '    caseDatas {',
          '      CaseID',
          '    }',
          '  }',
          '}',
        ]}
      </CodeWrapper>

      <Paragraph>
        Without optimizing for N+1 you get one query selecting all sites and a
        new query for each of those sites selecting all caseDatas. The generated
        SQL from prisma looks like this:
      </Paragraph>

      <SanityImage
        alt="Unresolved site, case data."
        height={377}
        src="https://cdn.sanity.io/images/drccvtog/production/8276b034dfa8167a9402eb6dfd44ff334d4f0738-1028x377.png"
        width={1028}
      />

      <Paragraph>
        This query took about 6 seconds to complete. Here&apos;s what it looks
        like after using my resolveFindMany() function.
      </Paragraph>

      <SanityImage
        alt="Resolved site, case data."
        height={524}
        src="https://cdn.sanity.io/images/drccvtog/production/eefca1253a989c1f35937f3065484af380fe791a-1156x524.png"
        width={1156}
      />

      <Paragraph>
        Now, instead of hundreds of individual select statements we get three
        queries. The first is the same, we&apos;re basically just grabbing all
        sites. Then, it grabs all siteId&apos;s (which is the column we&apos;re
        using as a relationship to caseData). Last it grabs the caseData. Note
        that instead of Join, Prisma is using SQL&apos;s IN keyword here.
      </Paragraph>

      <Paragraph>
        You could bring up a lot of arguments about this implementation.
        Complain about the first two queries being essentially the same. Argue
        that Join would be faster. (
        <A href="https://github.com/prisma/prisma/issues/4997#issuecomment-612429050">
          It is not
        </A>
        .) At the end of the day, this implementation is based on Prisma&apos;s
        research and use of relationships to create efficient queries.
      </Paragraph>

      <Paragraph>
        This second query took about 4 seconds. A 2 second savings. Keep in mind
        that I am not running this multiple times or doing any real
        benchmarking. But a 2 second difference is significant. Normally, you
        would want to avoid this kind of query altogether. Instead opt for
        pagination. In the real world, this abstraction cuts down a significant
        amount of time on any findMany query without much effort from the
        developer. Simply use the resolveFindMany() function.
      </Paragraph>

      <Paragraph>
        So what does this function look like? It is honestly very nasty and not
        totally TypeScript friendly. I&apos;ll give a basic list of what it does
        and leave the entire function I&apos;m using in production below. For
        now we&apos;ll keep using the site caseData query as an example.
      </Paragraph>

      <NumberedList
        items={[
          'From the caseData resolver use the same relationship array resolveArguments from above does to get the parent model.',
          'Get the relationValue (siteId) from the parent object. (Site.siteId)',
          'Run a findUnique on the parent model (Site) where the parentColumnName is equal to relationValue.',
          'Chain the current table (caseData) to that findUnique query to run them together.',
        ]}
      />

      <Paragraph>What you end up with is something like this:</Paragraph>

      <CodeWrapper>
        {['Prisma.Site.findUnique({where: {siteId}}).CaseData()']}
      </CodeWrapper>

      <Paragraph>
        This is created for every site found on the parent query. Remember,
        Prisma batches findUnique queries. So by generating a findUnique query
        for every N results from sites, Prisma will batch them together using
        SQL&apos;s IN keyword as seen above.
      </Paragraph>

      <Paragraph>
        So the issue is just generating this based on the GraphQL info object.
        Meaning, we want our resolver to return something like this:
      </Paragraph>

      <CodeWrapper>
        {[
          'return resolveFindMany({',
          '  context,',
          '  info,',
          '  modelName: AmsData.ModelName.CaseData,',
          '  parent,',
          '  relationInfo,',
          '  resolvedArguments,',
          '});',
        ]}
      </CodeWrapper>

      <Paragraph>
        We&apos;re again passing along the default argument on every Apollo
        query but also including a relationInfo array and some resolvedArguments
        (using the above mentioned code).
      </Paragraph>

      <Paragraph>
        This is the messy TypeScript confused function I currently use (totally
        functional and performant):
      </Paragraph>

      <CodeWrapper>
        {[
          '/*',
          ' * In relationships provide index name if it exists.',
          ' * Reference node_modules\\.prisma\\client\\index.d.ts',
          ' * ex. DomainUsers -> Bills created by DomainUser',
          " * ex. DomainUser.Bill_Bill_CreatedByToDomainUser, relationInfo.relationIndexName = 'Bill_Bill_CreatedByToDomainUser'\n" +
            ' */',
          'export const resolveFindMany = async <ModelType>(',
          '  parameters: ResolveQueryParameters',
          '  // eslint-disable-next-line sonarjs/cognitive-complexity',
          '): Promise<ModelType[]> => {',
          '  if (parameters.relationInfo) {',
          '    for (const relation of parameters.relationInfo) {',
          '      if (relation.parentTableName === parameters.info.parentType.name) {',
          "        // @ts-expect-error We're looking for table by parentTableName\n" +
            '        const model = parameters.context.amsData[',
          '          relation.parentTableName.charAt(0).toLowerCase() +',
          '            relation.parentTableName.slice(1)',
          '        ] as {',
          '          // @ts-expect-error This is just an assumption that the table has a findUnique method',
          '          findUnique: ({ where: any }) => typeof parameters.modelName;',
          '        };',
          '',
          "        // @ts-expect-error We're looking for a column by the columnName\n" +
            '        const relationValue = parameters.parent[relation.parentColumnName];',
          '',
          "        if (typeof relationValue === 'undefined') {\n" +
            '          throw new TypeError(',
          // eslint-disable-next-line no-template-curly-in-string
          '            `Must call ${relation.parentColumnName} from ${relation.parentTableName}`',
          '          );',
          '        }',
          '',
          '        // Try parentTable.findUnique().childTable()',
          '        // https://www.prisma.io/docs/guides/performance-and-optimization/query-optimization-performance#solving-the-n1-problem',
          '        try {',
          '          // @ts-expect-error Resolved arguments returns a where if a relationship exists',
          '          delete parameters.resolvedArguments.where[',
          '            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete',
          '            relation.relationColumnName',
          '          ];',
          '',
          '          return (',
          '            // eslint-disable-next-line @typescript-eslint/no-unsafe-call',
          '            model',
          '              .findUnique({',
          '                where: {',
          '                  [relation.parentColumnName]: relationValue,',
          '                },',
          '              })',
          '              [',
          '                // @ts-expect-error Allow to search by column using either string',
          "                typeof relation.relationIndexName === 'string'\n" +
            '                  ? relation.relationIndexName',
          '                  : parameters.modelName',
          '              ]({',
          '                ...parameters.resolvedArguments,',
          '              }) as ModelType[]',
          '          );',
          '          // If the parentTable -> childTable relationship has no index, fall back on original n + 1 issue.',
          '          // This creates a new SELECT for every parent result',
          '        } catch {',
          '          console.error(',
          // eslint-disable-next-line no-template-curly-in-string
          '            `Make sure ${relation.parentTableName} has a foreign key constraint on ${parameters.modelName}.`',
          '          );',
          '',
          '          // This value was deleted above, readd',
          '          // @ts-expect-error Resolved arguments returns a where in case of relationships.',
          '          parameters.resolvedArguments.where[relation.relationColumnName] =',
          '            relationValue;',
          '',
          '          // @ts-expect-error Get table by table name',
          '          // eslint-disable-next-line @typescript-eslint/no-unsafe-call',
          '          return parameters.context.amsData[',
          '            parameters.modelName.charAt(0).toLowerCase() +',
          '              parameters.modelName.slice(1)',
          '          ].findMany({',
          '            ...parameters.resolvedArguments,',
          '          }) as ModelType[];',
          '        }',
          '      }',
          '    }',
          '  }',
          '',
          "  // If relationship isn't defined, use n + 1 efficiency\n" +
            '  // @ts-expect-error Get table by table name',
          '  // eslint-disable-next-line @typescript-eslint/no-unsafe-call',
          '  return parameters.context.amsData[',
          '    parameters.modelName.charAt(0).toLowerCase() + parameters.modelName.slice(1)',
          '  ].findMany({',
          '    ...parameters.resolvedArguments,',
          '  }) as ModelType[];',
          '};',
        ]}
      </CodeWrapper>

      <Heading variant="h3">Last Words</Heading>

      <Paragraph>
        GraphQL is a huge booster to any API. It makes for a good Gateway when
        using a lot of third-party API&apos;s. It&apos;s more performant, and
        easier to work with and maintain than a REST API.
      </Paragraph>

      <Paragraph>
        However, that doesn&apos;t mean everything is done for you out of the
        box. GraphQL is a specification, nothing more. You can use services like
        Hasura to generate GraphQL API&apos;s but if you&apos;re looking to
        build your own, it does involve writing code.
      </Paragraph>

      <Paragraph>
        The initial perception a lot of people have of it is that it somehow
        just magically does everything for you. Not recognizing that all it can
        do is map requests to resolvers and return data based on that.
      </Paragraph>

      <Paragraph>
        I&apos;ve had to listen to professional developers get confused over how
        authentication works with GraphQL... as if REST we&apos;re handling it
        for them previously. The internet still works the same when you&apos;re
        using GraphQL. Headers and post data still exist.
      </Paragraph>

      <Paragraph>
        The point of this post was to share how I&apos;ve been able to generate
        efficient queries with Prisma using GraphQL queries. As this is one of
        the things that make people skeptical of GraphQL I will say I found
        making these sort of programmatic abstractions based on incoming data
        way easier when I have access to GraphQL&apos;s info object and
        Prisma&apos;s batching capabilities.
      </Paragraph>
    </>
  );
}
