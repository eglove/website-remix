import type { JSX } from 'react';

import { A } from '../components/elements/a';
import { CodeWrapper } from '../components/elements/code-wrapper';
import { Paragraph } from '../components/elements/paragraph';

export default function TypescriptFormEnums(): JSX.Element {
  return (
    <>
      <Paragraph>
        <A href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input">
          HTML Input Types
        </A>
      </Paragraph>
      <Paragraph>
        <A href="https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete">
          HTML Autocomplete Attributes
        </A>
      </Paragraph>
      <CodeWrapper>
        {[
          'export enum AutoComplete {',
          '  off = "off",',
          '  on = "on",',
          '  name = "name",',
          '  honorificPrefix = "honorific-prefix",',
          '  givenName = "given-name",',
          '  additonalName = "additional-name",',
          '  familyName = "family-name",',
          '  honorificSuffix = "honorific-suffix",',
          '  nickname = "nickname",',
          '  email = "email",',
          '  username = "username",',
          '  newPassword = "new-password",',
          '  currentPassword = "current-password",',
          '  oneTimeCode = "one-time-code",',
          '  organizationTitle = "organization-title",',
          '  organization = "organization",',
          '  streetAddress = "street-address",',
          '  addressLine1 = "address-line1",',
          '  addressLine2 = "address-line2",',
          '  addressLine3 = "address-line3",',
          '  addressLevel4 = "address-level4",',
          '  addressLevel3 = "address-level3",',
          '  addressLevel2 = "address-level2",',
          '  addressLevel1 = "address-level1",',
          '  country = "country",',
          '  countryName = "country-name",',
          '  postalCode = "postal-code",',
          '  ccName = "cc-name",',
          '  ccGivenName = "cc-given-name",',
          '  ccAdditionalName = "cc-additional-name",',
          '  ccFamilyName = "cc-family-name",',
          '  ccNumber = "cc-number",',
          '  ccExp = "cc-exp",',
          '  ccExpMonth = "cc-exp-month",',
          '  ccExpYear = "cc-exp-year",',
          '  ccCsc = "cc-csc",',
          '  ccType = "cc-type",',
          '  transactionCurrency = "transaction-currency",',
          '  transactionAmount = "transaction-amount",',
          '  language = "language",',
          '  bday = "bday",',
          '  bdayDay = "bday-day",',
          '  bdayMonth = "bday-month",',
          '  bdayYear = "bday-year",',
          '  sex = "sex",',
          '  tel = "tel",',
          '  telCountryCode = "tel-country-code",',
          '  telNational = "tel-national",',
          '  telAreaCode = "tel-area-code",',
          '  telLocal = "tel-local",',
          '  telExtension = "tel-extension",',
          '  impp = "impp",',
          '  url = "url",',
          '  photo = "photo"',
          '}',
        ]}
      </CodeWrapper>
      <CodeWrapper>
        {[
          'export enum InputTypes {',
          '  button = "button",',
          '  checkbox = "checkbox",',
          '  color = "color",',
          '  date = "date",',
          '  datetimeLocal = "datetime-local",',
          '  email = "email",',
          '  file = "file",',
          '  hidden = "hidden",',
          '  image = "image",',
          '  month = "month",',
          '  number = "number",',
          '  password = "password",',
          '  radio = "radio",',
          '  range = "range",',
          '  reset = "reset",',
          '  search = "search",',
          '  submit = "submit",',
          '  tel = "tel",',
          '  text = "text",',
          '  time = "time",',
          '  url = "url",',
          '  week = "week"',
          '}',
        ]}
      </CodeWrapper>
    </>
  );
}
