import { MagnifyingGlassIcon, StarIcon } from '@heroicons/react/24/solid';
import { Progress } from '@nextui-org/progress';

export default function () {
  return (
    <div>
      <div className="mx-auto my-4 w-max rounded-lg border-2 p-4 shadow-lg">
        <div className="flex gap-4">
          <div className="w-56 text-3xl font-bold">
            What others think about the product
          </div>
          <div className="grid place-items-center rounded-lg p-4 shadow-lg">
            <div className="flex gap-2 text-2xl font-bold">
              <StarIcon className="text-yellow-300" height={32} width={32} />{' '}
              4.8
            </div>
            <div className="w-32 text-center">Average customer rating</div>
          </div>
        </div>
        <div className="my-8 flex items-center gap-2 rounded-full border-2 px-2 py-4 shadow-lg">
          <MagnifyingGlassIcon height={32} width={32} /> Search topics and
          reviews.
        </div>
        <div className="text-lg font-bold">Reviews</div>
        <div className="flex items-center gap-2">
          5 <StarIcon className="text-yellow-300" height={24} width={24} />{' '}
          <Progress aria-label="5 stars" color="warning" value={80} />
          106
        </div>
        <div className="flex items-center gap-2">
          4 <StarIcon className="text-yellow-300" height={24} width={24} />{' '}
          <Progress aria-label="4 stars" color="warning" value={25} />
          32
        </div>
        <div className="flex items-center gap-2">
          3 <StarIcon className="text-yellow-300" height={24} width={24} />{' '}
          <Progress aria-label="3 stars" color="warning" value={0} />0
        </div>
        <div className="flex items-center gap-2">
          2 <StarIcon className="text-yellow-300" height={24} width={24} />{' '}
          <Progress aria-label="2 stars" color="warning" value={0} />0
        </div>
        <div className="flex items-center gap-2">
          1 <StarIcon className="text-yellow-300" height={24} width={24} />{' '}
          <Progress aria-label="1 stars" color="warning" value={0} />0
        </div>
        <button
          className="my-4 rounded-full bg-blue-950 px-4 py-2 text-white"
          type="button"
        >
          Write a review
        </button>
      </div>
    </div>
  );
}
