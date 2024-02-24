import { tryCatch } from '@ethang/toolbelt/functional/try-catch.js';
import { Input } from '@nextui-org/input';
import { Pagination } from '@nextui-org/pagination';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import { Snippet } from '@nextui-org/snippet';
import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/table';
import locale from 'locale-codes';
import lodash from 'lodash';
import { useEffect, useMemo, useState } from 'react';

import { Heading } from '../components/elements/heading';

export const headers = {
  'Cache-Control': 'immutable, public',
};

type CurrencyDefinitions = {
  currency: string;
  formatted: string;
  locale: string;
}[];

export default function CurrencyFormat() {
  const locales = useMemo(() => {
    return locale.all.map(locale => {
      return { id: locale.tag.replaceAll('-', 'z'), tag: locale.tag };
    });
  }, []);

  const currencies = useMemo(() => {
    return Intl.supportedValuesOf('currency');
  }, []);

  const [selectedLocale, setSelectedLocale] = useState<string>('enUS');
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [amount, setAmount] = useState('10000.55');

  const selectedLocaleTag =
    lodash.find(locales, { id: selectedLocale })?.tag ?? '';

  const formatter = tryCatch(() => {
    return Intl.NumberFormat(selectedLocaleTag, {
      currency: selectedCurrency,
      style: 'currency',
    });
  });

  const [rows, setRows] = useState<CurrencyDefinitions>([]);

  useEffect(() => {
    const definitions: CurrencyDefinitions = [];
    for (const item of locales) {
      for (const currency of currencies) {
        const uniqueFormatter = tryCatch(() => {
          return Intl.NumberFormat(item.tag, {
            currency,
            style: 'currency',
          });
        });

        if (uniqueFormatter.isSuccess) {
          definitions.push({
            currency,
            formatted: uniqueFormatter.data.format(10_000.55),
            locale: item.tag,
          });
        }
      }
    }

    setRows(definitions);
  }, [currencies, locales]);

  const columns = [
    {
      key: 'locale',
      label: 'Locale',
    },
    {
      key: 'currency',
      label: 'Currency',
    },
    {
      key: 'formatted',
      label: 'Formatted',
    },
  ];

  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  const pages = Math.ceil(rows.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return rows.slice(start, end);
  }, [page, rows]);

  return (
    <>
      <Heading variant="h2">Currency Formatter</Heading>
      <form className="grid max-w-md grid-cols-3 gap-4">
        <Autocomplete
          label="Locale"
          defaultItems={locales}
          defaultSelectedKey="enzUS"
          selectedKey={selectedLocale}
          onSelectionChange={value => {
            setSelectedLocale(value as string);
          }}
        >
          {locale => {
            return (
              <AutocompleteItem key={locale.id} value={locale.tag}>
                {locale.tag}
              </AutocompleteItem>
            );
          }}
        </Autocomplete>
        <Autocomplete
          label="Currency"
          defaultItems={currencies}
          defaultSelectedKey="USD"
          selectedKey={selectedCurrency}
          onSelectionChange={value => {
            setSelectedCurrency(value as string);
          }}
        >
          {currencies.map(currency => {
            return (
              <AutocompleteItem key={currency} value={currency}>
                {currency}
              </AutocompleteItem>
            );
          })}
        </Autocomplete>
        <Input
          type="number"
          value={amount}
          label="Amount"
          onValueChange={value => {
            setAmount(value);
          }}
        />
      </form>
      <Snippet prefix="" className="my-4 max-w-md">
        {formatter.isSuccess
          ? formatter.data.format(Number(amount))
          : formatter.error.message}
      </Snippet>
      <Table
        topContent={<div>Total: {Intl.NumberFormat().format(rows.length)}</div>}
        className="max-w-md"
        aria-label="Currency Formats"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={page => {
                setPage(page);
              }}
            />
          </div>
        }
      >
        <TableHeader columns={columns}>
          {column => {
            return <TableColumn key={column.key}>{column.label}</TableColumn>;
          }}
        </TableHeader>
        <TableBody emptyContent="Loading" items={items}>
          {row => {
            return (
              <TableRow key={`${row.locale}${row.currency}`}>
                {columnKey => {
                  return <TableCell>{getKeyValue(row, columnKey)}</TableCell>;
                }}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
    </>
  );
}
