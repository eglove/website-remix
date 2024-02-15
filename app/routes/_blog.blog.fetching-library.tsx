import { A } from '../components/elements/a';
import { CodeWrapper } from '../components/elements/code-wrapper';
import { Paragraph } from '../components/elements/paragraph';
import { SanityImage } from '../components/elements/sanity-image';

export default function () {
  return (
    <>
      <Paragraph>
        I believe it&apos;s a good idea to centralize API calls for a frontend.
        I don&apos;t believe there are a lot of good ways to do this. If you
        Google the issue, what you end up with is advice to write `get()`,
        `post()`, `put()` functions that don&apos;t do much more than set an
        HTTP method. Maybe they&apos;ll use a BASE_URL constant and, at best,
        spread HTTP request options into fetch. It always seems like a good idea
        until you&apos;re looking at it a week later wondering what the point
        is. I could write `fetch()` in just as many keystrokes.
      </Paragraph>
      <Paragraph>
        While taking a Udemy course I was watching the instructor type out one
        of these HTTP method abstractions and started to write my own. What
        I&apos;ve done traditionally is create an object that maps a bunch of
        functions which all return Request objects. Like this:
      </Paragraph>
      <CodeWrapper>
        {[
          "const BASE_URL = 'https://jsonplaceholder.typicode.com'",
          '',
          'const api = {',
          '  getTodos(id: string) {',
          // eslint-disable-next-line no-template-curly-in-string
          '    return new Request(`${BASE_URL}/todos/${id}`);',
          '  }',
          '}',
        ]}
      </CodeWrapper>
      <Paragraph>
        This makes it very easy to define a Request, call it later with fetch,
        and keep a level of customization when it&apos;s called.
      </Paragraph>
      <CodeWrapper>
        {[
          'const response = await fetch(api.getTodos(1));',
          '',
          'const data = await response.json();',
        ]}
      </CodeWrapper>
      <Paragraph>
        I think this works very well. You can define endpoints, add default
        request options, and override them when they&apos;re called. It works
        especially well when making use of the browsers Cache API because that
        cache uses Request objects as keys.
      </Paragraph>
      <Paragraph>
        But then I found myself using URL and URLSearchParams objects quite a
        bit. Typing out raw strings makes me nervous. Both of these objects
        provide a decent level of validation, and make things just a little bit
        easier than template strings. An example use would be this:
      </Paragraph>
      <CodeWrapper>
        {[
          "const BASE_URL = 'https://jsonplaceholder.typicode.com'",
          '',
          "const url = new URL('todos/1', BASE_URL);",
          "url.searchParams.append('orderBy', 'name');",
          'console.log(url.toString()); // https://jsonplaceholder.typicode.com/todos/1?orderBy=name',
          '',
          'const request = new Request(url, { ...fetchOptions });',
          'await fetch(request)',
        ]}
      </CodeWrapper>
      <Paragraph>
        This is a pretty powerful set of tools. So yesterday, while
        procrastinating on this Udemy course with it&apos;s API I don&apos;t
        like, I started building a library that could take care of a lot of this
        for me. There&apos;s a lot I want to abstract here.
        searchParams.append() doesn&apos;t accept undefined values, it will
        always stringify. The library needs to ignore those so my code
        doesn&apos;t have to. I still want to make use of Cache API. I need to
        account for dynamic paths which can be set at any time. Whether on the
        global api object, or in the fetch itself. This is what I&apos;ve come
        up with so far:
      </Paragraph>
      <CodeWrapper>
        {[
          'import { Api } from "@ethang/fetch/api";',
          '',
          'export const api = new Api({',
          "  baseUrl: 'https://jsonplaceholder.typicode.com',",
          '  requests: {',
          '    getTodos: {',
          "      path: 'todos',",
          '      zodSchema: todosSchema,',
          '    },',
          '    getTodo: {',
          "      path: 'todos/:id',",
          '      zodSchema: todoSchema,',
          '    },',
          '    createTodo: {',
          "      path: 'todos',",
          '      requestOptions: {',
          "        method: 'POST'",
          '      },',
          '      zodSchema: todoSchema,',
          '    },',
          '    updateTodo: {',
          "      path: 'todos/:id',",
          '      requestOptions: {',
          "        method: 'PUT'",
          '      },',
          '      zodSchema: todoSchema,',
          '    },',
          '    deleteTodo: {',
          "      path: 'todos/:id',",
          '      requestOptions: {',
          "        method: 'DELETE'",
          '      },',
          '      zodSchema: todoSchema,',
          '    },',
          '  },',
          '});',
        ]}
      </CodeWrapper>
      <Paragraph>
        Now, I know what it looks like, it looks like I&apos;ve just abtracted
        the HTTP method and threw in a Zod schema. But did you notice you
        don&apos;t have to worry about whether there&apos;s a slash on the end
        of the baseUrl? Pretty cool right? But the flexibility comes in the
        fetch.
      </Paragraph>
      <CodeWrapper>
        {[
          "const { data, errors, isSuccess } = await api.fetch('getTodos', {",
          '  searchParams: {',
          "    filterBy: 'name'",
          "    orderBy: 'date'",
          '  }',
          '}',
          '// https://jsonplaceholder.typicode.com/todos?filterBy=name&orderBy=date',
        ]}
      </CodeWrapper>
      <CodeWrapper>
        {[
          "const { data, errors, isSuccess } = await api.fetch('getTodo', {",
          '  pathVariables: {',
          '    id: 1',
          '  }',
          '}',
          '// https://jsonplaceholder.typicode.com/todos/1',
        ]}
      </CodeWrapper>
      <Paragraph>
        Totally type safe too! The returned data object will match to the output
        type of the the Zod schema given to the request. When you call
        `api.fetch(&apos;`, your IDE will give you hints with available strings
        matching to your methods.
      </Paragraph>
      <Paragraph>
        Just about everything can be overridden when you get to a lower level.
        For example, what if as a default you want all API requests to have a 60
        second cache, but for one in particular you want it to have a 10 second
        cache, except in one spot where you want it to have no cache? No
        worries.
      </Paragraph>
      <CodeWrapper>
        {[
          'import { Api } from "@ethang/fetch/api";',
          '',
          'export const api = new Api({',
          "  baseUrl: 'https://jsonplaceholder.typicode.com',",
          '  cacheInterval: 30',
          '  requests: {',
          '    getTodos: {',
          "      path: 'todos',",
          '      cacheInterval: 10',
          '      zodSchema: todosSchema,',
          '    },',
          '  },',
          '});',
          '',
          "api.fetch('getTodos', {)",
          '  cacheInterval: 0',
          '}',
        ]}
      </CodeWrapper>
      <Paragraph>
        Of course, it&apos;s worth noting that because this depends on Cache
        API, it&apos;s subject to Cache API rules. There is a limited amount of
        storage available, it&apos;s{' '}
        <A href="/blog/web-storage-is-cool">a lot</A>. And you do need to be
        careful about garbage collection. Because this is a permanent storage on
        the users machine that can take up to 80% of their hard disk space.
        Typically, sticking to in memory data is perfectly fine. I&apos;m far
        more likely to just not use the caching option and depend on React Query
        instead.
      </Paragraph>
      <Paragraph>
        Regardless, I find this to be the most helpful way to centralize an API.
        There is a lot to work on still. What if I don&apos;t want
        response.json(). That was one of the reasons my original method returned
        Request objects to begin with. I may restructure and rewrite this entire
        thing. But so far, it feels comfortable and hits on every note I wanted
        it to. And I kinda&apos; like that.
      </Paragraph>
      <Paragraph>
        <A href="https://github.com/eglove/fetch" isExternal>
          github.com/eglove/fetch
        </A>
      </Paragraph>
      <SanityImage
        alt="Code for @ethang/fetch"
        height={593}
        src="https://cdn.sanity.io/images/drccvtog/production/78249c079dcae9694ce7743bf519d387971b44a5-684x593.png"
        width={684}
      />
    </>
  );
}
