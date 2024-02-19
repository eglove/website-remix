/* eslint-disable @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access */
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

type BatteryManager = {
  charging: boolean;
  chargingTime: number;
  dischargingTime: number;
  level: number;
};

type BatteryDisplay = {
  charging: boolean;
  chargingTime: string | null;
  dischargingTime: string | null;
  level: number;
};

const percentFormatter = Intl.NumberFormat('en-US', {
  style: 'unit',
  unit: 'percent',
});

export function Battery(): JSX.Element {
  const [battery, setBattery] = useState<BatteryDisplay>();

  useEffect(() => {
    const getBatteryData = (batteryManager: BatteryManager): void => {
      const chargingTime = DateTime.now().plus({
        seconds: batteryManager.chargingTime,
      });
      const dischargingTime = DateTime.now().plus({
        seconds: batteryManager.dischargingTime,
      });

      const relativeCharging = chargingTime.toRelative();
      const relativeDischarging = dischargingTime.toRelative();
      const zeroStrings = new Set(['in 0 seconds', '0 seconds ago', '']);

      setBattery({
        charging: batteryManager.charging,
        chargingTime: zeroStrings.has(relativeCharging)
          ? 'N/A'
          : relativeCharging,
        dischargingTime: zeroStrings.has(relativeDischarging)
          ? 'N/A'
          : relativeDischarging,
        level: batteryManager.level,
      });
    };

    // @ts-expect-error this exists
    if (typeof navigator !== 'undefined' && !isNil(navigator.getBattery)) {
      navigator
        // @ts-expect-error this exists
        .getBattery()
        .then((batteryManager: BatteryManager) => {
          getBatteryData(batteryManager);
        })
        .catch((error: unknown) => {
          console.error(error);
        });
    }
  }, []);

  return (
    <Table hideHeader isStriped aria-label="Location">
      <TableHeader>
        <TableColumn>Name</TableColumn>

        <TableColumn>Value</TableColumn>
      </TableHeader>

      <TableBody>
        <TableRow key="1">
          <TableCell>Charging</TableCell>

          <TableCell>{battery?.charging === true ? 'Yes' : 'No'}</TableCell>
        </TableRow>

        <TableRow key="2">
          <TableCell>Time to Charge</TableCell>

          <TableCell>{battery?.chargingTime}</TableCell>
        </TableRow>

        <TableRow key="3">
          <TableCell>Time to Discharge</TableCell>

          <TableCell>{battery?.dischargingTime}</TableCell>
        </TableRow>

        <TableRow key="4">
          <TableCell>Level</TableCell>

          <TableCell>
            {battery === undefined
              ? undefined
              : percentFormatter.format(battery.level * 100)}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
