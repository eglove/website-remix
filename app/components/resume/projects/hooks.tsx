import { Link } from '@nextui-org/link';
import type { JSX } from 'react';

import { ExperienceCard } from '../experience-card';
import { unitFormat } from '../tech-format';

export function Hooks(): JSX.Element {
  return (
    <ExperienceCard
      methodologiesUsed={[]}
      techUsed={['react', 'typeScript', 'javascript']}
      title="@ethang/hooks"
    >
      <li>NPM library and custom hooks for use with React.</li>
      <li>
        useAnimationInterval is a setInterval alternative that takes into
        account lag in timers caused by browser framerate.
      </li>
      <li>
        useEventListener makes use of AbortController to abstract out the need
        for writing useEffects for events in React.
      </li>
      <li>
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
      <li>
        <Link
          isExternal
          className="text-medium"
          href="https://github.com/eglove/hooks"
        >
          github.com/eglove/hooks
        </Link>
      </li>
    </ExperienceCard>
  );
}
