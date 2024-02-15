import { useForm } from '@ethang/use-form/index.js';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import type { JSX } from 'react';
import { useState } from 'react';

import { exampleSignUpSchema } from './schema';

export function ExampleForm(): JSX.Element {
  const [isSuccess, setIsSuccess] = useState(false);

  const { handleSubmit, formState, handleChange, fieldErrors, resetForm } =
    useForm(
      {
        confirmPassword: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
      },
      {
        onSubmit() {
          setIsSuccess(true);
        },
        zodValidator: exampleSignUpSchema,
      },
    );

  const handleReset = (): void => {
    setIsSuccess(false);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <Input
          className="mb-2"
          errorMessage={fieldErrors?.firstName?.[0]}
          label="First Name"
          name="firstName"
          onChange={handleChange}
          value={formState.firstName}
        />
        <Input
          className="mb-2"
          errorMessage={fieldErrors?.lastName?.[0]}
          label="Last Name"
          name="lastName"
          onChange={handleChange}
          value={formState.lastName}
        />
        <Input
          autoComplete="email"
          className="mb-2"
          errorMessage={fieldErrors?.email?.[0]}
          label="Email"
          name="email"
          onChange={handleChange}
          type="email"
          value={formState.email}
        />

        <Input
          autoComplete="new-password"
          className="mb-2"
          errorMessage={fieldErrors?.password?.[0]}
          label="Password"
          name="password"
          onChange={handleChange}
          type="password"
          value={formState.password}
        />
        <Input
          autoComplete="new-password"
          className="mb-2"
          errorMessage={fieldErrors?.confirmPassword?.[0]}
          label="Confirm Password"
          name="confirmPassword"
          onChange={handleChange}
          type="password"
          value={formState.confirmPassword}
        />
        {isSuccess ? (
          <div className="flex gap-2">
            <p className="w-max rounded bg-green-500 p-2 text-white">
              Success!
            </p>
            <Button onClick={handleReset} type="button">
              Reset
            </Button>
          </div>
        ) : null}
        {!isSuccess && (
          <Button color="primary" type="submit">
            Submit
          </Button>
        )}
      </fieldset>
    </form>
  );
}
