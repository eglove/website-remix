import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import type { JSX } from 'react';
import { useEffect, useState } from 'react';
import UAParser from 'ua-parser-js';

export function Software(): JSX.Element {
  const [userAgent, setUserAgent] = useState<UAParser.IResult>();

  useEffect(() => {
    if (navigator.userAgent) {
      const parser = new UAParser(navigator.userAgent);
      setUserAgent(parser.getResult());
    }
  }, []);

  return (
    <Table isStriped aria-label="browser">
      <TableHeader>
        <TableColumn>Type</TableColumn>

        <TableColumn>Name</TableColumn>

        <TableColumn>Version/Model</TableColumn>

        <TableColumn>Vendor</TableColumn>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell>Browser</TableCell>

          <TableCell>{userAgent?.browser.name}</TableCell>

          <TableCell>{userAgent?.browser.version}</TableCell>

          <TableCell>{undefined}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Browser Engine</TableCell>

          <TableCell>{userAgent?.engine.name}</TableCell>

          <TableCell>{userAgent?.engine.version}</TableCell>

          <TableCell>{undefined}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Operating System</TableCell>

          <TableCell>{userAgent?.os.name}</TableCell>

          <TableCell>{userAgent?.os.version}</TableCell>

          <TableCell>{undefined}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>CPU Architecture</TableCell>

          <TableCell>{userAgent?.cpu.architecture}</TableCell>

          <TableCell>{undefined}</TableCell>

          <TableCell>{undefined}</TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Device</TableCell>

          <TableCell>{userAgent?.device.type}</TableCell>

          <TableCell>{userAgent?.device.model}</TableCell>

          <TableCell>{userAgent?.device.vendor}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
