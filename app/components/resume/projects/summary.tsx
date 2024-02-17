import { A } from '../../elements/a';
import { ExperienceCard } from '../experience-card';
import { unitFormat } from '../tech-format';

export function ProjectSummary() {
  return (
    <ExperienceCard methodologiesUsed={[]} techUsed={[]} title="Projects">
      <li>
        <span className="font-bold">eslint-config-ethang</span>

        <ul className="list-inside list-disc">
          <li className="pl-4">
            Very strict, opinionated ESLint config. Extends
            eslint-plugin-unicorn. Takes into account every rule from vanilla
            EsLint and @typescrit/eslint.
          </li>

          <li className="pl-4">
            <A
              isExternal
              className="text-sm"
              href="https://github.com/eglove/eslint-config-ethang"
            >
              github.com/eglove/eslint-config-ethang
            </A>
          </li>
        </ul>
      </li>

      <li>
        <span className="font-bold">Toolbelt</span>

        <ul className="list-inside list-disc">
          <li className="pl-4">
            TypeScript utilities with a strict, consistent error handling
            inteface. Forces error checking, inspired by GoLang and Zod.
          </li>

          <li className="pl-4">
            Includes tool for building a centralized API and fetch abstractions
            to use the standard Cache API.
          </li>

          <li className="pl-4">
            <A
              isExternal
              className="text-sm"
              href="https://github.com/eglove/toolbelt"
            >
              github.com/eglove/toolbelt
            </A>
          </li>
        </ul>
      </li>

      <li>
        <span className="font-bold">React Hooks</span>

        <ul className="list-inside list-disc">
          <li className="pl-4">
            NPM library and custom hooks for use with React.
          </li>

          <li className="pl-4">
            useAnimationInterval is a setInterval alternative that takes into
            account lag in timers caused by browser framerate.
          </li>

          <li className="pl-4">
            useEventListener makes use of AbortController to abstract out the
            need for writing useEffects for events in React.
          </li>

          <li className="pl-4">
            useForm idiomatic patterns for React + AJAX form submissions.
            Includes ability to validate forms with Zod schemas.
          </li>

          <li className="pl-4">
            Also includes:{' '}
            {unitFormat.format([
              'useCopyClipboard',
              'useDimensions',
              'useFullscreen',
              'useIsOnscreen',
              'useLocalStorage',
              'useMousePosition',
              'useSet',
              'useToggle',
              'useWindowSize',
            ])}
          </li>

          <li className="pl-4">
            <A
              isExternal
              className="text-sm"
              href="https://github.com/eglove/hooks"
            >
              github.com/eglove/hooks
            </A>
          </li>
        </ul>
      </li>

      <li>
        <span className="font-bold">Project Builder</span>

        <ul className="list-inside list-disc">
          <li className="pl-4">
            Interactive script to help lint, test, build, and publish all of my
            packages and projects.
          </li>

          <li className="pl-4">
            <A
              isExternal
              className="text-sm"
              href="https://github.com/eglove/project-builder"
            >
              github.com/eglove/project-builder
            </A>
          </li>
        </ul>
      </li>

      <li>
        <span className="font-bold">Sterrett Creek Village Trustee</span>

        <ul className="list-inside list-disc">
          <li className="pl-4">
            Website used by the Sterett Creek Village Trustee board to post news
            updates, events, and meeting notes. Sanity is used as a CMS while
            the frontend is built with Astro and React.
          </li>

          <li className="pl-4">
            <A
              isExternal
              className="text-sm"
              href="https://github.com/eglove/sterett"
            >
              github.com/eglove/sterett
            </A>
          </li>

          <li className="pl-4">
            <A
              isExternal
              className="text-sm"
              href="https://sterettcreekvillagetrustee.com/"
            >
              sterettcreekvillagetrustee.com
            </A>
          </li>
        </ul>
      </li>
    </ExperienceCard>
  );
}
