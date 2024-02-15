import { Button } from '@nextui-org/button';
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import type { JSX } from 'react';
import { useState } from 'react';

import { A } from '../../elements/a';

const meterFormatter = new Intl.NumberFormat('en-US', {
  style: 'unit',
  unit: 'meter',
});

const degreeFormatter = new Intl.NumberFormat('en-US', {
  style: 'unit',
  unit: 'degree',
});

export function Location(): JSX.Element {
  const [location, setLocation] = useState<GeolocationPosition>();

  const getLocation = (): void => {
    if (typeof navigator !== 'undefined') {
      navigator.geolocation.watchPosition(position => {
        setLocation(position);
      });
    }
  };

  return (
    <div>
      {!location && (
        <Button className="mb-4" color="primary" onClick={getLocation}>
          Get Location
        </Button>
      )}
      {location ? (
        <div>
          <A
            isExternal
            showAnchorIcon
            className="mb-4"
            href={`https://maps.google.com/?q=${location.coords.latitude},${location.coords.longitude}`}
          >
            Open in Google Maps
          </A>
        </div>
      ) : null}
      {location ? (
        <Table hideHeader isStriped aria-label="Location">
          <TableHeader>
            <TableColumn>Name</TableColumn>
            <TableColumn>Value</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>Retrieved</TableCell>
              <TableCell>
                {new Date(location.timestamp).toLocaleString()}
              </TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>Latitude</TableCell>
              <TableCell>{location.coords.latitude}</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Longitude</TableCell>
              <TableCell>{location.coords.longitude}</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>Accuracy</TableCell>
              <TableCell>
                {meterFormatter.format(location.coords.accuracy)}
              </TableCell>
            </TableRow>
            <TableRow key="5">
              <TableCell>Altitude</TableCell>
              <TableCell>
                {location.coords.altitude === null
                  ? ''
                  : meterFormatter.format(location.coords.altitude)}
              </TableCell>
            </TableRow>
            <TableRow key="6">
              <TableCell>Altitude Accuracy</TableCell>
              <TableCell>
                {location.coords.altitudeAccuracy === null
                  ? ''
                  : meterFormatter.format(location.coords.altitudeAccuracy)}
              </TableCell>
            </TableRow>
            <TableRow key="7">
              <TableCell>Heading</TableCell>
              <TableCell>
                {location.coords.heading === null
                  ? ''
                  : degreeFormatter.format(location.coords.heading)}
              </TableCell>
            </TableRow>
            <TableRow key="8">
              <TableCell>Speed</TableCell>
              <TableCell>
                {location.coords.speed === null
                  ? ''
                  : `${meterFormatter.format(location.coords.speed)}/sec`}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
}
