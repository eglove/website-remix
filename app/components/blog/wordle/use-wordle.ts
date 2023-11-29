import { useSet } from '@ethang/hooks/use-set.js';
import { useForm } from '@ethang/use-form/index.js';
import type { ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { z, ZodError } from 'zod';

const initialState = { guess: '' };

type UseWordleProperties = {
  answer: string;
};

type UseWordleReturn = {
  formState: typeof initialState;
  guesses: Set<string>;
  handleChange: (event: ChangeEvent) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isInputDisabled: boolean;
};

export const maxGuessesAllowed = 6;

const savedGuessesSchema = z
  .set(z.string())
  .max(maxGuessesAllowed, { message: 'Max guesses reached.' });

export function useWordle({ answer }: UseWordleProperties): UseWordleReturn {
  const guesses = useSet<string>();

  const hasWon = guesses.has(answer.toUpperCase());
  const isInputDisabled = guesses.size >= maxGuessesAllowed || hasWon;

  if (hasWon) {
    toast('You Win!', {
      position: 'top-center',
      toastId: 'win',
    });
  }

  const { handleSubmit, handleChange, formState, setFormState, clearForm } =
    useForm(initialState, {
      onChange(): void {
        setFormState(formState_ => {
          return {
            ...formState_,
            guess: formState_.guess.toUpperCase(),
          };
        });
      },
      onFieldError(error): void {
        toast.error(error?.guess?.[0], {
          position: 'top-center',
          toastId: 'error',
        });
      },
      onSubmit(): void {
        clearForm();
        try {
          guesses.add(formState.guess);
          savedGuessesSchema.parse(guesses);
        } catch (error) {
          if (error instanceof ZodError) {
            toast.error(error.issues[0]?.message, {
              position: 'top-center',
            });
          }
        }
      },
      zodValidator: z.object({
        guess: z.string().length(5, 'Guess must be exactly 5 characters.'),
      }),
    });

  return {
    formState,
    guesses,
    handleChange,
    handleSubmit,
    isInputDisabled,
  };
}
