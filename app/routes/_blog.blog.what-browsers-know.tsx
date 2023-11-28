import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';

import { Battery } from '../components/blog/what-browsers-know/battery';
import { Connection } from '../components/blog/what-browsers-know/connection';
import { Hardware } from '../components/blog/what-browsers-know/hardware';
import { Location } from '../components/blog/what-browsers-know/location';
import { Software } from '../components/blog/what-browsers-know/software';
import { A } from '../components/elements/a';
import { Heading } from '../components/elements/heading';

export default function () {
  return (
    <div className="mt-4 grid gap-4">
      <Table
        isCompact
        isStriped
        aria-label="Table of Contents"
        className="max-w-sm"
      >
        <TableHeader>
          <TableColumn>Table of Contents</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow key="1">
            <TableCell>
              <A href="#location">Location</A>
            </TableCell>
          </TableRow>
          <TableRow key="2">
            <TableCell>
              <A href="#software">Software</A>
            </TableCell>
          </TableRow>
          <TableRow key="3">
            <TableCell>
              <A href="#mediaHardware">Media Hardware</A>
            </TableCell>
          </TableRow>
          <TableRow key="4">
            <TableCell>
              <A href="#connection">Connection</A>
            </TableCell>
          </TableRow>
          <TableRow key="5">
            <TableCell>
              <A href="#battery">Battery</A>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Heading id="location" variant="h3">
        Location
      </Heading>
      <Location />
      <Heading id="software" variant="h3">
        Software
      </Heading>
      <Software />
      <Heading variant="h3">Media Hardware</Heading>
      <Hardware />
      <Heading id="connection" variant="h3">
        Connection
      </Heading>
      <Connection />
      <Heading id="battery" variant="h3">
        Battery
      </Heading>
      <Battery />
    </div>
  );
}
