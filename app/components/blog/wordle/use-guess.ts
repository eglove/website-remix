import { v4 } from 'uuid';

type UseGuessReturn = {
  withId: { character: string; id: string }[];
};

export function checkGuess(
  character: string,
  index: number,
  answer: string,
): 'Correct' | 'Incorrect' | 'Misplaced' | 'Neutral' {
  if (character === ' ') {
    return 'Neutral';
  }

  if (character.toUpperCase() === answer.charAt(index).toUpperCase()) {
    return 'Correct';
  }

  if (answer.toUpperCase().includes(character.toUpperCase())) {
    return 'Misplaced';
  }

  return 'Incorrect';
}

export default function useGuess(guess: string): UseGuessReturn {
  const characters = [...guess];
  const withId = characters.map(character => {
    return {
      character,
      id: v4(),
    };
  });

  return {
    withId,
  };
}
