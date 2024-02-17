import { A } from '../components/elements/a';
import { CodeWrapper } from '../components/elements/code-wrapper';
import { Paragraph } from '../components/elements/paragraph';

export default function () {
  return (
    <>
      <Paragraph>
        I don&apos;t like try/catch blocks. The syntax is ugly, they make guard
        clauses more difficult than they need to be. Structurally they often get
        in the way and produce confusing code. For any given function I would
        rather read it procedurally.
      </Paragraph>

      <Paragraph>
        Let&apos;s take for example an endpoint that requires us to search for
        some related data before making an update. We first need to parse a
        request body, then find the item, then update it. All three of these
        actions may or may not throw an error. The code might look something
        like this.
      </Paragraph>

      <CodeWrapper language="typescript">
        {[
          'let parsed: ParsedType;',
          '',
          'try {',
          '  parsed = parse(request.body);',
          '} catch {',
          "  return 'Failed to parse'",
          '}',
          '',
          'let item: Item',
          '',
          'try {',
          '  item = await db.findItem({where: {id: parsed.id}});',
          '} catch {',
          "  return 'Item not found'",
          '}',
          '',
          'try {',
          '  return db.updateRelatedItem(...)',
          '} catch {',
          "  return 'Failed to update'",
          '}',
        ]}
      </CodeWrapper>

      <Paragraph>
        A very simple example that can quickly get out of control the longer the
        logic gets. Zod already has built in functional error handling, so we
        can parse the request body without try/catch already. This is already a
        small improvement to me. We handle the error first, via a guard clause
        rather than catching it. For our db queries, there&apos;s no such
        feature. That&apos;s why I wrote a tryCatch utility function. The result
        of which gives us this.
      </Paragraph>

      <CodeWrapper language="typescript">
        {[
          'const parsed = bodySchema.safeParse(request.body)',
          '',
          'if (!parsed.success) {',
          "  return 'Failed to parse'",
          '}',
          '',
          'const { data: body } = parsed',
          '',
          'const findResults = await tryCatchAsync(() => {',
          '  return db.findItem({where: {id: body.id}})',
          '})',
          '',
          'if (!findResults.isSuccess) {',
          "  return 'Item not found'",
          '}',
          '',
          'const { data: item } = findResults',
          '',
          'const results = await tryCatchAsync(() => {',
          '  return db.updateRelatedItem(...)',
          '})',
          '',
          'if (!results.isSuccess) {',
          "  return 'Failed to update'",
          '}',
          '',
          'return results.data',
        ]}
      </CodeWrapper>

      <Paragraph>
        And of course the code for this utility function with both a sync and
        async version{' '}
        <A
          isExternal
          href="https://github.com/eglove/util/blob/3a78991ca4e56ca4c765cfb5d82a436257917789/src/data.ts#L23"
        >
          can be found in my util library
        </A>
        .
      </Paragraph>

      <CodeWrapper language="typescript">
        {[
          'type TryCatchResult<Type> =',
          '  | { data: Type; isSuccess: true }',
          '  | { error: unknown; isSuccess: false };',
          '',
          'export function tryCatch<T extends () => ReturnType<T>>(',
          '  function_: T,',
          '): TryCatchResult<ReturnType<T>> {',
          '  try {',
          '    return { data: function_(), isSuccess: true };',
          '  } catch (error) {',
          '    return { error, isSuccess: false };',
          '  }',
          '}',
          '',
          'export async function tryCatchAsync<',
          '  T extends () => Promise<Awaited<ReturnType<T>>>,',
          '>(function_: T): Promise<TryCatchResult<Awaited<ReturnType<T>>>> {',
          '  try {',
          '    const data = await function_();',
          '    return { data, isSuccess: true };',
          '  } catch (error) {',
          '    return { error, isSuccess: false };',
          '  }',
          '}',
        ]}
      </CodeWrapper>
    </>
  );
}
