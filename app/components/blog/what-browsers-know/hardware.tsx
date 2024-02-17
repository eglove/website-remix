import { Button } from '@nextui-org/button';
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import type { JSX } from 'react';
import { useState } from 'react';

type Track = {
  contentHint: string;
  enabled: boolean;
  id: string;
  kind: string;
  label: string;
  muted: boolean;
  readyState: string;
};

const columns = [
  { key: 'id', label: 'Id' },
  { key: 'kind', label: 'Kind' },
  { key: 'label', label: 'Label' },
  { key: 'enabled', label: 'Enabled' },
  { key: 'muted', label: 'Muted' },
  { key: 'readyState', label: 'Ready State' },
  { key: 'contentHint', label: 'Content Hint' },
];

export function Hardware(): JSX.Element {
  const [tracks, setTracks] = useState<Track[]>([]);

  const getDevices = async (): Promise<void> => {
    const userMedia = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const tracks = userMedia.getTracks();
    setTracks(
      tracks.map(track => {
        return {
          contentHint: track.contentHint,
          enabled: track.enabled,
          id: track.id,
          kind: track.kind,
          label: track.label,
          muted: track.muted,
          readyState: track.readyState,
        };
      }),
    );
  };

  return (
    <div>
      {tracks.length <= 0 && (
        <Button
          color="primary"
          onClick={() => {
            getDevices().catch(error => {
              console.error(error);
            });
          }}
        >
          Get Hardware
        </Button>
      )}

      {tracks.length > 0 && (
        <Table aria-label="Devices">
          <TableHeader columns={columns}>
            {(column): JSX.Element => {
              return <TableColumn key={column.key}>{column.label}</TableColumn>;
            }}
          </TableHeader>

          <TableBody items={tracks}>
            {(track): JSX.Element => {
              return (
                <TableRow key={track.id}>
                  {(columnKey): JSX.Element => {
                    const value = getKeyValue(track, columnKey) as
                      | boolean
                      | string;

                    if (typeof value === 'boolean') {
                      return <TableCell>{value ? 'Yes' : 'No'}</TableCell>;
                    }

                    return <TableCell>{value}</TableCell>;
                  }}
                </TableRow>
              );
            }}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
