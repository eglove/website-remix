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
    <Navbar isBordered className="mx-auto max-w-5xl rounded-none bg-white">
      <NavbarBrand>
        <A href="/">
          <Heading className="text-xl" variant="h1">
            EthanG
          </Heading>
        </A>
      </NavbarBrand>

      <NavbarContent justify="end">
        <A isExternal href="https://github.com">
          <Avatar
            isBordered
            alt="GitHub"
            color="secondary"
            size="sm"
            src={gitHubImage}
          />
        </A>

        <A isExternal href="https://www.linkedin.com/in/ethan-glover/">
          <Avatar
            isBordered
            alt="LinkedIn"
            color="primary"
            size="sm"
            src={linkedInImage}
          />
        </A>
      </NavbarContent>
    </Navbar>
  );
}
