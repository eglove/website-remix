/* eslint-disable no-template-curly-in-string */
import { A } from '../components/elements/a';
import { CodeWrapper } from '../components/elements/code-wrapper';
import { Heading } from '../components/elements/heading';
import { Paragraph } from '../components/elements/paragraph';

export default function () {
  return (
    <>
      <Paragraph>
        Video meetings, chat, phone calls, voicemail, calendar, and filesharing.
        This is roughly the app I spent the last couple of months rewriting from
        the ground up. The original project started before me with Twilio&apos;s{' '}
        <A href="https://github.com/twilio/twilio-video-app-react">
          example React app
        </A>{' '}
        and it seems every change from there was just a litany of simple logic
        piled on top to force things to work. The architecture didn&apos;t match
        what we were trying to do. The Material UI implementation was putting
        custom layouts into a stranglehold. And don&apos;t get me started on
        conflicting CORS rules, and routing between an express node server and
        react-router.
      </Paragraph>
      <Paragraph>
        I had the chance to take what was there and pull it into a new project.
        I removed Material UI completely (vanilla CSS is more scalable) and
        brought in Next.js as a framework.
      </Paragraph>
      <Paragraph>
        I thought I would do my best to share some lessons learned during this
        process, what I did to improve things and what I would do differently in
        the future.
      </Paragraph>
      <Heading variant="h2">React is Not a Framework</Heading>
      <Paragraph>
        React is a UI library. Not a framework. It&apos;s very good at what it
        does. Hooks are brilliant. But I don&apos;t believe it&apos;s realistic
        to build the frontend for a large complex app with only React.
        Especially when you&apos;re trying to do a lot of live or dynamic data
        with many integrations. (We&apos;ll get back to handling this stuff
        later.)
      </Paragraph>
      <Paragraph>That&apos;s where Next.js comes in.</Paragraph>
      <Paragraph>
        Next.js is a React framework. Complete with its own server to build an
        API and handle server-side rendering. As well as a brilliant Image
        component (that seems to be using web assembly these days),
        directory-based routing, data fetching tools and more. I would even
        argue that Next is a full-stack framework, albeit a small one.
      </Paragraph>
      <Paragraph>
        If you&apos;re working with a well-written API that follows proper REST
        conventions, or better yet a GraphQL API and don&apos;t have a lot of
        client-side rendering, you can survive with pure React. But honestly,
        why bother with react-router and the{' '}
        <A href="https://css-tricks.com/images-are-hard/">
          headache of image tags
        </A>
        ? If you&apos;re starting a new React project I recommend always going
        Next.js.
      </Paragraph>
      <Heading variant="h2">Use Eslint</Heading>
      <Paragraph>
        I created my own lint config for Next and TypeScript. It basically just
        extends... well... a lot of stuff. Critics may note that there&apos;s a
        lot of stuff overwriting a lot of stuff. And that is a valid criticism.
        But to me, the more hardcore the eslint config, the better. And with
        some tweaking to order and a few custom rules, this is working out for
        me.
      </Paragraph>
      <Paragraph>
        Eslint can catch a lot of issues such as missing useEffect dependencies
        (note the useEffect article I link below), accessibility issues, unused
        imports, inefficient algorithms, etc. Hell, you can even use it to sort
        imports and alphabetically order object properties.
      </Paragraph>
      <Paragraph>
        At a minimum, I would highly recommend the{' '}
        <A href="https://nextjs.org/docs/basic-features/eslint">next configs</A>
        , prettier, jsx-a11y, react-hooks, and typescript-eslint. But don&apos;t
        be afraid to get deeper and continuously tweak. Even create your own
        config that you can share between projects.
      </Paragraph>
      <Heading variant="h2">Use TypeScript</Heading>
      <Paragraph>
        I can&apos;t tell you how many times TypeScript has saved my ass or made
        life easier. I would hate to write JavaScript without it. If you
        haven&apos;t gotten into TS yet, or you&apos;re still thinking,
        “It&apos;s extra typing for no benefit.” Go learn TypeScript right now.
        I recommend{' '}
        <A href="https://academy.zerotomastery.io/p/learn-typescript">
          Stephen Grider&apos;s course
        </A>
        .
      </Paragraph>
      <Paragraph>
        With TypeScript, I created interfaces for any data calls to a REST API I
        made, got more comfortable with generics to make code more reusable and
        easier to read, created a pretty cool form generator using OOP style
        classes, and best of all, my Intellisense is totally superpowered.
      </Paragraph>
      <CodeWrapper>
        {[
          'export const getFromLocalStorage = <Type>(',
          '  key: string,',
          '  fallbackValue?: Type',
          '): Type | undefined => {',
          '  const item = localStorage.getItem(key);',
          '  let returnValue = item as Type | null;',
          '',
          '  if (item) {',
          '    try {',
          '      returnValue = JSON.parse(item) as Type;',
          '    } catch {',
          '      returnValue = item as unknown as Type;',
          '    }',
          '  } else if (fallbackValue) {',
          "    if (typeof fallbackValue === 'string') {",
          '      localStorage.setItem(key, fallbackValue);',
          '    } else {',
          '      localStorage.setItem(key, JSON.stringify(fallbackValue));',
          '    }',
          '',
          '    return fallbackValue;',
          '  }',
          '',
          '  if (returnValue) {',
          '    return returnValue;',
          '  }',
          '',
          '  return undefined;',
          '};',
        ]}
      </CodeWrapper>
      <CodeWrapper>
        {[
          "import { toCapitalizedWords } from '../../util/string';",
          '',
          'export enum InputTypes {',
          "  button = 'button',",
          "  checkbox = 'checkbox',",
          "  color = 'color',",
          "  date = 'date',",
          "  datetimeLocal = 'datetime-local',",
          "  email = 'email',",
          "  file = 'file',",
          "  hidden = 'hidden',",
          "  image = 'image',",
          "  month = 'month',",
          "  number = 'number',",
          "  password = 'password',",
          "  radio = 'radio',",
          "  range = 'range',",
          "  reset = 'reset',",
          "  search = 'search',",
          "  select = 'select',",
          "  submit = 'submit',",
          "  tel = 'tel',",
          "  text = 'text',",
          "  textarea = 'textarea',",
          "  time = 'time',",
          "  url = 'url',",
          "  week = 'week',",
          '}',
          '',
          'export enum AutoComplete {',
          "  additonalName = 'additional-name',",
          "  addressLevel1 = 'address-level1',",
          "  addressLevel2 = 'address-level2',",
          "  addressLevel3 = 'address-level3',",
          "  addressLevel4 = 'address-level4',",
          "  addressLine1 = 'address-line1',",
          "  addressLine2 = 'address-line2',",
          "  addressLine3 = 'address-line3',",
          "  bday = 'bday',",
          "  bdayDay = 'bday-day',",
          "  bdayMonth = 'bday-month',",
          "  bdayYear = 'bday-year',",
          "  ccAdditionalName = 'cc-additional-name',",
          "  ccExp = 'cc-exp',",
          "  ccExpMonth = 'cc-exp-month',",
          "  ccExpYear = 'cc-exp-year',",
          "  ccFamilyName = 'cc-family-name',",
          "  ccGivenName = 'cc-given-name',",
          "  ccName = 'cc-name',",
          "  ccNumber = 'cc-number',",
          "  ccType = 'cc-type',",
          "  cccsc = 'cc-csc',",
          "  country = 'country',",
          "  countryName = 'country-name',",
          "  currentPassword = 'current-password',",
          "  email = 'email',",
          "  familyName = 'family-name',",
          "  givenName = 'given-name',",
          "  honorificPrefix = 'honorific-prefix',",
          "  honorificSuffix = 'honorific-suffix',",
          "  impp = 'impp',",
          "  language = 'language',",
          "  name = 'name',",
          "  newPassword = 'new-password',",
          "  nickname = 'nickname',",
          "  off = 'off',",
          "  on = 'on',",
          "  oneTimeCode = 'one-time-code',",
          "  organization = 'organization',",
          "  organizationTitle = 'organization-title',",
          "  photo = 'photo',",
          "  postalCode = 'postal-code',",
          "  sex = 'sex',",
          "  streetAddress = 'street-address',",
          "  tel = 'tel',",
          "  telAreaCode = 'tel-area-code',",
          "  telCountryCode = 'tel-country-code',",
          "  telExtension = 'tel-extension',",
          "  telLocal = 'tel-local',",
          "  telNational = 'tel-national',",
          "  transactionAmount = 'transaction-amount',",
          "  transactionCurrency = 'transaction-currency',",
          "  url = 'url',",
          "  username = 'username',",
          '}',
          '',
          'type ConfigObject = {',
          '  autocomplete?: AutoComplete;',
          '  hideLabel?: boolean;',
          '  initialValue?: string | number;',
          '  placeHolder?: string;',
          '  required?: boolean;',
          '  selectOptions?: string[];',
          '  type?: InputTypes;',
          '  value?: string;',
          '};',
          '',
          'export class FormInput {',
          '  private _name: string;',
          '',
          '  private _displayName: string;',
          '',
          '  private _required?: boolean;',
          '',
          '  private _value?: string;',
          '',
          '  private _type?: InputTypes;',
          '',
          '  private _label?: string;',
          '',
          '  private _autocomplete?: AutoComplete;',
          '',
          '  private _id?: string;',
          '',
          '  private _placeHolder?: string;',
          '',
          '  private _initialValue?: string | number;',
          '',
          '  private _selectOptions?: string[];',
          '',
          '  private _hideLabel?: boolean;',
          '',
          '  constructor(name: string, configObject: ConfigObject = {}) {',
          '    this._name = name;',
          '    this._displayName = toCapitalizedWords(name);',
          '    this._label = name;',
          '    this._id = name;',
          '    this._type = configObject.type;',
          '    this._value = configObject.value;',
          '    this._required = configObject.required;',
          '    this._placeHolder = configObject.placeHolder;',
          '    this._initialValue = configObject.initialValue;',
          '    this._selectOptions = configObject.selectOptions;',
          '    this._hideLabel = configObject.hideLabel;',
          '  }',
          '',
          '  get type(): InputTypes {',
          '    if (undefined !== this._type) {',
          '      return this._type;',
          '    }',
          '',
          '    return InputTypes.text;',
          '  }',
          '',
          '  set type(value: InputTypes) {',
          '    this._type = value;',
          '  }',
          '',
          '  get displayName(): string {',
          '    return this._displayName;',
          '  }',
          '',
          '  set displayName(value: string) {',
          '    this._displayName = value;',
          '  }',
          '',
          '  get value(): string {',
          '    if (undefined !== this._value) {',
          '      return this._value;',
          '    }',
          '',
          "    return '';",
          '  }',
          '',
          '  set value(value: string) {',
          '    this._value = value;',
          '  }',
          '',
          '  get name(): string {',
          '    return this._name;',
          '  }',
          '',
          '  set name(value: string) {',
          '    this._name = value;',
          '  }',
          '',
          '  get label(): string {',
          '    if (undefined !== this._label) {',
          '      return this._label;',
          '    }',
          '',
          "    return '';",
          '  }',
          '',
          '  set label(value: string) {',
          '    this._label = toCapitalizedWords(value);',
          '  }',
          '',
          '  get id(): string {',
          '    if (undefined !== this._id) {',
          '      return this._id;',
          '    }',
          '',
          "    return '';",
          '  }',
          '',
          '  set id(value: string) {',
          '    this._id = value;',
          '  }',
          '',
          '  get autocomplete(): AutoComplete {',
          '    if (undefined !== this._autocomplete) {',
          '      return this._autocomplete;',
          '    }',
          '',
          '    return AutoComplete.on;',
          '  }',
          '',
          '  set autocomplete(value: AutoComplete) {',
          '    this._autocomplete = value;',
          '  }',
          '',
          '  get required(): boolean {',
          '    if (undefined !== this._required) {',
          '      return this._required;',
          '    }',
          '',
          '    return false;',
          '  }',
          '',
          '  set required(value: boolean) {',
          '    this._required = value;',
          '  }',
          '',
          '  get placeHolder(): string {',
          '    if (undefined !== this._placeHolder) {',
          '      return this._placeHolder;',
          '    }',
          '',
          "    return '';",
          '  }',
          '',
          '  set placeHolder(value: string) {',
          '    this._placeHolder = value;',
          '  }',
          '',
          '  get initialValue(): string | number {',
          '    if (undefined !== this._initialValue) {',
          '      return this._initialValue;',
          '    }',
          '',
          "    return '';",
          '  }',
          '',
          '  set initialValue(value: string | number) {',
          '    this._initialValue = value;',
          '  }',
          '',
          '  get selectOptions(): string[] {',
          '    if (undefined !== this._selectOptions) {',
          '      return this._selectOptions;',
          '    }',
          '',
          '    return [];',
          '  }',
          '',
          '  set selectOptions(value: string[]) {',
          '    this._selectOptions = value;',
          '  }',
          '',
          '  get hideLabel(): boolean {',
          '    if (undefined !== this._hideLabel) {',
          '      return this._hideLabel;',
          '    }',
          '',
          '    return false;',
          '  }',
          '',
          '  set hideLabel(value: boolean) {',
          '    this._hideLabel = value;',
          '  }',
          '}',
        ]}
      </CodeWrapper>
      <CodeWrapper>
        {[
          "import { ChangeEvent, SyntheticEvent } from 'react';",
          '',
          "import styles from './form.module.css';",
          "import { FormInput, InputTypes } from './form-input';",
          'interface FormProperties {',
          '  cancelFunction?: () => any;',
          '  cancelText?: string;',
          '  clearFormAfterSubmit?: boolean;',
          '  disabled?: boolean;',
          '  hideButton?: boolean;',
          '  inputObjects: FormInput[];',
          '  inputsState: Record<string, string | number | undefined>;',
          '  onChangeFunc?: (event: ChangeEvent) => any;',
          '  pattern?: string;',
          '  postSubmitFunc?: (...arguments_: any) => any;',
          '  setInputsState: any;',
          '  submitText?: string;',
          '}',
          '',
          'export const Form = ({',
          '  hideButton = false,',
          '  inputObjects,',
          '  inputsState,',
          '  setInputsState,',
          '  postSubmitFunc,',
          '  clearFormAfterSubmit = true,',
          '  onChangeFunc,',
          "  submitText = 'Submit',",
          "  cancelText = 'Cancel',",
          '  cancelFunction,',
          '  disabled = false,',
          '  pattern,',
          '}: FormProperties): JSX.Element => {',
          '  const handleChange = (event: ChangeEvent): void => {',
          '    // @ts-expect-error Allow variable typing for this function',
          '    let { value, name, type, files } = event.target;',
          '',
          "    if (type === 'number') {",
          '      value = Number.parseInt(value, 10);',
          '    }',
          '',
          "    if (type === 'file') {",
          '      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment',
          '      [value] = files;',
          '    }',
          '',
          '    // eslint-disable-next-line @typescript-eslint/no-unsafe-call',
          '    setInputsState({',
          '      ...inputsState,',
          '      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment',
          '      [name]: value,',
          '    });',
          '',
          '    if (onChangeFunc) {',
          '      onChangeFunc(event);',
          '    }',
          '  };',
          '',
          '  const handleSubmit = async (event: {',
          '    preventDefault: () => void;',
          '  }): Promise<void> => {',
          '    event.preventDefault();',
          '',
          '    if (postSubmitFunc) {',
          '      const blankState = Object.fromEntries(',
          "        Object.entries(inputsState).map(([key]) => [key, ''])",
          '      );',
          '',
          '      if (clearFormAfterSubmit) {',
          '        // eslint-disable-next-line @typescript-eslint/no-unsafe-call',
          '        setInputsState(blankState);',
          '      }',
          '',
          '      postSubmitFunc();',
          '    }',
          '  };',
          '',
          '  const getInputElement = (formInput: FormInput): JSX.Element => {',
          '    switch (formInput.type) {',
          '      case InputTypes.textarea: {',
          '        return (',
          '          <textarea',
          '            required={formInput.required}',
          '            id={formInput.id}',
          '            name={formInput.name}',
          '            placeholder={formInput.placeHolder}',
          '            value={inputsState[formInput.name]}',
          '            cols={30}',
          '            rows={5}',
          '            onChange={handleChange}',
          '          />',
          '        );',
          '      }',
          '',
          '      case InputTypes.select: {',
          '        return (',
          '          // This rule is deprecated.',
          '          // eslint-disable-next-line jsx-a11y/no-onchange',
          '          <select',
          '            name={formInput.name}',
          '            id={formInput.name}',
          '            value={inputsState[formInput.name]}',
          '            onChange={handleChange}',
          '          >',
          '            {formInput.selectOptions.map(selectOption => {',
          '              return (',
          '                <option key={selectOption.valueOf()}>{selectOption}</option>',
          '              );',
          '            })}',
          '          </select>',
          '        );',
          '      }',
          '',
          '      default: {',
          '        return (',
          '          <input',
          '            required={formInput.required}',
          '            type={formInput.type}',
          '            id={formInput.id}',
          '            name={formInput.name}',
          '            placeholder={formInput.placeHolder}',
          '            autoComplete={formInput.autocomplete}',
          '            value={inputsState[formInput.name]}',
          '            pattern={pattern}',
          '            onClick={(event: SyntheticEvent): void => {',
          '              event.stopPropagation();',
          '            }}',
          '            onChange={handleChange}',
          '          />',
          '        );',
          '      }',
          '    }',
          '  };',
          '',
          '  return (',
          '    <form className={styles.Form} method="POST" onSubmit={handleSubmit}>',
          '      <fieldset disabled={disabled}>',
          '        {inputObjects.map((formInput: FormInput) => (',
          '          <div key={formInput.id}>',
          '            {formInput.hideLabel ? (',
          '              getInputElement(formInput)',
          '            ) : (',
          '              <label htmlFor={formInput.label}>',
          '                {formInput.displayName}:',
          '                <br />',
          '                {getInputElement(formInput)}',
          '              </label>',
          '            )}',
          '            <div className={styles.LabelLineBreak} />',
          '          </div>',
          '        ))}',
          '        {postSubmitFunc && !hideButton && (',
          '          <div className={styles.ButtonContainer}>',
          '            <button className={styles.SubmitButton} type="submit">',
          '              {submitText}',
          '            </button>',
          '            {cancelFunction && (',
          '              <button',
          '                className={styles.CancelButton}',
          '                type="button"',
          '                onClick={cancelFunction}',
          '              >',
          '                {cancelText}',
          '              </button>',
          '            )}',
          '          </div>',
          '        )}',
          '      </fieldset>',
          '    </form>',
          '  );',
          '};',
        ]}
      </CodeWrapper>
      <Heading variant="h2">Don&apos;t Abstract Fetch</Heading>
      <Paragraph>
        I&apos;m working with a lot of APIs. Twilio, Rocket Chat, FileCloud,
        Outlook, and of course our own. Using REST, WebSockets, and WebRTC.
        I&apos;m doing server-side calls, client-side calls, polling, cache
        invalidation, and listening to websockets. Fetching has become my
        biggest pain point on this project.
      </Paragraph>
      <Paragraph>
        For get requests I use <A href="https://swr.vercel.app/">useSWR</A> and
        for posts I wrote a custom usePost hook (as useSWR isn&apos;t really
        intended for pushing data).
      </Paragraph>
      <Paragraph>
        It&apos;s tempting to create a file that exports a bunch of fetch
        requests to any endpoint so you can use them anywhere in the
        application. But this doesn&apos;t sit right with me. Do you export
        promises? Or do you create hooks with state and useEffect? How do you
        call those hooks conditionally? How do you handle promises in non-async
        functions? What happens when you got a lot of requests for a complex
        page with many integrations?
      </Paragraph>
      <Paragraph>
        useSwr is good at handling conditional calls. If the URL is null, it
        won&apos;t do anything. But if that changes, it will. A little something
        like the below will make sure the call is not made until userId is
        available. (For example, if you&apos;re pulling it from state.) You can
        expand this logic however you like.
      </Paragraph>
      <CodeWrapper>
        {['const {data} = useSwr(userId ? `domain.com/${userId}` : null)']}
      </CodeWrapper>
      <Paragraph>
        My usePost hook works the same way, except instead of running as soon as
        url is available, it exports an execute function.
      </Paragraph>
      <CodeWrapper>
        {[
          "import Error from 'next/error';",
          "import { useCallback, useEffect, useRef, useState } from 'react';",
          "import { animationInterval } from '../../util/time';",
          '',
          'interface UsePostProperties {',
          '  body?: BodyInit;',
          '  headers?: HeadersInit;',
          '  pollInterval?: number;',
          "  returnType?: 'json' | 'text';",
          '  url: string | null;',
          '}',
          '',
          'export interface UsePostReturn<Type> {',
          '  error?: Error;',
          '  execute: () => void;',
          '  pending: boolean;',
          '  value?: Type;',
          '}',
          '',
          'export const usePost = <Type>({',
          '  body,',
          "  headers = { 'Content-Type': 'application/json' },",
          '  url,',
          '  pollInterval,',
          "  returnType = 'json',",
          '}: UsePostProperties): UsePostReturn<Type> => {',
          '  const [pending, setPending] = useState(false);',
          '  const [value, setValue] = useState<Type>();',
          '  const [error, setError] = useState<Error>();',
          '  const executeReference = useRef<() => void>();',
          '',
          '  const execute = useCallback(async () => {',
          '    if (url === null) {',
          '      return;',
          '    }',
          '',
          '    setPending(true);',
          '',
          '    try {',
          '      const init = {',
          '        body,',
          '        headers,',
          "        method: 'POST',",
          '      };',
          '      const fetchResponse = await fetch(url, init);',
          '',
          "      if (returnType === 'json') {",
          '        setValue(await fetchResponse.json());',
          '      }',
          '    } catch (error_: unknown) {',
          '      if (error_ instanceof Error) {',
          '        setError(error_);',
          '      }',
          '    }',
          '',
          '    setPending(false);',
          '  }, [body, headers, returnType, url]);',
          '  // Execution function is assigned to a reference to avoid an infinite loop problem in useEffect.',
          "  // The ref will always reference the most recent version of execute rather than a version of execute that's created for every render.",
          '  // This means that when using this hook in an effect you can properly list execute as a dependency. (Make sure to do so.)',
          '  executeReference.current = execute;',
          '',
          '  useEffect(() => {',
          '    const controller = new AbortController();',
          '    if (pollInterval) {',
          '      animationInterval(pollInterval, controller.signal, execute);',
          '    }',
          '',
          '    return (): void => {',
          '      controller.abort();',
          '    };',
          '  }, [execute, pollInterval]);',
          '',
          '  return { error, execute: executeReference.current, pending, value };',
          '};',
        ]}
      </CodeWrapper>
      <Paragraph>
        So what&apos;s the problem with this? Chaining requests is the problem.
        Let&apos;s say in order to create a group file share you have to login
        to the api, grab cookies off the response, use those to create a
        directory, add a “share” to it, take the shareId to update its name, and
        mark it as private, add each user to the directory one at a time, then
        set each user&apos;s permissions in that directory one at a time.
        That&apos;s a minimum of 6 REST API calls that have to be done in order.
        What do you do? Link a bunch of useEffects together?
      </Paragraph>
      <Paragraph>
        You might say, that&apos;s a job for the backend. Great, with Next.js we
        have our own Node API. It&apos;s perfect for this kind of thing.
        (I&apos;ll get back to some other use cases for the Next API later).
        However, things didn&apos;t always work out like this for me. There were
        a lot of cases where I needed live data flow to change the client-side.
        It&apos;s just not always optimal to do everything server-side.
        (We&apos;ll get back to this too.) And I did, admittedly, do some pretty
        nasty useEffect chaining. (By this I mean one useEffect has the returned
        data of another useEffect as a dependency.)
      </Paragraph>
      <Paragraph>Here&apos;s what I found that works better:</Paragraph>
      <CodeWrapper>
        {[
          "import { RocketChatCreateUserResponse } from '../../types/RocketChat/rocket-chat-create-user-response';",
          "import { RocketChatRestGetRoomInfoResponse } from '../../types/RocketChat/rocket-chat-rest-get-room-info';",
          "import { RocketChatRestLoginResponse } from '../../types/RocketChat/rocket-chat-rest-login-response';",
          "import { RocketChatUsersInfoResponse } from '../../types/RocketChat/rocket-chat-users-info-response';",
          "import { jsonHeader } from '../../util/http';",
          "import { TEMP_GUEST_PASS } from '../FileCloud/file-cloud-controller';",
          "import { API_ROCKET_CHAT_BASE, API_ROCKET_CHAT_LOGIN } from './constants';\n",
          'export class RocketChatController {',
          '  public authToken?: string;',
          '  public isLoggedIn?: boolean;',
          '  public userId?: string;',
          '  private _loginHeader?: Record<string, string>;',
          '',
          '  public login = async (',
          '    username = process.env.ROCKET_CHAT_ADMIN_USERNAME,',
          '    password = process.env.ROCKET_CHAT_ADMIN_PASSWORD',
          '  ): Promise<void> => {',
          '    const rocketChatAdminLoginResponse = await fetch(',
          '      `${API_ROCKET_CHAT_LOGIN}`,',
          '      {',
          '        body: JSON.stringify({',
          '          password,',
          '          username,',
          '        }),',
          '        headers: jsonHeader,',
          "        method: 'POST',",
          '      }',
          '    );',
          '    const rocketChatAdminLoginData =',
          '      (await rocketChatAdminLoginResponse.json()) as RocketChatRestLoginResponse;',
          '    this.authToken = rocketChatAdminLoginData.data?.authToken;',
          '    this.userId = rocketChatAdminLoginData.data?.userId;',
          '    this.getLoginHeader();',
          '',
          '    this.isLoggedIn = Boolean(this.authToken && this.userId);',
          '  };',
          '',
          '  public addToChannel = async (',
          '    roomId: string,',
          '    userId: string',
          '  ): Promise<void> => {',
          '    await fetch(`${API_ROCKET_CHAT_BASE}channels.invite`, {',
          '      body: JSON.stringify({',
          '        roomId,',
          '        userId,',
          '      }),',
          '      headers: jsonHeader,',
          "      method: 'POST',",
          '    });',
          '  };',
          '',
          '  public createUser = async (',
          '    email: string,',
          '    name: string,',
          '    username: string,',
          '    password = TEMP_GUEST_PASS',
          '  ): Promise<RocketChatCreateUserResponse | RocketChatUsersInfoResponse> => {',
          '    if (this._loginHeader) {',
          '      const createRocketChatUserResponse = await fetch(',
          '        `${API_ROCKET_CHAT_BASE}users.create`,',
          '        {',
          '          body: JSON.stringify({',
          '            email,',
          '            name,',
          '            password,',
          '            username,',
          '          }),',
          '          headers: {',
          '            ...jsonHeader,',
          '            ...this._loginHeader,',
          '          },',
          "          method: 'POST',",
          '        }',
          '      );',
          '',
          '      const createRocketChatUserData =',
          '        (await createRocketChatUserResponse.json()) as RocketChatCreateUserResponse;',
          '',
          '      if (createRocketChatUserData.success) {',
          '        return createRocketChatUserData;',
          '      }',
          '',
          '      return this.getUserInfo(username);',
          '    }',
          '',
          "    throw new Error('Not logged in.');",
          '  };',
          '',
          '  public getRoomInfo = async (',
          '    roomName: string',
          '  ): Promise<RocketChatRestGetRoomInfoResponse> => {',
          '    if (this._loginHeader) {',
          '      const roomInfoResponse = await fetch(',
          '        `${API_ROCKET_CHAT_BASE}rooms.info?roomName=${roomName}`,',
          '        {',
          '          headers: this._loginHeader,',
          '        }',
          '      );',
          '      return (await roomInfoResponse.json()) as RocketChatRestGetRoomInfoResponse;',
          '    }',
          '',
          "    throw new Error('You must be logged in to do this.');",
          '  };',
          '',
          '  public getUserInfo = async (',
          '    userId?: string,',
          '    username?: string',
          '  ): Promise<RocketChatUsersInfoResponse> => {',
          '    let queryString = null;',
          '    if (userId) {',
          '      queryString = `userId=${userId}`;',
          '    } else if (username) {',
          '      queryString = `username=${username}`;',
          '    }',
          '',
          '    if (this._loginHeader && queryString) {',
          '      const getUserInfoResponse = await fetch(',
          '        `${API_ROCKET_CHAT_BASE}users.info?${queryString}`,',
          '        { headers: this._loginHeader }',
          '      );',
          '      return (await getUserInfoResponse.json()) as RocketChatUsersInfoResponse;',
          '    }',
          '',
          '    throw new Error(',
          "      'Must be logged in and must pass either userId or username.'",
          '    );',
          '  };',
          '',
          '  private readonly getLoginHeader = (): Record<string, string> | null => {',
          '    if (this.authToken && this.userId) {',
          '      this._loginHeader = {',
          "        'X-Auth-Token': this.authToken,",
          "        'X-User-Id': this.userId,",
          '      };',
          '    }',
          '',
          '    return null;',
          '  };',
          '}',
        ]}
      </CodeWrapper>
      <Paragraph>
        TypeScript gives us the opportunity to build some good ol&apos; OOP
        classes. An object with methods, and an instantiation that can keep
        track of any properties. ...It just feels structured. Now I know, hooks
        are brilliant. I love stumbling across new hook repos just to see what
        people have done with them.{' '}
        <A href="https://reactjs.org/docs/hooks-rules.html">
          But they have rules
        </A>
        . Rules you should follow. And if those rules conflict with what
        you&apos;re trying to do. Find another way.
      </Paragraph>
      <Paragraph>
        A TypeScript class is{' '}
        <strong>
          code that can be shared by both the Next API and your client
        </strong>
        . So wherever it is most appropriate to make these calls, you can do it
        with the same code. This is pretty freaking cool if you ask me.
      </Paragraph>
      <CodeWrapper>
        {[
          'const rocketChat = new RocketChatController();',
          'await rocketChat.login();',
        ]}
      </CodeWrapper>
      <Heading variant="h2">Don&apos;t SSR Everything</Heading>
      <Paragraph>
        <A href="https://www.reddit.com/r/nextjs/comments/q6o81b/ssr_very_slow/">
          Just because
        </A>{' '}
        <A href="https://www.reddit.com/r/nextjs/comments/q6es9u/should_i_implement_ssr_before_react_native_or/">
          you&apos;re using
        </A>{' '}
        <A href="https://www.reddit.com/r/nextjs/comments/ph2i4u/ssr_data_fetching_trick/">
          Next, doesn&apos;t
        </A>{' '}
        <A href="https://www.reddit.com/r/nextjs/comments/ml4i2t/ssr_pages_cold_start_improve_performance/">
          mean everything
        </A>{' '}
        <A href="https://www.reddit.com/r/nextjs/comments/ncgix2/what_is_the_point_of_nextjs_ssr/">
          should be
        </A>{' '}
        <A href="https://www.reddit.com/r/nextjs/comments/mhel96/ssr_performance_improvements/">
          SSR
        </A>
        .
      </Paragraph>
      <Paragraph>
        Next does a lot of cool optimization without any input from you. CSS for
        example is rendered server-side. (I also highly recommend using{' '}
        <A href="https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/">
          CSS modules
        </A>{' '}
        that React supports out of the box.) SSR isn&apos;t the only reason to
        use Next and it&apos;s not the only tool it has. Use the tools you need,
        when you need them.
      </Paragraph>
      <Paragraph>
        Get familiar with{' '}
        <A href="https://nextjs.org/docs/basic-features/data-fetching">
          all of the tools Next provides for data fetching
        </A>
        . Familiarize yourself with useSWR (previously mentioned) and don&apos;t
        be afraid to do a good ol&apos; client-side fetch. Especially when
        dealing with live or dynamic data. You should know these tools and when
        to use them. Putting too much work on the server is just as bad as
        putting too much work on the browser. Split it up, load only what you
        need, when you need it.
      </Paragraph>
      <Heading variant="h2">
        Learn From Smart People, Don&apos;t Stop Learning
      </Heading>
      <Paragraph>
        I initially learned React from{' '}
        <A href="https://advancedreact.com/">Wes Bos</A>. and did a lot of
        <A
          href="https://introspect.dev/list/6cb1ab98-e847-408d-b64d-4a47f2e8a2dc"
          target="_blank"
        >
          Andrei Neagoie and Stephen Grider courses
        </A>
        . Since then I&apos;ve come across guys like Dan Abramov and Harry Wolf.
        I&apos;ve even linked some of their articles in my documentation of this
        project. Specifically:
      </Paragraph>
      <ul>
        <li>
          <A href="https://overreacted.io/a-complete-guide-to-useeffect/">
            A Complete Guide to useEffect
          </A>{' '}
          (Please read this!)
        </li>
        <li>
          <A href="https://hswolff.com/blog/why-i-love-usereducer/">
            Why I love useReducer
          </A>
        </li>
        <li>
          <A href="https://hswolff.com/blog/level-up-usereducer-with-immer/">
            Level Up useReducer with Immer
          </A>
        </li>
        <li>
          <A href="https://hswolff.com/blog/how-to-usecontext-with-usereducer/">
            How to useContext with useReducer
          </A>
        </li>
      </ul>
      <Paragraph>
        Don&apos;t ever think you know everything, you never will. I&apos;ve
        come across know-it-alls, worked with know-it-alls, and seen projects
        decimated by know-it-alls. Stay open, keep finding new perspectives,
        keep getting deeper, and never let{' '}
        <A href="https://en.wikipedia.org/wiki/Einstellung_effect">
          Einstellung
        </A>{' '}
        set in.
      </Paragraph>
      <Heading variant="h2">Use The Next API</Heading>
      <Paragraph>
        Even if you&apos;re not intending to use Next for your entire stack, the
        Next API is a quick and easy way to solve some problems. Fixing bad REST
        APIs is one of them. Got an endpoint that returns too much data and
        doesn&apos;t have an option to paginate? Send it through Next, paginate
        the results and give yourself a structure that works well with useSWR.
      </Paragraph>
      <Paragraph>
        Need to make... ahem.... 6 REST calls to do one thing? Bundle it into a
        single call you can make on your front end.
      </Paragraph>
      <Paragraph>
        Want to work with environment variables that you don&apos;t want the
        client to have access to? API routes can access{' '}
        <A href="https://nextjs.org/docs/basic-features/environment-variables">
          environment variables
        </A>{' '}
        that are not NEXT_PUBLIC.
      </Paragraph>
      <Heading variant="h2">Keep Scaling, Keep Refactoring</Heading>
      <Paragraph>
        Don&apos;t get stuck with mistakes. I moved this project from taking two
        weeks to add a feature, to a few hours. (So long as an API doesn&apos;t
        give me too much trouble.) I&apos;ve got a lot of places in my code that
        I need to clean up. Fetch requests being one of them. I only thought of
        using classes recently.
      </Paragraph>
      <Paragraph>
        We&apos;re working on a GraphQL server that we&apos;re adding both our
        database and our third-party APIs to. We&apos;re discovering that we can
        create whatever crazy relationship we want to. A user&apos;s email on
        our database can fit nicely into a user search for RocketChat. Add it to
        the graph. Those chaining rest calls could be a series of relationships.
        Add it to the graph. Because our users have the same credentials for
        both the app and the integrations, we can start linking things together.
        Add it to the graph. For example:
      </Paragraph>
      <CodeWrapper language="graphql">
        {[
          '{',
          '  login(username, password) {',
          '    user {',
          '      userId',
          '      rocketChat {',
          '        avatar',
          '      }',
          '      outlook {',
          '        unreadMessages',
          '      }',
          '    }',
          '  }',
          '}',
        ]}
      </CodeWrapper>
      <Paragraph>
        Why not? Having a separate server that allows us to make these kinds of
        calls to basically abstract out interacting with data sources will be a
        huge boost.
      </Paragraph>
      <Paragraph>
        I&apos;ve thought about hooking something like Prisma up to connect Next
        directly to our database. But with a GraphQL server, I don&apos;t think
        that will be necessary or even preferable. But if I have a use for it,
        I&apos;d like to keep that in my back pocket. I mean, maybe there&apos;s
        a use for an SQLite server working with Prisma? A cool little in-memory
        app DB. Who knows, I&apos;m keeping an open mind.
      </Paragraph>
      <Paragraph>
        If you don&apos;t keep improving your code, it&apos;s going to fall
        apart. If you&apos;ve got a team that&apos;s afraid to step on each
        other&apos;s toes, or is paralyzed by a buggy codebase. Pause,
        reevaluate, and understand that time is an investment. If you want fast
        development and high productivity you need to invest in the foundation
        of your work. Don&apos;t think you can get there by brute force. And
        don&apos;t think you&apos;re better than “new-fangled” technologies.
        That kind of attitude will keep you and your team back.
      </Paragraph>
    </>
  );
}
