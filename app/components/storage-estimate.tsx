import convert from 'convert';
import type { JSX } from 'react';
import { useEffect, useState } from 'react';

const formatter = Intl.NumberFormat('en-US', {
  style: 'unit',
  unit: 'gigabyte',
});

export function StorageEstimate(): JSX.Element {
  const [estimate, setEstimate] = useState(0);

  useEffect(() => {
    const getValues = async (): Promise<void> => {
      if (typeof navigator !== 'undefined') {
        const quota = await navigator.storage.estimate();

        if (quota.quota !== undefined) {
          setEstimate(quota.quota);
        }
      }
    };

    getValues().catch((error: unknown) => {
      console.error(error);
    });
  }, []);

  return (
    <span>{formatter.format(convert(estimate, 'bytes').to('gigabytes'))}</span>
  );
}
