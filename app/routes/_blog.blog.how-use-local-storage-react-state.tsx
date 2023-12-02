import { A } from '../components/elements/a';
import { CodeWrapper } from '../components/elements/code-wrapper';
import { NumberedList } from '../components/elements/numbered-list';
import { Paragraph } from '../components/elements/paragraph';

export default function () {
  return (
    <>
      <Paragraph>
        Syncing local storage to useState seems to cause a lot of confusion for
        people new to React. With some of the questions I&apos;ve seen around
        it, it makes me think it&apos;s a fantastic interview question to see if
        someone really understands the basics of React hooks and lifecycles. To
        explain what I mean let&apos;s look at a very common mistake.
      </Paragraph>
      <Paragraph>
        This code will cause the value in local storage to reset to empty every
        time you refresh the page:
      </Paragraph>
      <CodeWrapper>
        {[
          'const [todos, setTodos] = useState<string[]>(() => {',
          "  console.info('Set Initial State');",
          '  return [];',
          '});',
          "const [newTodo, setNewTodo] = useState<string>('');",
          '',
          'useEffect(() => {',
          "  console.info('Get Initial Todos from Local Storage');",
          '',
          "  const localTodos = localStorage.getItem('todos');",
          '',
          '  if (localTodos !== null) {',
          '    const parsed = JSON.parse(localTodos) as string[];',
          '    setTodos(parsed);',
          '  }',
          '}, []);',
          '',
          'useEffect(() => {',
          "  console.info('Synchronize todos with local storage.');",
          "  localStorage.setItem('todos', JSON.stringify(todos));",
          '}, [todos]);',
          '',
          'const addTodo = (event: FormEvent): void => {',
          '  event.preventDefault();',
          '',
          '  setTodos(todos => {',
          '    return [...todos, newTodo];',
          '  });',
          '};',
        ]}
      </CodeWrapper>
      <Paragraph>
        If you look at console log you will see messages in this order:
      </Paragraph>
      <NumberedList
        items={[
          'Set Initial State',
          'Get Initial todos from local storage',
          'Synchronize todos with local storage',
          'Get initial todos from local storage',
          'Synchronize todos with local storage',
        ]}
      />
      <Paragraph>
        Yikes, bit of a mess right? No wonder we&apos;re not getting the results
        we want, what&apos;s going on here?
      </Paragraph>
      <Paragraph>
        The todos are initially set to an empty array. The first useEffect runs
        and sets todos in local storage to that initial empty value. The third
        useEffect is run and sets the todos to that same initial value again
        from useState (which is an empty array). This all triggers the third
        useEffect one more time which causes a rerender and we override those
        todos once more.
      </Paragraph>
      <Paragraph>
        ...All we want to do is synchronize state to local storage, how do we
        clean this up?
      </Paragraph>
      <Paragraph>
        The first thing to understand is that useState initial value is set on
        the initial render. This sounds obvious, but it&apos;s an underused
        tool. Often I see people always putting in a default empty value just to
        satisfy a type error, or just leave it empty.
      </Paragraph>
      <Paragraph>
        <span className="font-bold">
          useState&apos;s initial value is going to reset on every render
          whether you use an effect or not. So using an effect to achieve that
          goal is just creating a redundancy and running code twice.
        </span>{' '}
        So we can get rid of the first useEffect and move the logic to useState.
        I&apos;m using NextJS in this example so I need to check if window is
        defined.
      </Paragraph>
      <CodeWrapper>
        {[
          'const [todos, setTodos] = useState<string[]>(() => {',
          "  if (typeof window === 'undefined') {",
          '    return [];',
          '  }',
          '',
          "  console.info('Set Initial State');",
          "  const localTodos = localStorage.getItem('todos');",
          '  if (localTodos === null) {',
          '    return [];',
          '  }',
          '',
          '  return JSON.parse(localTodos) as string[];',
          '});',
          "const [newTodo, setNewTodo] = useState<string>('');",
          '',
          'useEffect(() => {',
          "  console.info('Synchronize todos with local storage.');",
          "  localStorage.setItem('todos', JSON.stringify(todos));",
          '}, [todos]);',
          '',
          'const addTodo = (event: FormEvent): void => {',
          '  event.preventDefault();',
          '',
          '  setTodos(todos => {',
          '    return [...todos, newTodo];',
          '  });',
          '};',
        ]}
      </CodeWrapper>
      <Paragraph>
        Now our todos are properly synchronizing with state, if we refresh the
        page, the values are still there. But we still have a problem. This is
        what our console logs look like now:
      </Paragraph>
      <NumberedList
        items={['Set initial state', 'Synchronize todos with local storage']}
      />
      <Paragraph>
        Our last useEffect is running on initial render when really we
        don&apos;t want it to. The flow is something like this:
      </Paragraph>
      <NumberedList
        items={[
          'Get todos from local storage',
          'Synchronize todos to local storage',
        ]}
      />
      <Paragraph>
        <span className="font-bold">
          Why do we need to synchronize immediately after we get todos the from
          local storage?
        </span>{' '}
        Instead we can get rid of the useEffect altogether and only update after
        a todo is added.
      </Paragraph>
      <CodeWrapper>
        {[
          'const [todos, setTodos] = useState<string[]>(() => {',
          "  if (typeof window === 'undefined') {",
          '    return [];',
          '  }',
          '',
          "  console.info('Set Initial State');",
          "  const localTodos = localStorage.getItem('todos');",
          '  if (localTodos === null) {',
          '    return [];',
          '  }',
          '',
          '  return JSON.parse(localTodos) as string[];',
          '});',
          "const [newTodo, setNewTodo] = useState<string>('');",
          '',
          'const addTodo = (event: FormEvent): void => {',
          '  event.preventDefault();',
          '',
          "  console.info('Synchronize todos with local storage.');",
          "  localStorage.setItem('todos', JSON.stringify(todos));",
          '  setTodos(todos => {',
          '    return [...todos, newTodo];',
          '  });',
          '};\n',
        ]}
      </CodeWrapper>
      <Paragraph>
        Now we are properly synchronizing state of local storage and we should
        only have one console log on initial render:
      </Paragraph>
      <NumberedList items={['Set initial state']} />
      <Paragraph>
        And as a bonus we&apos;ve gotten rid of all useEffects. Which is always
        a win. By the React documentation, useEffect is an escape hatch, and you
        shouldn&apos;t use it if you don&apos;t absolutely need to. React is
        already reactive without the help of effects.{' '}
        <span className="font-bold">
          React is driven by changes in props and events, not by side effects.
        </span>
      </Paragraph>
      <Paragraph>
        To get a better understanding of this I highly{' '}
        <A href="https://beta.reactjs.org/learn/you-might-not-need-an-effect">
          recommend this page from the docs
        </A>
        . But if you&apos;re working with React, you really should read every
        page on this site.
      </Paragraph>
    </>
  );
}
