"use client";

import type { NextPage } from "next";
import { JsonLD } from "~~/components/helpers/JsonLD";

const DonatePage: NextPage = () => {
  return (
    <>
      <article className="px-4 mx-auto mt-8 mb-12 prose lg:prose-lg md:px-0">
        <h1 className="flex flex-col">
          <span className="font-thin text-md xl:text-xl">Ready for a Bible on the blockchain?</span>Donations would help
        </h1>
        <blockquote>
          The Bible started by being spoken, then moved onto stone and paper … now, there are Bibles on websites and
          Bibles on apps. We have ALWAYS transferred the Bible over to new technologies.
        </blockquote>
        <p className="lead">
          This project is <em>not</em> currently funded, and it has a grand total of &mdash; one developer.{" "}
        </p>
        <p className="lead">
          <em>If you wish to donate</em>, simply send funds to:{" "}
        </p>
        <ul>
          <li>
            <strong>websculpt.eth</strong>
          </li>
          <li>
            <strong className="break-all">0x1e7aAbB9D0C701208E875131d0A1cFcDAba79350</strong>
          </li>
        </ul>
        <p>My most-sincere feeling of gratitude goes to anyone wanting to help out.</p>
        <p className="font-semibold text-md xl:text-2xl text-primary-content">
          In terms of people, this project currently needs:
        </p>
        <ul>
          <li>
            People spreading the site around{" "}
            <em>
              ("<strong>Gospel Onchain Dot Com</strong>")
            </em>
          </li>
          <li>Senior-level TS React skills</li>
          <li>A git maintainer</li>
          <li>Contract dev(s)</li>
          <li>A fresh Web Design</li>
          <li>An SEO consultation or two</li>
          <li>Help with copy</li>
          <li>Help with photos/graphics/videos</li>
          <li>A director (my assistant) that can help manage everything not-code</li>
          <li>
            <em>Long Term: </em>Protocol devs for a new protocol...
          </li>
        </ul>
        <h4>
          No, I can't afford to pay you, but with enough outreach &mdash; this is the sort of idea that can get funded.
        </h4>
        <p>
          <strong>So, if you are interested</strong> in the <em>possibility of getting paid</em> then you are in luck{" "}
          <em>
            because I would be <strong>happy</strong> to pay you
          </em>
          , if some people would be nice enough to fund this.{" "}
        </p>
      </article>

      <JsonLD
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "webpage",
          name: "Donate to this project",
          description:
            "You can support this project today! Become a part of history, help put the Bible on the blockchain.",
        }}
      />
    </>
  );
};

export default DonatePage;
