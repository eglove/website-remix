import { CodeWrapper } from '../components/elements/code-wrapper';
import { Heading } from '../components/elements/heading';
import { Paragraph } from '../components/elements/paragraph';

export default function () {
  return (
    <>
      <Paragraph>What is the timezone of &ldquo;2022-02-22&rdquo;?</Paragraph>
      <Paragraph>
        For the native Date object, it assumes UTC and converts that to your
        system time, theoretically your local time. In the example below,
        I&apos;m using CST. Notice it is not midnight here; it&apos;s 6PM on the
        21st instead of midnight of the 22nd.{' '}
        <span className="font-bold">
          This was converted FROM UTC and TO CST.
        </span>
      </Paragraph>
      <CodeWrapper>
        {[
          "new Date('2022-02-22').toString() // Mon Feb 21 2022 18:00:00 GMT-0600 (Central Standard Time)",
        ]}
      </CodeWrapper>
      <Paragraph>
        It&apos;s very important to note that in all of these cases we are
        dealing with a conversion from one timezone to another. We create the
        date, and convert it to something else to display it. There is never a
        case where this doesn&apos;t happen.
      </Paragraph>
      <Paragraph>
        Using date-fns, it just assumes midnight your local time. Your local
        time is used as the base for the conversion. In this case it{' '}
        <span className="font-bold">converts FROM CST and TO CST.</span> Which
        gives us the illusion of a more intuitive API (more on that later).
      </Paragraph>
      <CodeWrapper>
        {[
          "parseISO('2022-02-22').toString() // Tue Feb 22 2022 00:00:00 GMT-0600 (Central Standard Time)",
        ]}
      </CodeWrapper>
      <Paragraph>
        Luxon does the same thing.{' '}
        <span className="font-bold">It converts FROM CST and TO CST.</span>
      </Paragraph>
      <CodeWrapper>
        {[
          "DateTime.fromISO('2022-02-22').toString() // 2022-02-22T00:00:00.000-06:00",
        ]}
      </CodeWrapper>
      <Heading variant="h3">Explicitly Declared Timezone</Heading>
      <Paragraph>
        If the date time is explicit, the libraries can be accurate and give us
        the correct date. (Spoiler: Always be explicit.)
      </Paragraph>
      <CodeWrapper>
        {[
          "parseISO('2022-02-22T00:00:00.000+00:00').toLocaleString() // // Mon Feb 21 2022 18:00:00 GMT-0600 (Central Standard Time)",
        ]}
      </CodeWrapper>
      <CodeWrapper>
        {[
          "DateTime.fromISO('2022-02-22T00:00:00.000+00:00').toLocaleString() // // 2022-02-21T18:00:00.000-06:00",
        ]}
      </CodeWrapper>
      <Paragraph>
        For native Date, it makes no difference because it was already assuming
        UTC.
      </Paragraph>
      <CodeWrapper>
        {[
          "new Date('2022-02-22T00:00:00.000+00:00').toString() // Mon Feb 21 2022 18:00:00 GMT-0600 (Central Standard Time)",
        ]}
      </CodeWrapper>
      <Paragraph>
        But if we used another timezone with Date we get a correct conversion.
      </Paragraph>
      <CodeWrapper>
        {[
          "new Date('2022-02-22T00:00:00.000+07:00').toString() // Mon Feb 21 2022 11:00:00 GMT-0600 (Central Standard Time)",
        ]}
      </CodeWrapper>
      <Heading variant="h3">Localization</Heading>
      <Paragraph>
        When it comes to localization, we have to remember Date and Intl are two
        different things. This:
      </Paragraph>
      <CodeWrapper>
        {["new Date('2022-02-22').toLocaleString() // 2/21/2022, 6:00:00 PM"]}
      </CodeWrapper>
      <Paragraph>Is the same as this:</Paragraph>
      <CodeWrapper>
        {[
          'new Intl.DateTimeFormat(',
          "\t'en-US'",
          "\t{ dateStyle: 'short', timeStyle: 'long' }",
          ").format(new Date('2022-02-22')) // 2/21/22, 6:00:00 PM CST",
        ]}
      </CodeWrapper>
      <Paragraph>
        .toLocaleString() is not a part of the Date API. The Date API does not
        deal with timezones. While Intl allows us to change the string output
        with a given timezone.{' '}
        <span className="font-bold">
          Date does not support changing timezones.
        </span>
        date-fns does not support this it either without a plugin.
      </Paragraph>
      <CodeWrapper>
        {[
          'new Intl.DateTimeFormat(',
          "\t'en-US',",
          "\t{ dateStyle: 'short', timeStyle: 'long', timeZone: 'Etc/UTC' }",
          ").format(new Date('2022-02-22')) // 2/22/22, 12:00:00 AM UTC",
        ]}
      </CodeWrapper>
      <Heading variant="h3">Never pretend time doesn&apos;t exist.</Heading>
      <Paragraph>
        When a server doesn&apos;t explicitly use UTC timezone in an ISO format,
        it causes confusion. It doesn&apos;t matter if you care about time or
        not. <span className="font-bold">All dates have timezones</span>. If we
        just assume we don&apos;t care about time, we get bad results. The naive
        assumption that we can just use a “date” without time is ignoring how
        time works.
      </Paragraph>
      <Paragraph>
        What happens if I publish a blog post right now on Apr. 8, 2023 at 1:38
        PM but then store the publish date as ‘2023-04-08’? If I use Date to
        display it with locale formatting, it will show as Apr 7, 2023,
        7:00:00PM in central time. Not only is the time completely wrong, but
        even if we only show the date, it will be the wrong date.
      </Paragraph>
      <Paragraph>
        Users in Sao Paulo will see the date as Apr 7, 2023, 9:00:00PM. Sao
        Paulo users should at least be seeing Apr 8, 2023, 2:00:00 AM assuming
        all we lost was the time. (Which we think we don&apos;t care about.)
      </Paragraph>
      <Paragraph>
        The date is still wrong and the time is still off. I stored incomplete
        information and now I have to make guesses about what I intended to
        store in the first place.
      </Paragraph>
      <Heading variant="h3">But I wanna.</Heading>
      <Paragraph>
        Let&apos;s assume we can&apos;t store time and timezone with the
        published date. And even despite that, we want to insist on not treating
        server time as UTC time.{' '}
        <span className="font-bold">
          There&apos;s no such thing as a date without a time and a date without
          a timezone.
        </span>{' '}
        It&apos;s like trying to go up while pretending down doesn&apos;t exist.
      </Paragraph>
      <Paragraph>
        But let&apos;s pretend we want to do something very dumb and say April
        8, 2023 is April 8, 2023 everywhere in the world at the exact same time.
        How can we do that and localize the date string?
      </Paragraph>
      <Paragraph>
        This isn&apos;t easy to get right. With native Date, you have to pretend
        it&apos;s UTC, even if the published date was CST. Which creates
        difficult to read code for the future. Why are we showing this as UTC to
        the users?
      </Paragraph>
      <Paragraph>
        What we&apos;re doing is taking advantage of the fact that Date is dumb
        enough that you can trick it into thinking that dates can exist outside
        of time. We can give it an incomplete date and say, “convert this to
        UTC”. Because Date defaults to assuming a date is UTC, it will convert
        from UTC to UTC.
      </Paragraph>
      <CodeWrapper>
        {[
          "new Date('2023-04-08').toLocaleString(",
          "\t'en-US',",
          "\t{ dateStyle: 'medium', timeStyle: 'medium', timeZone: 'America/Chicago' }",
          ') // Apr 7, 2023, 7:00:00 PM',
        ]}
      </CodeWrapper>
      <Paragraph>
        For our libraries, at first, it seems like they&apos;re being more
        intuitive and getting the right results:
      </Paragraph>
      <CodeWrapper>
        {[
          "parseISO('2023-04-08').toLocaleString('en-US', {",
          "\tdateStyle: 'medium',",
          "\ttimeStyle: 'medium',",
          "\ttimeZone: 'America/Chicago',",
          '}) // Apr 8, 2023, 12:00:00 AM',
        ]}
      </CodeWrapper>
      <CodeWrapper>
        {[
          "DateTime.fromISO('2023-04-08').toLocaleString('en-US', {",
          "\tdateStyle: 'medium',",
          "\ttimeStyle: 'medium',",
          "\ttimeZone: 'America/Chicago',",
          '}) // Apr 8, 2023, 12:00:00 AM',
        ]}
      </CodeWrapper>
      <Paragraph>
        But remember what we know about these libraries from before.{' '}
        <span className="font-bold">
          They assume local time as the date to convert FROM.
        </span>{' '}
        We&apos;re taking the happy path here by creating a CST time and
        converting it to CST. If it were daylight savings time locally (CDT) we
        would again have the wrong date. Or looking at Sao Paulo, we see
        we&apos;re on the wrong date once again.{' '}
        <span className="font-bold">
          Without explicit timezone, we need to interpret this date as the
          timezone we are passing to locale string.
        </span>
      </Paragraph>
      <CodeWrapper>
        {[
          "DateTime.fromISO('2023-04-08').toLocaleString('en-US', {",
          "\tdateStyle: 'medium',",
          "\ttimeStyle: 'medium',",
          "\ttimeZone: 'America/Sao_Paulo',",
          '}) // Apr 8, 2023, 2:00:00 AM',
        ]}
      </CodeWrapper>
      <Paragraph>
        And because libraries default to system time, we need to convert to
        system time. And because .toLocaleString() defaults to system time, all
        we have to do is omit the timezone argument.
      </Paragraph>
      <CodeWrapper>
        {[
          "parseISO('2023-04-08').toLocaleString('en-US', {",
          "\tdateStyle: 'medium',",
          "\ttimeStyle: 'long',",
          '}) // Apr 8, 2023, 12:00:00 AM CDT',
        ]}
      </CodeWrapper>
      <Paragraph>
        I want to stress, these dates are wrong. This is an abuse of these
        tools. And you should never under any circumstance treat dates in this
        manner.
      </Paragraph>
      <Paragraph>
        I don&apos;t think the confusion around dates is due to the lack of
        intuitive APIs. This is due to humans not understanding dates. If we are
        going to show a date for a specific timezone we must know what the
        original timezone was. Without that, we don&apos;t have the information
        needed to display it accurately and we have to guess on origin. When we
        have to guess, it&apos;s often better to guess UTC and make the
        conversion rather than lazily accepting what we receive.
      </Paragraph>
      <Paragraph>
        Date libraries are preferable over native Date, but by using them wrong,
        by using manual formatters like ‘date-fns format()’, for the users,
        we&apos;re not just disrespecting locale formatting, we&apos;re only
        adding to the problem and consistently showing users incorrect dates.
        The irony of convenient libraries is that none of them replace Intl,
        they only wrap around and reexpose these natives tools.
      </Paragraph>
      <Paragraph>
        Moral of the story, whether you think you care about time and timezones
        or not, store them and use them.
      </Paragraph>
    </>
  );
}
