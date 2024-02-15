import type { JSX } from 'react';

import { A } from '../components/elements/a';
import { Paragraph } from '../components/elements/paragraph';

export default function StackoverflowNotHelpForum(): JSX.Element {
  return (
    <>
      <Paragraph>
        StackOverflow has for a very long time been described as{' '}
        <A href="https://www.reddit.com/r/webdev/comments/7szv7i/anyone_else_find_the_stack_overflow_community/">
          toxic
        </A>{' '}
        and{' '}
        <A href="https://meta.stackexchange.com/questions/342779/what-about-the-community-is-toxic-to-new-users">
          unwelcoming
        </A>{' '}
        to beginners. Or really unwelcoming to anyone that is not very deep into
        StackOverflow&apos;s very specific niche rules and mentality.
      </Paragraph>
      <Paragraph>
        The chances of being able to ask a simple question and get genuine help
        or an answer are very low. You can spend multiple days working to ask
        the perfect question. You can follow every rule laid out in this{' '}
        <A href="https://stackoverflow.com/help/how-to-ask">
          1,281 word article
        </A>{' '}
        and{' '}
        <A href="https://codeblog.jonskeet.uk/2010/08/29/writing-the-perfect-question/">
          this referenced 3,141 word article
        </A>
        . But your question is still most likely to be downvoted, locked, and
        peppered with petty complaints by &ldquo;mods&rdquo; and &ldquo;super
        users.&rdquo;
      </Paragraph>
      <Paragraph>
        What StackOverflow is trying to do, in theory, makes sense. As the{' '}
        <A href="https://stackoverflow.com">homepage says</A>, StackOverflow is,
        &ldquo;A public platform building the definitive collection of coding
        questions & answers.&rdquo;
      </Paragraph>
      <Paragraph>
        Meaning, StackOverflow is not a QA forum. It is meant to be a place
        where specific questions have definitive answers. As with Wikipedia,
        duplicate pages are not allowed, spelling errors are regularly fixed,
        and anything that doesn&apos;t follow a specific format and standard is
        removed.
      </Paragraph>
      <Paragraph>
        The idea that there can be an encyclopedia for very specific questions
        about code is, to me, a fundamentally flawed one. Code evolves too
        often. There&apos;s an infinite number of problems and an infinite
        number of solutions. The idea just doesn&apos;t make sense. Beginners
        need to be able to ask &ldquo;stupid questions&rdquo; until those
        neurons start to connect in a way that they can start creating smart
        solutions.
      </Paragraph>
      <Paragraph>
        But for the top percentage of SO users, this idea of SO being an
        encyclopedia instead of a forum must be protected at all costs. This is
        what makes it feel so toxic and unwelcoming. You can&apos;t just ask a
        question and get an answer. You instead must contribute to this
        encyclopedia of definitive questions and definitive answers.
      </Paragraph>
      <Paragraph>
        Today&apos;s developers are better off with using tools like CoPilot,
        CodeWhisperer, TabNine, or Kite to get inline suggestions for languages
        they are unfamiliar with. These provide better feedback and cost less
        time than trying to force an SO answer on your particular project or
        spending days trying to formulate the perfect encyclopedic question.
      </Paragraph>
      <Paragraph>
        This may be my personal Google history, but overtime I have started to
        see more results for GitHub issues than StackOverflow when looking for
        different problems.
      </Paragraph>
      <Paragraph>
        I think package and library maintainers of OSS on GitHub are far more
        welcoming and of course far more helpful than their SO counterparts.
        However, this starts to create a lot of noise. For maintainers, issues
        are meant to be for legitimate bug reports and feature requests. Not for
        issues beginners have with using their library. So when asking
        questions, people are often redirected to a Discord channel or help
        forum specific to the team that&apos;s maintaining the repo.
      </Paragraph>
      <Paragraph>
        This is great, but there&apos;s still a problem. Having to hunt down the
        appropriate place to ask questions for every tool. It&apos;s not always
        obvious where you&apos;re supposed to go to get a simple answer to a
        simple question.
      </Paragraph>
      <Paragraph>
        I feel like GitHub could solve this problem well. By creating a general
        forum that can reference specific repositories. This allows package
        maintainers to watch questions about their work without burying
        important issues. And it allows people to help one another without
        following specific repo conversations.
      </Paragraph>
      <Paragraph>
        The world of getting help with code online is a bit fractured, it&apos;s
        hard to know where to go. StackOverflow is no longer a sensible option.
        Reddit is... it&apos;s Reddit, always has been. It would be nice to see
        a very popular platform like GitHub take on the challenge of creating a
        safe space for developers to get help and help one another.
      </Paragraph>
    </>
  );
}
