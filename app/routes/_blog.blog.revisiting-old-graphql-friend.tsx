import type { JSX } from 'react';

import { A } from '../components/elements/a';
import { CodeWrapper } from '../components/elements/code-wrapper';
import { Paragraph } from '../components/elements/paragraph';

export default function RevisitingOldGraphqlFriend(): JSX.Element {
  return (
    <>
      <Paragraph>
        Recently{' '}
        <A href="https://www.apollographql.com/blog/apollo-client/next-js/how-to-use-apollo-client-with-next-js-13/">
          Apollo released official support for NextJS 13 App Router
        </A>
        . Naturally I decided to give it a try with a new project. I was
        struggling to figure out how to properly handle new NextJS features and
        on-demand ISR. With RSC, now I can make calls to the database directly
        inside of component! Just one problem, you can&apos;t add revalidation
        tags to anything other than fetch. So if I make a mutation with a server
        action, I can&apos;t refetch data from another request. Basically, there
        is no easy &ldquo;revalidate query&rdquo; option like React Query and
        Apollo Client have. So if React Query doesn&apos;t yet support RSC, and
        Apollo Client does, it&apos;s time to bring in GraphQL.
      </Paragraph>

      <Paragraph>
        I have said before that{' '}
        <A href="/blog/for-the-scaling-js-playbook">
          I do not generate GraphQL API&apos;s
        </A>
        , I believe this is the wrong way to go. I tried initially to use
        Postgraphile and the results were from from what I wanted. This is no
        different than my experiences with every other GraphQL codegen tool.
        Which means, it&apos;s back to writing it by hand, the right way.
      </Paragraph>

      <Paragraph>
        So I revisited{' '}
        <A href="/blog/making-graphql-better">
          an old blog post talking about how I wrote integrations between Prisma
          and GraphQL for performance
        </A>
        . It took awhile to get up an running again. Fundamentally, it is
        impossible to automatically generate GraphQL schema from Prisma
        generated types as Prisma types are far more complex. Which means
        writing a lot of types by hand that look something like this.
      </Paragraph>

      <CodeWrapper language="graphql">
        {[
          'type Query {',
          '  learningLists(',
          '    where: LearningListWhereInput',
          '    orderBy: [LearningListOrderByWithRelationInput]',
          '    cursor: LearningListWhereUniqueInput',
          '    take: Int',
          '    skip: Int',
          '    distinct: [LearningListScalarFieldEnum]',
          '  ): [LearningList]',
          '}',
        ]}
      </CodeWrapper>

      <CodeWrapper language="graphql">
        {[
          'input PersonWhereInput {',
          '  AND: [PersonWhereInput]',
          '  OR: [PersonWhereInput]',
          '  NOT: [PersonWhereInput]',
          '  id: StringFilter',
          '  createdAt: DateTimeFilter',
          '  updatedAt: DateTimeFilter',
          '  username: StringFilter',
          '  profileImageUrl: StringFilter',
          '  clerkId: StringFilter',
          '  favoriteLists: LearningListListRelationFilter',
          '  learningList: LearningListListRelationFilter',
          '}',
        ]}
      </CodeWrapper>

      <Paragraph>
        But the results are phenomenal. GraphQL becomes a fully customizable ORM
        that allows you to properly establish relationships between different
        data sources. GraphQL as it was intended. However, there&apos;s one
        major downside. And that&apos;s getting Prisma and GraphQL to play well
        together.
      </Paragraph>

      <Paragraph>
        Prisma by itself is very performant.{' '}
        <A href="https://www.prisma.io/blog/prisma-and-serverless-73hbgKnZ6t">
          Recently 9x more performant
        </A>
        . It takes a lot work out of manually writing SQL queries where other
        ORM&apos;s essentially just act as string builders. But with GraphQL,
        when you&apos;re making multiple nested calls Prisma loses the context
        for everything it&apos;s doing and can&apos;t build the most efficient
        queries.{' '}
        <A href="https://www.prisma.io/docs/guides/performance-and-optimization/query-optimization-performance#solving-n1-in-graphql-with-findunique-and-prismas-dataloader">
          On top of the fact that Prisma does not batch many requests
        </A>
        .
      </Paragraph>

      <Paragraph>
        This is explained better in my original post on GraphQL. But the point
        here is that as I was working with it this time around, I found that the
        optimizations, especially around &ldquo;one-to-many&rdquo; queries,
        weren&apos;t being used. In many cases, the resolution was failing to
        find database relationships and falling back on N+1 queries.
      </Paragraph>

      <Paragraph>
        So after a day of debugging here are my three functions to optimize
        Prisma with GraphQL.
      </Paragraph>

      <Paragraph>
        The simple select to get rid of the dreaded `select *` and only select
        what was given to the GraphQL API.
      </Paragraph>

      <CodeWrapper>
        {[
          "import { PrismaSelect } from '@paljs/plugins'",
          "import type { GraphQLResolveInfo } from 'graphql'",
          '',
          'export const select = <Type>(info: GraphQLResolveInfo): Type => {',
          '  const { select } = new PrismaSelect(info).value as { select: Type };',
          '',
          '  return select;',
          '};',
        ]}
      </CodeWrapper>

      <Paragraph>
        Resolve arguments. This takes nested calls and turns them into new
        Prisma requests with relationships taken into account. The primary
        feature here is using relationship fields from a parent GraphQL query to
        make the next request, and yelling at you when you don&apos;t include it
        in that parent request select.
      </Paragraph>

      <CodeWrapper>
        {[
          "import type { Prisma } from '@prisma/client';",
          "import type { GraphQLResolveInfo } from 'graphql';",
          "import { uniq } from 'lodash';",
          '',
          "import { select } from './select';",
          '',
          'export type RelationInfo = {',
          '  parentCallingFunction?: string;',
          '  parentColumnName: string;',
          '  parentTableName: string;',
          '  relationColumnName: string;',
          '  relationIndexName: string;',
          '};',
          '',
          'export type ResolvedArguments<SelectType> = {',
          '  rejectOnNotFound?: Prisma.RejectOnNotFound;',
          '  select?: SelectType | null;',
          '  where?: Record<string, unknown>;',
          '};',
          '',
          'type ResolveParentParameters<ArgumentsType> = {',
          '  arguments_: ArgumentsType;',
          '  info: GraphQLResolveInfo;',
          '  parent?: Record<string, unknown>;',
          '  relationInfo?: RelationInfo[];',
          '};',
          '',
          'export const resolveArguments = <',
          '  ArgumentsType extends ResolvedArguments<SelectType>,',
          '  SelectType,',
          '>(',
          '  parameters: ResolveParentParameters<ArgumentsType>,',
          '  ignoreSelect = false,',
          '): ArgumentsType => {',
          '  const parentQuery: Record<string, unknown> | undefined = parameters.parent;',
          '',
          '  if (parameters.relationInfo && parameters.parent) {',
          '    const indexArray = parameters.relationInfo.map(info => {',
          "      if (typeof info.parentCallingFunction === 'string') {",
          // eslint-disable-next-line no-template-curly-in-string
          '        return `${info.parentTableName}${info.parentCallingFunction}`;',
          '      }',
          '',
          '      return info.parentTableName;',
          '    });',
          '',
          '    if (indexArray.length !== uniq(indexArray).length) {',
          '      const error = new Error(',
          "        'If there are more than one relationships for a table, specify a calling function.',",
          '      );',
          '      console.error(error.message);',
          '      throw error;',
          '    }',
          '  }',
          '',
          '  // Always add select argument, whether there is a relation or not.',
          '  let resolvedArguments = parameters.arguments_;',
          '  if (!ignoreSelect) {',
          '    resolvedArguments = {',
          '      ...resolvedArguments,',
          '      select: select<SelectType>(parameters.info),',
          '    };',
          '  }',
          '',
          '  const getResolvedArguments = (relation: RelationInfo): ArgumentsType => {',
          '    resolvedArguments = {',
          '      ...resolvedArguments,',
          '      ...parameters.arguments_,',
          '',
          '      where: {',
          '        [relation.relationColumnName]: parentQuery?.[relation.parentColumnName],',
          '        ...parameters.arguments_.where,',
          '      },',
          '    };',
          '',
          '    return resolvedArguments;',
          '  };',
          '',
          '  if (parameters.relationInfo && parameters.parent) {',
          '    for (const relation of parameters.relationInfo) {',
          '      if (parameters.info.parentType.name === relation.parentTableName) {',
          '        if (parentQuery?.[relation.parentColumnName] === undefined) {',
          '          throw new TypeError(',
          // eslint-disable-next-line no-template-curly-in-string
          '            `Must call ${relation.parentColumnName} from ${relation.parentTableName}`,',
          '          );',
          '        }',
          '',
          '        if (',
          "          typeof relation.parentCallingFunction === 'string' &&",
          '          parameters.info.fieldName === relation.parentCallingFunction',
          '        ) {',
          '          return getResolvedArguments(relation);',
          '        }',
          '',
          "        if (typeof relation.parentCallingFunction !== 'string') {",
          '          return getResolvedArguments(relation);',
          '        }',
          '      }',
          '    }',
          '  }',
          '',
          '  return resolvedArguments;',
          '};',
        ]}
      </CodeWrapper>

      <Paragraph>
        And the famous resolveFindMany which uses the Prisma fluent API and
        flips one-to-many requests around to allow for query batching.
      </Paragraph>

      <CodeWrapper>
        {[
          "import type { GraphQLResolveInfo } from 'graphql';",
          '',
          "import type { ApolloContext } from '../route';",
          "import type { RelationInfo, ResolvedArguments } from './resolve-arguments';",
          'type ResolveQueryParameters = {',
          '  context: ApolloContext;',
          '  info: GraphQLResolveInfo;',
          '  modelName: string;',
          '  parent: Record<string, unknown> | undefined;',
          '  relationInfo?: RelationInfo[];',
          '  resolvedArguments: ResolvedArguments<unknown>;',
          '};',
          '',
          'export const resolveFindMany = async <ModelType>(',
          '  parameters: ResolveQueryParameters,',
          '): Promise<ModelType[]> => {',
          '  const lowercaseModelName = `${parameters.modelName',
          '    .charAt(0)',
          // eslint-disable-next-line no-template-curly-in-string
          '    .toLowerCase()}${parameters.modelName.slice(1)}`;',
          '',
          '  if (parameters.relationInfo) {',
          '    for (const relation of parameters.relationInfo) {',
          '      if (relation.parentTableName === parameters.info.parentType.name) {',
          '        const lowercaseParentTableName = `${relation.parentTableName',
          '          .charAt(0)',
          // eslint-disable-next-line no-template-curly-in-string
          '          .toLowerCase()}${relation.parentTableName.slice(1)}`;',
          '        const model = parameters.context.dataSources.prisma[',
          '          lowercaseParentTableName',
          '        ] as {',
          '          findUnique: ({ where: any }) => typeof parameters.modelName;',
          '        };',
          '',
          '        const relationValue = parameters.parent[relation.parentColumnName];',
          '',
          '        if (relationValue === undefined) {',
          '          throw new TypeError(',
          // eslint-disable-next-line no-template-curly-in-string
          '            `Must call ${relation.parentColumnName} from ${relation.parentTableName}`,',
          '          );',
          '        }',
          '',
          '        // Try parentTable.findUnique().childTable()',
          '        // https://www.prisma.io/docs/guides/performance-and-optimization/query-optimization-performance#solving-the-n1-problem',
          '        try {',
          '          return model',
          '            .findUnique({',
          '              where: {',
          '                [relation.parentColumnName]: relationValue,',
          '              },',
          '            })',
          '            [relation.relationIndexName]({',
          '              select: parameters.resolvedArguments.select,',
          '            }) as ModelType[];',
          '          // If the parentTable -> childTable relationship has no index, fall back on original n + 1 issue.',
          '          // This creates a new SELECT for every parent result',
          '        } catch {',
          '          console.error(',
          // eslint-disable-next-line no-template-curly-in-string
          '            `Make sure ${relation.parentTableName} has a foreign key constraint on ${parameters.modelName}.`,',
          '          );',
          '',
          '          return parameters.context.dataSources.prisma[',
          '            lowercaseModelName',
          '          ].findMany({',
          '            ...parameters.resolvedArguments,',
          '          }) as ModelType[];',
          '        }',
          '      }',
          '    }',
          '  }',
          '',
          "  // If relationship isn't defined, use n + 1 efficiency",
          '  return parameters.context.dataSources.prisma[lowercaseModelName].findMany({',
          '    ...parameters.resolvedArguments,',
          '  }) as ModelType[];',
          '};',
        ]}
      </CodeWrapper>

      <Paragraph>
        Ultimately, I will be removing GraphQL from the project as well as
        avoiding NextJS server actions in favor of route handlers. The issue
        with Apollo Client here is that the server side client and client side
        client don&apos;t share a cache in the way that app router does with
        fetch. And Apollo&apos;s &ldquo;refetchQueries&rdquo; does nothing to
        invalidate the NextJS cache.
      </Paragraph>

      <Paragraph>
        The only way to achieve this is to put all queries and mutations in
        route handlers and make fetch requests. This means revalidation tags can
        be added to GET requests. And the only place you can use revalidateTag()
        is in POST requests. Until third parties have an answer to this, I will
        have to stick with creating endpoints.
      </Paragraph>
    </>
  );
}
