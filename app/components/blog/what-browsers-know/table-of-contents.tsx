import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import type { JSX } from 'react';

import { A } from '../../elements/a';

export function TableOfContents(): JSX.Element {
  const columns = [{ key: 'toc', label: 'Table of Contents' }];

  const sections = [
    { href: '#location', key: '1', label: 'Location' },
    { href: '#software', key: '2', label: 'Software' },
    { href: '#mediaHardware', key: '3', label: 'Media Hardware' },
    { href: '#connection', key: '4', label: 'Connection' },
    { href: '#battery', key: '5', label: 'Battery' },
  ];

  return (
    <Table
      isCompact
      isStriped
      aria-label="Table of Contents"
      className="max-w-sm"
    >
      <TableHeader columns={columns}>
        {column => {
          return <TableColumn key={column.key}>{column.label}</TableColumn>;
        }}
      </TableHeader>

      <TableBody items={sections}>
        {section => {
          return (
            <TableRow key={section.key}>
              {() => {
                return (
                  <TableCell>
                    <A href={section.href}>{section.label}</A>
                  </TableCell>
                );
              }}
            </TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
}
