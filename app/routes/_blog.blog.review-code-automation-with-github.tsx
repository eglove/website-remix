import { A } from '../components/elements/a';
import { Paragraph } from '../components/elements/paragraph';

export default function () {
  return (
    <>
      <Paragraph>
        Andrei Neagoie&apos;s Complete Junior to Senior course does a great job
        of covering a lot of topics. Including automating tests with CI/CD
        through CircleCI. However, a lot of people have been moving away from
        tools like CircleCI in favor of GitHub actions.
      </Paragraph>
      <Paragraph>
        You might not be using GitHub at work and instead using GitLab or
        BitBucket, but GitHub actions are the best way to handle CI today. Most
        tasks can be done by grabbing an action off the marketplace and plugging
        it in to a YML file.
      </Paragraph>
      <Paragraph>
        Brian Douglas&apos; course takes one small step forward by going over
        how to code your own GitHub apps and actions. Which can help you develop
        custom solutions for the repositories you manage.
      </Paragraph>
      <Paragraph>
        The course itself feels pretty basic. You won&apos;t be building a big
        pipeline. Rather, this is just a short overview of what you can do and
        how to do it. That&apos;s generally ok for the subject but I would have
        liked to see something more robust.
      </Paragraph>
      <Paragraph>
        Brian&apos;s delivery sometimes comes off as unprepared as he has to
        double back on his own words a lot and I would have liked a summary of
        what he was going to cover from the start. As I watched through the
        videos I had no idea where things were going or if this whole endeavor
        would even be worth my time.
      </Paragraph>
      <Paragraph>
        But if you&apos;re not already familiar with GitHub actions I definitely
        recommend this course. That&apos;s why I&apos;m giving Brian
        Douglas&apos;{' '}
        <A
          href="https://leveluptutorials.com/tutorials/code-automation-with-github"
          isExternal
        >
          Code Automation With GitHub
        </A>{' '}
        a 4 out of 5.
      </Paragraph>
    </>
  );
}
