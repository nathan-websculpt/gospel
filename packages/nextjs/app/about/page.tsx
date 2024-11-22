"use client";

import type { NextPage } from "next";
import { JsonLD } from "~~/components/helpers/JsonLD";

const AboutPage: NextPage = () => {
  return (
    <>
      <div className="flex w-full px-4 mx-auto xl:w-3/5 xl:justify-center bg-slate-900 xl:bg-opacity-75">
        <p className="prose text-white xl:text-lg">
          UPDATE: The entire KJV Bible is now available onchain!!!!
          <br />
          I am almost certain that this is the first time in history that the Bible was stored directly on the
          blockchain. <br /> &mdash; Nov. 21st, 2024
        </p>
      </div>

      <article className="px-4 mx-auto mt-8 mb-12 prose lg:prose-lg md:px-0">
        <h1>Books onchain</h1>
        <p className="lead">
          Those that are involved in blockchain feel that one of the main reasons that the blockchain will go mainstream
          is the fact that &mdash; once stored &mdash; data can be made-such that it can never be changed again.
        </p>
        <p className="font-semibold text-md xl:text-2xl text-primary-content">I think that this is great for:</p>
        <ul>
          <li>books</li>
          <li>novellas</li>
          <li>poems</li>
          <li>government documentation</li>
          <li>written-works</li>
          <li>religious-works</li>
          <li>anything that we do not want to ever become censored</li>
        </ul>
        <p className="font-semibold text-primary-content">
          In short: There could be a blockchain version of a book that is unchangeable (immutable).
        </p>
        <p>
          <strong>Perhaps this is not a necessity</strong> for the <em>majority of books</em> that are likely to never
          fall <em>victim to censorship</em>; <strong>however</strong>, there are aspects of our history that show us
          that we may need to <em>protect what we have written down</em>.{" "}
        </p>
        <h2>This project works well enough for proof-of-concept</h2>
        <h2 className="text-2xl font-extrabold xl:text-5xl">But it is not truly up to the task</h2>
        <p>
          I think that ideally we would want the ability for multiple people to vote on the validity of a sentence (or
          verse) before it is saved. I have other projects that utilize this sort of functionality (proposals and
          voting), and they could be brought into a scenario like this one (storing the Bible or any other book).
        </p>
        <a href="https://github.com/nathan-websculpt/council" target="_blank" className="link">
          View progress on the Council Project
        </a>
        <blockquote>
          Why is it a good idea to have people voting on its validity <em>before</em> a verse/sentence is saved?
        </blockquote>
        <h3>
          Because one of the best attributes of the blockchain (for this project in particular) is the immutability.
        </h3>
        <h2 className="text-2xl font-extrabold pt-14 xl:text-5xl">The idea being...</h2>
        <p className="lead">
          Rather than having the ability to edit lines if mistakes are made &mdash; plan to prevent mistakes from being
          possible. I think it would be better to allow people to vote on the text (verse-by-verse/sentence-by-sentence)
          before anything is saved. Sound crazy? Recall that I said, “…this is not a necessity for the majority of
          books.”{" "}
        </p>
        <h2 className="text-2xl font-extrabold xl:text-5xl">This is more than just censor-proofing books</h2>
        <p>
          <strong>The blockchain</strong> could also allow us to timestamp the moment a group of people agreed that this
          is the Bible (or any other book) as we knew it in our time.{" "}
        </p>
        <h2>Imagine where the world would be if we were able to keep records in this way thousands of years ago</h2>
        <p>
          Well, why not start now? It cost around $30 (in a total of 9 transactions) to upload the first book (Gospel of
          John), so the four gospels aren’t prohibitively expensive.
          <br />
          <br />
          <span className="font-bold">
            Nov. 21, 2024 Update: The first book ended up being the most expensive. Saving 100-verse batches ranged from
            ~$0.02 to ~$1.10 when I finished.
          </span>
          <br />
          <br />I know that I was curious as to exactly how much it would cost, so I hope that information feeds the
          curiosity of blockchain devs out there. Side Note: I also have plans to tackle items like The Declaration of
          Independence. <span> </span>
          <a href="https://twitter.com/sculpt_web" target="_blank" className="link">
            Tweet your suggestions for other documents to me here
          </a>
          .
        </p>
        <h3>Other links...</h3>
        <ul>
          <li>
            <a
              href="https://github.com/nathan-websculpt/gospel/tree/_0_vercel_op_mainnet"
              target="_blank"
              className="link"
            >
              Deployed Project Github
            </a>
          </li>
          <li>
            <a href="https://github.com/nathan-websculpt" target="_blank" className="link">
              My Github
            </a>
          </li>
          <li>
            <a
              href="https://optimistic.etherscan.io/address/0x3dce29F3444E4Fe00F47883C8CC2c9847bAb8e3f"
              target="_blank"
              className="link"
            >
              Contract on Optimism
            </a>
          </li>
          <li>
            <a
              href="https://optimistic.etherscan.io/tx/0x01502c020740e17cebbc5584d5858cad3c5efe176974470b9f5dd893ebf01ab6"
              target="_blank"
              className="link"
            >
              Contract Creation Tx
            </a>
          </li>
          <li>
            <a
              href="https://optimistic.etherscan.io/tx/0x494957bed3e5c4479d8d6d4e55950e9beca7d2430276ae2fdcdee4978cb93ca1"
              target="_blank"
              className="link"
            >
              Batch Save Tx
            </a>
          </li>
          <li>
            <a href="https://twitter.com/sculpt_web" target="_blank" className="link">
              Twitter
            </a>
          </li>
        </ul>
        <h2 className="text-2xl font-extrabold xl:text-5xl">What's next?</h2>
        <blockquote>
          Ideally, I believe that this would be better with a council-of-members voting on the validity of a
          section-of-text BEFORE it is stored.
        </blockquote>
        <p>
          Please see the following repo to see how a council-of-members can vote on text before it is processed:{" "}
          <span> </span>
          <a href="https://github.com/nathan-websculpt/crowd-fund-v4" target="_blank" className="link">
            'crowd-fund-v4'
          </a>
          .
        </p>
        <p>
          Click to view progress on the : <span> </span>
          <a href="https://github.com/nathan-websculpt/council" target="_blank" className="link">
            Council Project
          </a>
          .
        </p>
        <p>
          And this repo to see how a (self-governed) council-of-members can have access to donations: <span> </span>
          <a href="https://github.com/nathan-websculpt/general-fund" target="_blank" className="link">
            'general-fund'
          </a>
          .
        </p>
        <br />
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
      </article>

      <JsonLD
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "webpage",
          name: "About Page",
          description:
            "Learn more about the project that aims to store the Gospels (and more) on the blockchain | The blockchain is where texts like the Bible could be safe from censorship.",
        }}
      />
    </>
  );
};

export default AboutPage;
