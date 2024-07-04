"use client";

import type { NextPage } from "next";

const AboutPage: NextPage = () => {
  return (
    <>
      <article className="px-4 mx-auto mt-8 mb-12 prose lg:prose-lg md:px-0">
        <h1>Books onchain</h1>
        <p className="lead">
          Those that are involved in blockchain feel that one of the main reasons that the blockchain will go mainstream
          is the fact that &mdash; once stored &mdash; data can be made-such that it can never be changed again.
        </p>
        <h3>I think that this is great for:</h3>
        <ul>
          <li>books</li>
          <li>novellas</li>
          <li>poems</li>
          <li>government documentation</li>
          <li>written-works</li>
          <li>religious-works</li>
          <li>anything that we do not want to ever become censored</li>
        </ul>
        <h4>In short: There could be a blockchain version of a book that is unchangeable (immutable).</h4>
        <p>
          <strong>Perhaps this is not a necessity</strong> for the <em>majority of books</em> that are likely to never
          fall <em>victim to censorship</em>; <strong>however</strong>, there are aspects of our history that show us
          that we may need to <em>protect what we have written down</em>.{" "}
        </p>
        <h2>This project works well enough for proof-of-concept</h2>
        <h1>But it is not truly up to the task</h1>
        <p>
          I think that ideally we would want the ability for multiple people to vote on the validity of a sentence (or
          verse) before it is saved. I have other projects that utilize this sort of functionality (proposals and
          voting), and they could be brought into a scenario like this one (storing the Bible or any other book).
        </p>
        <blockquote>
          Why is it a good idea to have people voting on its validity <em>before</em> a verse/sentence is saved?
        </blockquote>
        <h4>
          Because one of the best attributes of the blockchain (for this project in particular) is the immutability.
        </h4>
        <br />
        <h1>The idea being...</h1>
        <p className="lead">
          Rather than having the ability to edit lines if mistakes are made &mdash; plan to prevent mistakes from being
          possible. I think it would be better to allow people to vote on the text (verse-by-verse/sentence-by-sentence)
          before anything is saved. Sound crazy? Recall that I said, “…this is not a necessity for the majority of
          books.”{" "}
        </p>
        <h2>This is more than just censor-proofing books</h2>
        <p>
          <strong>The blockchain</strong> could also allow us to timestamp the moment a group of people agreed that this
          is the Bible (or any other book) as we knew it in our time.{" "}
        </p>
        <h2>Imagine where the world would be if we were able to keep records in this way thousands of years ago</h2>
        <p>
          Well, why not start now? It cost around $30 (in a total of 9 transactions) to upload this book, so the four
          gospels aren’t prohibitively expensive. I know that I was curious as to exactly how much it would cost, so I
          hope that information feeds the curiosity of blockchain devs out there. Side Note: I also have plans to tackle
          items like The Declaration of Independence. <span> </span>
          <a href="https://twitter.com/sculpt_web" target="_blank" className="link">
            Tweet your suggestions for other documents to me here
          </a>
          .
        </p>
        <h4>Other links...</h4>
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
              href="https://optimistic.etherscan.io/address/0x29BB1313321dbA27Ad074DD6AD2943040319B439"
              target="_blank"
              className="link"
            >
              Contract on Optimism
            </a>
          </li>
          <li>
            <a
              href="https://optimistic.etherscan.io/tx/0x589597a96c3c2946975b466a03ea5355f10186b67da2245d22efdd825863f074"
              target="_blank"
              className="link"
            >
              Contract Creation Tx
            </a>
          </li>
          <li>
            <a
              href="https://optimistic.etherscan.io/tx/0xa4d047108f81334d3e184086754d0c1144f725305b14273547454bf007c7b139"
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
        <h1>More Details</h1>
        <blockquote>
          <p>
            <code>In Dev/Testing:</code> CONTRACT IS CURRENTLY FOR PROOF-OF-CONCEPT; CONTRACT HAS NOT BEEN AUDITED; The
            intention of this smart contract is to store/confirm (verse-by-verse) The Gospel of John (KJV) on Optimism,
            and (if all goes well) this could evolve to become a template for other books/documents.
          </p>
        </blockquote>
        <p className="lead">
          I can not assert that this will properly represent The Gospel of John (KJV) [neither in-part, nor in-full];
          This will hopefully serve the purpose of saying, <em>"Look, it is possible."</em>
        </p>
        <p>
          But, if you wanted to read The Gospel of John (KJV) yourself, this contract (or, this iteration of this
          contract) is not the right source. One area where this text will be lacking is that it will not contain any of
          the original italics.
        </p>
        <h2>What's next?</h2>
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
          And this repo to see how a (self-governed) council-of-members can have access to donations:{" "}
          <span> </span>
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
    </>
  );
};

export default AboutPage;
