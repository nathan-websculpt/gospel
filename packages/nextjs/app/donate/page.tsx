"use client";

import type { NextPage } from "next";

const DonatePage: NextPage = () => {
  return (
    <>
      <article className="px-4 mx-auto mt-8 mb-12 prose lg:prose-lg md:px-0">
        <h1>Donations would help</h1>
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
        <h3>This project currently needs:</h3>
        <ul>
          <li>People spreading the site around</li>
          <li>Senior-level TS React skills</li>
          <li>A master at git</li>
          <li>Contract dev(s)</li>
          <li>Help with copy</li>
          <li>Help with photos/graphics/videos</li>
          <li>A director (my assistant) that can help manage everything not-code</li>
        </ul>
        <h4>
          No, I can't afford to pay you, but with enough people &mdash; this is the sort of thing that gets funded. If
          this can't get funded, we should give up anyway.
        </h4>
        <p>
          <strong>So, if you are interested</strong> in the <em>possibility of getting paid</em> then you are in luck{" "}
          <em>
            because I would be <strong>happy</strong> to pay you
          </em>
          , if some people would be nice enough to fund this.{" "}
        </p>
      </article>
    </>
  );
};

export default DonatePage;
