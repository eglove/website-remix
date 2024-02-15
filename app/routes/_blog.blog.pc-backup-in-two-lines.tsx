import { A } from '../components/elements/a';
import { CodeWrapper } from '../components/elements/code-wrapper';
import { Paragraph } from '../components/elements/paragraph';

export default function () {
  return (
    <>
      <Paragraph>
        I backed up my entire PC setup with two lines of PowerShell code that I
        store on a USB.
      </Paragraph>
      <CodeWrapper language="powershell">
        {[
          'Start-BitsTransfer -Source https://raw.githubusercontent.com/eglove/PSScripts/master/pcSetup.ps1 -Destination script.ps1',
          '',
          'Invoke-Expression‘.\\script.ps1’',
        ]}
      </CodeWrapper>
      <Paragraph>
        Maybe not exactly two lines of code. Maybe it&apos;s two lines to
        download the actual script which happens to be around 144 lines. I
        wouldn&apos;t want to store that on a USB for obvious reasons. If I
        update it, it&apos;s not up to date on the USB. And I&apos;m definitely
        not going to bother to update it in two places.
      </Paragraph>
      <Paragraph>
        So what exactly does the{' '}
        <A
          href="https://github.com/eglove/ethang-one/blob/master/apps/computer-cli/src/app/commands/powershell-scripts/pcSetup.ps1"
          isExternal
        >
          actual script
        </A>{' '}
        do? Well, the first step is the most important step and the one that
        made me realize I could write this script, to begin with. It installs
        <A
          href="https://github.com/eglove/ethang-one/blob/68a44f7ab7e4abd912a50ad56fee3bfd9d604622/apps/computer-cli/src/app/commands/powershell-scripts/pcSetup.ps1#L46"
          isExternal
        >
          Chocolatey Pro
        </A>{' '}
        including copying over the license file that&apos;s also kept on the
        same USB.
      </Paragraph>
      <Paragraph>
        Second, while I&apos;m there, I may as well{' '}
        <A
          href="https://github.com/eglove/ethang-one/blob/68a44f7ab7e4abd912a50ad56fee3bfd9d604622/apps/computer-cli/src/app/commands/powershell-scripts/pcSetup.ps1#L54"
          isExternal
        >
          set up WSL 2 and Ubuntu
        </A>
        . The tricky part I realized during the process of writing this is that
        even though chocolatey adds its own environment variables, as well as
        the variables of the software it will later install, that&apos;s not
        available in the current session of PowerShell. This also means the
        choco command isn&apos;t available in that current session.
      </Paragraph>
      <Paragraph>
        So, after downloading and installing WSL I had to open up a new
        PowerShell window, install it via Chocolatey, then start Ubuntu so that
        I could set up a new user. Every subsequent choco or GitHub CLI command
        had to be run in its own PowerShell instance.
      </Paragraph>
      <Paragraph>
        With that done, it&apos;s just a matter of{' '}
        <A
          href="https://github.com/eglove/ethang-one/blob/68a44f7ab7e4abd912a50ad56fee3bfd9d604622/apps/computer-cli/src/app/commands/powershell-scripts/pcSetup.ps1#L69"
          isExternal
        >
          installing all the software I have listed in an array
        </A>{' '}
        via Chocolatey. As well as any PowerShell modules I use, and yarn global
        installs.
      </Paragraph>
      <Paragraph>
        And I couldn&apos;t forget to{' '}
        <A
          href="https://github.com/eglove/ethang-one/blob/68a44f7ab7e4abd912a50ad56fee3bfd9d604622/apps/computer-cli/src/app/commands/powershell-scripts/pcSetup.ps1#L85"
          isExternal
        >
          download, install, and set an environment variable for all my other
          scripts
        </A>
        . But I couldn&apos;t just download them. I had to git clone them. Via
        the GitHub client. This means I had to install gh cli and authenticate
        it before moving on. This sets me up for GitHub commands in the future.
      </Paragraph>
      <Paragraph>
        But why stop there? Cortana is still active. My toolbar isn&apos;t set
        up as I like it. That can all be done by changing Registry settings.
        Which can be set via PowerShell. So I{' '}
        <A
          href="https://github.com/eglove/ethang-one/blob/68a44f7ab7e4abd912a50ad56fee3bfd9d604622/apps/computer-cli/src/app/commands/powershell-scripts/pcSetup.ps1#L98"
          isExternal
        >
          applied any Windows settings
        </A>{' '}
        I wanted to save.
      </Paragraph>
      <Paragraph>
        And while I have a script to update software, I allow the JetBrains
        toolbox to handle IDE updates and generate shell scripts. So I{' '}
        <A
          href="https://github.com/eglove/ethang-one/blob/68a44f7ab7e4abd912a50ad56fee3bfd9d604622/apps/computer-cli/src/app/commands/powershell-scripts/pcSetup.ps1#L109"
          isExternal
        >
          updated those settings
        </A>{' '}
        as well as the theme and any other settings I have set on IntelliJ. And
        settings for terminus, can&apos;t forget to backup my{' '}
        <A
          href="https://github.com/eglove/ethang-one/blob/68a44f7ab7e4abd912a50ad56fee3bfd9d604622/apps/computer-cli/src/app/commands/powershell-scripts/pcSetup.ps1#L115"
          isExternal
        >
          terminus settings
        </A>
        .
      </Paragraph>
      <Paragraph>
        All wrapping up in a{' '}
        <A
          href="https://github.com/eglove/ethang-one/blob/68a44f7ab7e4abd912a50ad56fee3bfd9d604622/apps/computer-cli/src/app/commands/powershell-scripts/pcSetup.ps1#L120"
          isExternal
        >
          clean up process
        </A>{' '}
        by doing an initial windows update for the clean install, removing any
        desktop shortcuts generated by the choco installs, running cleanmgr to
        allow a safe delete of Windows.old and deleting the downloads for WSL
        and the initial script off the USB.
      </Paragraph>
      <Paragraph>
        I love this little script. Everything backed up in just the way I want
        it, ready for a fresh Windows install at any time. I honestly wish I had
        an excuse to run it more often.
      </Paragraph>
    </>
  );
}
