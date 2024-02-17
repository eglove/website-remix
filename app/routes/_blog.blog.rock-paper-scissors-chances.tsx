import { Button } from '@nextui-org/button';
import { Image } from '@nextui-org/image';
import type { JSX } from 'react';
import { useCallback, useState } from 'react';

import { YouTube } from '../components/elements/youtube';

const percentageFormatter = Intl.NumberFormat('en-US', {
  style: 'unit',
  unit: 'percent',
});

const numberFormatter = Intl.NumberFormat('en-US');

const rockPaperScissors = {
  Paper: 2,
  Rock: 1,
  Scissors: 3,
} as const;

const rockPaperScissorsNumbers = {
  1: 'Rock',
  2: 'Paper',
  3: 'Scissors',
} as const;

export default function RockPaperScissorsChances(): JSX.Element {
  const [currentStreak, setCurrentStreak] = useState(0);
  const [lastRoundMessage, setLastRoundMessage] = useState<string>();

  const chances = (1 / 3 ** (currentStreak + 1)) * 100;
  const opposition = (Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3;

  const handlePlay = useCallback(
    (player: keyof typeof rockPaperScissorsNumbers): void => {
      if (player === opposition) {
        setLastRoundMessage('Draws are not a win!');
        setCurrentStreak(0);
      } else if (
        (player === rockPaperScissors.Rock &&
          opposition === rockPaperScissors.Scissors) ||
        (player === rockPaperScissors.Paper &&
          opposition === rockPaperScissors.Rock) ||
        (player === rockPaperScissors.Scissors &&
          opposition === rockPaperScissors.Paper)
      ) {
        setLastRoundMessage(
          `${rockPaperScissorsNumbers[player]} beats ${rockPaperScissorsNumbers[opposition]}!`,
        );

        setCurrentStreak(timesPlayed_ => {
          return timesPlayed_ + 1;
        });
      } else {
        setLastRoundMessage(
          `${rockPaperScissorsNumbers[player]} loses to ${rockPaperScissorsNumbers[opposition]}!`,
        );

        setCurrentStreak(0);
      }
    },
    [opposition],
  );

  const handleRock = useCallback(() => {
    handlePlay(rockPaperScissors.Rock);
  }, [handlePlay]);

  const handlePaper = useCallback(() => {
    handlePlay(rockPaperScissors.Paper);
  }, [handlePlay]);

  const handleScissors = useCallback(() => {
    handlePlay(rockPaperScissors.Scissors);
  }, [handlePlay]);

  return (
    <div>
      <div>
        Times Won:
        {currentStreak}
      </div>

      <div>Chances of Winning:</div>

      <div>
        1 in {numberFormatter.format(Math.round(100 / chances))} /{' '}
        {percentageFormatter.format(chances)}
      </div>

      <div>
        <span className="font-bold">Last Round:</span> {lastRoundMessage}
      </div>

      <div className="my-4 flex gap-4">
        <Button
          className="h-max p-2"
          type="button"
          variant="bordered"
          onPress={handleRock}
        >
          <Image
            height={50}
            src="https://imagedelivery.net/J0w2cdNV8utZEEOrxN9WDQ/1fa6f1ae-21fb-433f-db2e-c884e8904500/public"
            width={50}
          />

          <div>Rock</div>
        </Button>

        <Button
          className="h-max p-2"
          type="button"
          variant="bordered"
          onPress={handlePaper}
        >
          <Image
            height={50}
            src="https://imagedelivery.net/J0w2cdNV8utZEEOrxN9WDQ/72e8b879-a70c-4adc-a70d-49faa0a96c00/public"
            width={50}
          />

          <div>Paper</div>
        </Button>

        <Button
          className="h-max p-2"
          type="button"
          variant="bordered"
          onPress={handleScissors}
        >
          <Image
            height={50}
            src="https://imagedelivery.net/J0w2cdNV8utZEEOrxN9WDQ/2bf2b198-8230-4707-72c6-ce280e7e6200/public"
            width={50}
          />

          <div>Scissors</div>
        </Button>
      </div>

      <YouTube
        id="PmWQmZXYd74"
        title="Can You Win This Game of Rock, Paper, Scissors?"
      />
    </div>
  );
}
