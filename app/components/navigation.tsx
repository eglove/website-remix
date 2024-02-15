import { Avatar } from '@nextui-org/avatar';
import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/navbar';

import { sanityImageBuilder } from '../clients/sanity';
import { A } from './elements/a';
import { Heading } from './elements/heading';

export function Navigation() {
  const gitHubImage = sanityImageBuilder
    .image(
      'https://cdn.sanity.io/images/drccvtog/production/142ef294402ec246152ea3a7344d60e4616625bc-64x64.svg',
    )
    .height(32)
    .width(32)
    .format('webp')
    .url();

  const linkedInImage = sanityImageBuilder
    .image(
      'https://cdn.sanity.io/images/drccvtog/production/82fb4ae75bf3346ea9c654b3ba505476f4864716-550x550.svg',
    )
    .height(32)
    .width(32)
    .format('webp')
    .url();

  return (
    <Navbar className="mx-auto max-w-5xl rounded-none bg-white" isBordered>
      <NavbarBrand>
        <A href="/">
          <Heading className="text-xl" variant="h1">
            EthanG
          </Heading>
        </A>
      </NavbarBrand>
      <NavbarContent justify="end">
        <A href="https://github.com" isExternal>
          <Avatar
            alt="GitHub"
            color="secondary"
            isBordered
            size="sm"
            src={gitHubImage}
          />
        </A>
        <A href="https://www.linkedin.com/in/ethan-glover/" isExternal>
          <Avatar
            alt="LinkedIn"
            color="primary"
            isBordered
            size="sm"
            src={linkedInImage}
          />
        </A>
      </NavbarContent>
    </Navbar>
  );
}
