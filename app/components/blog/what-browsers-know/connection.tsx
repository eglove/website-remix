import { isNil } from '@ethang/toolbelt/is/nil.js';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import { DateTime } from 'luxon';
import type { JSX } from 'react';
import { useEffect, useState } from 'react';

import { A } from '../../elements/a';

const formatter = new Intl.NumberFormat('en', {
  style: 'unit',
  unit: 'megabit',
});

export function Connection(): JSX.Element {
  const [referrer, setReferrer] = useState<string>();
  const [ip, setIp] = useState<string>();
  const [speed, setSpeed] = useState<number>(0);

  useEffect(() => {
    const startTime = DateTime.now();
    setReferrer(document.referrer);

    fetch('https://api.ipify.org?format=json')
      .then(async response => {
        return response.json();
      })
      .then(data => {
        setIp((data as { ip: string }).ip);
      })
      .catch(error => {
        console.error(error);
      });

    fetch('https://eu.httpbin.org/stream-bytes/500000')
      .then(async response => {
        return response.blob();
      })
      .then(blob => {
        const endTime = DateTime.now();
        const timeInSeconds = endTime.toSeconds() - startTime.toSeconds();

        const fileSizeInMegabits = blob.size / 1000;
        const speedKbps = fileSizeInMegabits / timeInSeconds;

        setSpeed(speedKbps);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Table hideHeader isStriped aria-label="connection">
        <TableHeader>
          <TableColumn>Name</TableColumn>

          <TableColumn>Value</TableColumn>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>Previous Page</TableCell>

            <TableCell>
              {!isNil(referrer) && (
                <A isExternal href={referrer}>
                  {referrer}
                </A>
              )}
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Public IP</TableCell>

            <TableCell>{ip}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>Download Speed</TableCell>

            <TableCell>{`${formatter.format(speed)}/s`}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
