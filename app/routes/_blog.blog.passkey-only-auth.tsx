import { Image } from '@nextui-org/image';

import { sanityImageBuilder } from '../clients/sanity';
import { A } from '../components/elements/a';
import { Blockquote } from '../components/elements/blockquote';
import { CodeWrapper } from '../components/elements/code-wrapper';
import { Heading } from '../components/elements/heading';
import { Paragraph } from '../components/elements/paragraph';

export default function () {
  return (
    <>
      <Paragraph>
        What if your app&apos;s sign in and sign up form both looked like this?
      </Paragraph>
      <Image
        alt="Sign Up/In form with only a username field"
        height={200}
        src={sanityImageBuilder
          .image(
            'https://cdn.sanity.io/images/drccvtog/production/7c724fc022bfb4bc8541d9851eeae96c68be9f70-483x183.png',
          )
          .height(200)
          .width(528)
          .format('webp')
          .url()}
        width={528}
      />
      <Paragraph>
        I&apos;m working on rebuilding Introspect.dev from scratch with Astro
        after some{' '}
        <A href="/blog/moving-away-from-vercel">
          major disappointments with NextJS 13
        </A>
        and the direction app router is taking. Astro has been a huge boost for
        me and I find it to be the meta-framework that I wished NextJS was. UI
        library agnostic, simple and clear APIs, easy build outputs deployable
        anywhere.
      </Paragraph>
      <Paragraph>
        Originally with Introspect I was using Clerk.dev for authentication
        because Vercel had advertised them as an early supporter of app router.
        It turned out to be one of the many bottlenecks on that site. I&apos;ve
        never really liked OAuth and it&apos;s implementation, but Clerk made it
        easy. I thought about bringing that over to the new site, but after
        playing around with it, it&apos;s actually kind of difficult to get it
        working with plain JS.
      </Paragraph>
      <Paragraph>
        So I went back to my default. Just simple password signups and hashing.
        But then I came across something I&apos;ve been reading about for a
        while again. PassKeys and webauthn. I&apos;m already using PassKeys to
        sign in to GitHub without a password. It&apos;s like skipping straight
        to 2FA without typing in the password first.
      </Paragraph>
      <Blockquote link="https://web.dev/passkey-registration/" source="web.dev">
        Using{' '}
        <A
          href="https://developers.google.com/identity/passkeys"
          isExternal
          showAnchorIcon
        >
          passkeys
        </A>
        instead of passwords is a great way for websites to make their user
        accounts safer, simpler, easier to use and passwordless. With a passkey,
        a user can sign in to a website or an app just by using their
        fingerprint, face or device PIN.
      </Blockquote>
      <Heading variant="h3">The Auth Flow</Heading>
      <Paragraph>
        It took me some tinkering to figure out how this all comes together. It
        seems a bit complex to have to set up 2 API endpoints for a sign-in, and
        2 API endpoints for a sign-up. But once you get it all together it makes
        a lot more sense. And each step isn&apos;t difficult to abstract out
        thanks to the @simplewebauthn NPM packages.
      </Paragraph>
      <Image
        alt="Flowchart showing the steps we will discuss below"
        height={384}
        src={sanityImageBuilder
          .image(
            'https://cdn.sanity.io/images/drccvtog/production/34ca5aefa1f560e1c287f49252dde838b31d0aa2-546x481.png',
          )
          .width(436)
          .height(384)
          .format('webp')
          .url()}
        width={436}
      />
      <Paragraph>
        <span className="font-bold">1. Check for Existing Users:</span> Given
        the form above with &lsquo;Check Username&rsquo; I do a simple database
        lookup to see if a user already exists with that username. This tells me
        if the user is signing up, or in.
      </Paragraph>
      <Paragraph>
        <span className="font-bold">
          2. Generate Registration Options (Start Sign Up):
        </span>{' '}
        Part of how this works is I have to create a user in the database first
        before creating authentication. This may not be necessary for you, for
        me the only reason is because I want to use the generated UUID on that
        user as a userID for the credentials. After the credentials are created,
        I&apos;ll have to update that user again with the challenge provided by
        the credentials.
      </Paragraph>
      <Image
        alt="If the user is not found after clicking check username, two buttons appear to try another or sign up."
        src={sanityImageBuilder
          .image(
            'https://cdn.sanity.io/images/drccvtog/production/a1e75e6c29ab6f3642355b53ba234214c833158c-482x176.png',
          )
          .width(438)
          .height(160)
          .format('webp')
          .url()}
      />
      <CodeWrapper>
        {[
          `const user = await context.prisma.user.create({`,
          `  data: { username }`,
          `});`,
        ]}
      </CodeWrapper>
      <CodeWrapper>
        {[
          "import { generateRegistrationOptions } from '@simplewebauthn/server';",
          '',
          'const options = await generateRegistrationOptions({',
          "  attestationType: 'none',",
          '  excludeCredentials: user.authenticators.map(authenticator => {',
          '    return {',
          '      id: base64urlDecode(authenticator.credentialID),',
          '      transports:',
          '        authenticator.transports,',
          "      type: 'public-key',",
          '    };',
          '  }),',
          '  rpID: relyingPartyId,',
          '  rpName: relyingPartyName,',
          '  userID: user.id,',
          '  userName: user.username,',
          '});',
        ]}
      </CodeWrapper>
      <CodeWrapper>
        {[
          'await context.prisma.user.update({',
          '  data: {',
          '    currentChallenge: options.challenge,',
          '  },',
          '  where: {',
          '    username,',
          '  },',
          '});',
        ]}
      </CodeWrapper>
      <Paragraph>
        So the only things I&apos;m storing so far is a username and a
        challenge, and the only thing the user has had to give me is a username.
        The &ldquo;challenge&rdquo; here is just a server generated ArrayBuffer
        that will later be stored as a base64 encoded string.
      </Paragraph>
      <Paragraph>
        <span className="font-bold">
          3. Start Registration (Client Generated Key):
        </span>{' '}
        Now we just need the browser to take the generated options to generate a
        public key. This requires no more input from the user, it is essentially
        using <code>navigator.credentials.create()</code>. Then we just take the
        client generated credentials and relay that right back to the server.
      </Paragraph>
      <CodeWrapper>
        {[
          "import { startRegistration } from '@simplewebauthn/browser';",
          '',
          '// Pseudocode',
          "const data = await fetch('/generate-registration-options', ",
          '  { body: JSON.stringify({username}) }',
          ');',
          '',
          'const registration = await startRegistration(data);',
          '',
          '// Pseudocode',
          "await fetch('/verify-registration-response',",
          '  { body: JSON.stringify(registration) }',
          ');',
        ]}
      </CodeWrapper>
      <Paragraph>
        <span className="font-bold">
          4. Verify Registration Response (Finish Registration):
        </span>{' '}
        Finally we can verify the client generated credentials with the users
        current challenge and add some other identifying information like origin
        and relying party id.
      </Paragraph>
      <CodeWrapper>
        {[
          "import { verifyRegistrationResponse } from '@simplewebauthn/server';",
          '',
          'const user = await prisma.user.findUnique({',
          '  where: {',
          '    username,',
          '  },',
          '});',
          '',
          'const verification = await verifyRegistrationResponse({',
          '  expectedChallenge: user.currentChallenge, // Saved to database in step 2',
          "  expectedOrigin: 'http://localhost:3000', // App origin",
          "  expectedRPID: 'localhost', // App hostname",
          '  response: registration, // Results from startRegistration() in previous step',
          '});',
          '',
          'const { registrationInfo } = verification;',
          'const {',
          '  credentialBackedUp,',
          '  credentialDeviceType,',
          '  credentialPublicKey,',
          '  credentialID,',
          '  counter,',
          '} = registrationInfo;',
          '',
          '// Save authenticator data for sign in verification later',
          'await prisma.authenticator.create({',
          '  data: {',
          '    counter, // Number tracks how often device is used, helps find bad actors',
          '    credentialBackedUp, // Boolean',
          "    credentialDeviceType, // 'singleDevice' | 'multiDevice'",
          '    credentialID: base64urlEncode(credentialID), // Uint8Array stored as base64',
          '    credentialPublicKey: Buffer.from(credentialPublicKey), // Uint8Array stored as Blob/Bytes',
          '    userId: user.id, // UUID/PK from our own Users table',
          '  },',
          '});',
        ]}
      </CodeWrapper>
      <Paragraph>
        Once verification is successful, we can safely log the user in. Such as
        signing a JWT token and setting a cookie. Their identity has been
        verified by encrypted keys and a handshake between two physical devices.
        Our server, and their phone or computer. They&apos;ll be able to sign in
        in the future with a fingerprint or PIN code on their device. We
        don&apos;t have to save a password, or sync an id from a third party
        service. All we need is a username. Which brings us to signing in.
      </Paragraph>
      <Paragraph>
        <span className="font-bold">
          5. Generate Authentication Options (Start Sign In):
        </span>{' '}
        At this stage, all we have to do is prompt the user to sign in with
        their device, and verify it&apos;s public keys with the authenticators
        the user has previously used.
      </Paragraph>
      <Image
        alt="If a user exists, the user is given the option to click sign in to prompt their device for authentication"
        className="h-40 w-full"
        src={sanityImageBuilder
          .image(
            'https://cdn.sanity.io/images/drccvtog/production/655915a17e61c8d5046254ab983378e76a017eae-472x161.png',
          )
          .width(469)
          .height(160)
          .format('webp')
          .url()}
      />
      <CodeWrapper>
        {[
          "import { generateAuthenticationOptions } from '@simplewebauthn/server';",
          '',
          'const user = await context.prisma.user.findUnique({',
          '  select: {',
          '    authenticators: {',
          '      select: {',
          '        credentialID: true,',
          '        transports: true,',
          '      },',
          '    },',
          '  },',
          '  where: { username },',
          '});',
          '',
          'const options = await generateAuthenticationOptions({',
          '  allowCredentials: authenticators.map(authenticator => { // Allow any previously used devices',
          '    return {',
          '      id: base64urlDecode(authenticator.credentialID), // We encoded this Uint8Array earlier',
          '      transports: authenticator.transports,',
          "      type: 'public-key',",
          '    };',
          '  }),',
          "  userVerification: 'preferred',",
          '});',
          '',
          'await context.prisma.user.update({',
          '  data: {',
          '    currentChallenge: options.challenge, // Update to a new challenge string to use on next sign in',
          '  },',
          '  where: {',
          '    username,',
          '  },',
          '});',
        ]}
      </CodeWrapper>
      <Paragraph>
        <span className="font-bold">
          6. Start Authentication (Client Generated Key):
        </span>{' '}
        Very similar to how we generated a key on the client during sign up, we
        just do the same for sign in and relay back to the server. No more user
        input needed other than using the fingerprint on their phone, or PIN on
        their computer.
      </Paragraph>
      <CodeWrapper>
        {[
          "import { startAuthentication } from '@simplewebauthn/browser';",
          '',
          '// Pseudocode',
          "const data = await fetch('/generate-authentication-options', ",
          '  { body: JSON.stringify({username}) }',
          ');',
          '',
          'const authentication = await startAuthentication(data);',
          '',
          '// Pseudocode',
          "await fetch('/verify-authentication-response',",
          '  { body: JSON.stringify(authentication) }',
          ');',
        ]}
      </CodeWrapper>
      <Paragraph>
        <span className="font-bold">
          7. Verify Registration Response (Finish Sign In):
        </span>{' '}
        And again, very similar to the sign up process, we check the users
        current challenge to the device generated key and make sure the origin
        is the same.
      </Paragraph>
      <CodeWrapper>
        {[
          "import { verifyRegistrationResponse } from '@simplewebauthn/server';",
          '',
          'const user = await prisma.user.findUnique({',
          '  where: {',
          '    username,',
          '  },',
          '});',
          '',
          'const authenticator = user.authenticators.filter(',
          '  // Users can have multiple authenticators',
          '  // Filter this to find the one that matches the data.id',
          ' // (data is from the client sent by the previous step)',
          ');',
          '',
          'const verification = await verifyRegistrationResponse({',
          '  authenticator: {',
          '    counter: authenticator.counter,',
          '    credentialID: base64urlDecode(authenticator.credentialID),',
          '    credentialPublicKey: authenticator.credentialPublicKey,',
          '    transports: authenticator.transports,',
          '  },',
          '  expectedChallenge: user.currentChallenge,',
          "  expectedOrigin: 'http://localhost:3000',",
          "  expectedRPID: 'localhost',",
          '  response: data,',
          '});',
          '',
          'await context.prisma.authenticator.update({',
          '  data: {',
          '    counter: authenticationInfo.newCounter,',
          '  },',
          '  where: {',
          '    id: authenticator.id,',
          '  },',
          '});',
        ]}
      </CodeWrapper>
      <Paragraph>
        Same as with sign up, from here it&apos;s safe to generate a JWT token
        with an expires time and set a cookie.
      </Paragraph>
      <Paragraph>
        When I first read about this, it felt like a lot of complicated steps.
        But honestly this is so much easier than OAuth. Setting up app keys with
        multiple APIs, callback endpoints, ugh. I am not a fan. webauthn is a
        standard supported by every major browser. No third parties needed.
        We&apos;re making use of the native{' '}
        <A
          href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API"
          isExternal
          showAnchorIcon
        >
          Web Authentication API
        </A>
        .
      </Paragraph>
      <Paragraph>
        Should every site be using this? I&apos;m not sure. While GitHub and
        Google both make use of PassKeys, accounts still fallback on passwords.
        That will always be the case for at the very least for the accounts used
        to login to devices. So basically the same companies we&apos;re using
        for OAuth. Google, Microsoft and Apple. But the benefit to this for
        other apps is, you don&apos;t have to deal with their APIs.
      </Paragraph>
    </>
  );
}
