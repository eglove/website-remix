import { faker } from '@faker-js/faker';
import { ChevronDownIcon, StarIcon } from '@heroicons/react/24/solid';

import { A } from '../components/elements/a';
import { Heading } from '../components/elements/heading';

export default function () {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <div className="my-4 flex gap-2">
          <button
            className="w-max rounded bg-blue-600 p-3 text-white hover:bg-blue-700"
            type="button"
          >
            Primary
          </button>
          <button
            className="flex w-max items-center gap-2 rounded bg-blue-600 p-3 text-white hover:bg-blue-700"
            type="button"
          >
            Primary <ChevronDownIcon className="size-4" />
          </button>
        </div>
        <div className="my-4 flex gap-2">
          <button
            className="w-max cursor-default rounded bg-gray-500 p-3 text-white"
            type="button"
          >
            Primary
          </button>
          <button
            className="flex w-max cursor-default items-center gap-2 rounded bg-gray-500 p-3 text-white"
            type="button"
          >
            Primary <ChevronDownIcon className="size-4" />
          </button>
        </div>
      </div>
      <div>
        <div className="my-4 flex gap-2">
          <button
            className="w-max rounded border-2 border-blue-600 bg-white p-3 text-blue-600 hover:border-blue-800 hover:text-blue-800"
            type="button"
          >
            Secondary
          </button>
          <button
            className="flex w-max items-center gap-2 rounded border-2 border-blue-600 bg-white p-3 text-blue-600 hover:border-blue-800 hover:text-blue-800"
            type="button"
          >
            Secondary <ChevronDownIcon className="size-4" />
          </button>
        </div>
        <div className="my-4 flex gap-2">
          <button
            className="w-max cursor-default rounded border-2 border-gray-600 bg-white p-3 text-gray-600"
            type="button"
          >
            Secondary
          </button>
          <button
            className="flex w-max cursor-default items-center gap-2 rounded border-2 border-gray-600 bg-white p-3 text-gray-600"
            type="button"
          >
            Secondary <ChevronDownIcon className="size-4" />
          </button>
        </div>
      </div>
      <div>
        <h1 className="my-4 text-3xl font-semibold">Page Header</h1>
        <h1 className="my-4 text-2xl font-semibold">Section Header</h1>
        <p className="my-2 leading-relaxed">
          {faker.lorem.paragraph()}{' '}
          <A
            class="text-blue-800 hover:underline"
            href="/blog/icodethis-design-system"
          >
            Link example
          </A>
        </p>
        <p className="my-2 text-sm leading-relaxed text-gray-600">
          {faker.lorem.paragraph()}{' '}
          <A
            class="text-blue-800 hover:underline"
            href="/blog/icodethis-design-system"
          >
            Link example
          </A>
        </p>
      </div>
      <div>
        <Heading className="text-medium font-semibold" variant="h2">
          Badges
        </Heading>
        <div className="flex gap-2">
          <div className="my-3 rounded-full bg-blue-500 p-2 text-white">
            Default{' '}
            <span className="inline-flex size-8 items-center justify-center rounded-full border-2 border-white p-1">
              4
            </span>
          </div>
          <div className="my-3 rounded-full bg-green-500 p-2 text-white">
            Positive{' '}
            <span className="inline-flex size-8 items-center justify-center rounded-full border-2 border-white p-1">
              2
            </span>
          </div>
          <div className="my-3 rounded-full bg-red-500 p-2 text-white">
            Negative{' '}
            <span className="inline-flex size-8 items-center justify-center rounded-full border-2 border-white p-1">
              9
            </span>
          </div>
        </div>
        <Heading className="text-medium font-semibold" variant="h2">
          Card
        </Heading>
        <div className="border-2 px-4 py-2 shadow-sm">
          <div className="flex w-full items-center justify-between">
            <Heading className="my-4" variant="h2">
              Card Title
            </Heading>
            <StarIcon className="text-gray-400" height="24" width="24" />
          </div>
          <p className="mb-6 leading-relaxed">{faker.lorem.paragraph()}</p>
          <A
            className="text-blue-800 hover:underline"
            href="/blog/icodethis-design-system"
          >
            Link
          </A>
        </div>
      </div>
    </div>
  );
}
