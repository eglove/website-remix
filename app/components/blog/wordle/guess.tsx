import type { JSX } from 'react';
import { twMerge } from 'tailwind-merge';

import useGuess, { checkGuess } from './use-guess';

type GuessProperties = {
  readonly answer: string;
  readonly guess: string;
};

export function Guess({ guess, answer }: GuessProperties): JSX.Element {
  const { withId } = useGuess(guess);

  return (
    <div className="mt-4 grid h-10 w-full grid-cols-5-max gap-2">
      {withId.map((item, index) => {
        return (
          <span
            key={item.id}
            className={twMerge(
              'grid h-10 w-10 place-items-center border-2 font-bold text-white',
              checkGuess(item.character, index, answer) === 'Neutral' &&
                'bg-gray-300',
              checkGuess(item.character, index, answer) === 'Correct' &&
                'bg-green-500',
              checkGuess(item.character, index, answer) === 'Incorrect' &&
                'bg-red-500',
              checkGuess(item.character, index, answer) === 'Misplaced' &&
                'bg-yellow-500',
            )}
          >
            {item.character}
          </span>
        );
      })}
    </div>
  );
}
