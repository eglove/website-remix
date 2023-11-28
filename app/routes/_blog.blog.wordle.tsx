import 'react-toastify/dist/ReactToastify.css';

import { range } from '@ethang/util/data.js';
import { faker } from '@faker-js/faker';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { JSX } from 'react';
import { ToastContainer } from 'react-toastify';

import { Guess } from '../components/blog/wordle/guess';
import { useWordle } from '../components/blog/wordle/use-wordle';

export async function loader() {
  const answer = faker.word.noun({ length: 5 });

  return json(answer, {
    headers: {
      'Cache-Control': 'no-cache, no-store',
    },
  });
}

export const maxGuessesAllowed = 6;

export default function (): JSX.Element {
  const answer = useLoaderData<typeof loader>();
  const { guesses, handleSubmit, isInputDisabled, formState, handleChange } =
    useWordle({ answer });

  return (
    <div>
      <div>
        {range(0, maxGuessesAllowed).map(index => {
          return (
            <Guess
              answer={answer}
              guess={[...guesses][index] ?? '     '}
              key={index}
            />
          );
        })}
      </div>
      {guesses.size === maxGuessesAllowed && (
        <p className="my-4 text-lg font-bold">It was {answer.toUpperCase()}!</p>
      )}
      <form className="my-4" onSubmit={handleSubmit}>
        <label className="text-lg" htmlFor="guess">
          Enter guess:{' '}
        </label>
        <input
          className="border-2 border-blue-700"
          disabled={isInputDisabled}
          id="guess"
          name="guess"
          type="text"
          value={formState.guess}
          onChange={handleChange}
        />
      </form>
      <ToastContainer />
    </div>
  );
}
