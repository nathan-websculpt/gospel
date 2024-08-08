"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { MagnifyingGlassIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { JsonLD } from "~~/components/helpers/JsonLD";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex flex-col w-full">
        <article className="px-4 mx-auto mt-8 mb-12 prose md:px-0 lg:prose-lg xl:prose-xl">
          <h1>onchain Gospel of John</h1>
          <h2 className="flex flex-col">
            <span className="font-thin text-md xl:text-xl">I set out to fully ask the question: </span>
            Could we put the Bible on the blockchain?
          </h2>
          <h3>Could “crypto” become a new way to protect scripture?</h3>
          <p>
            The blockchain could provide a decentralized and immutable record of the Bible &mdash; a way to ensure that
            the scriptures are:
          </p>
          <ul>
            <li>unbannable</li>
            <li>unburnable</li>
            <li>unchangeable</li>
            <li>and available to all</li>
          </ul>
          <p>
            Making books/documents unbannable can mean that everyone has access to them &mdash; regardless of
            geopolitical or ideological restrictions. Readers all over the world could freely engage with these texts
            without fear of censorship.
          </p>
          <Link href="/read" passHref className="link">
            <h2 className="flex flex-col pb-6 text-2xl xl:text-5xl">
              <span className="font-thin">Read [from the blockchain] Now: </span>(KJV) Gospel of John
            </h2>
          </Link>{" "}
          <blockquote>
            While this Smart Contract is live on Optimism Mainnet, it has not been audited, and it should be considered
            a proof-of-concept.
          </blockquote>
          <p>
            Can not currently confirm that this properly represents The Gospel of John (KJV) [neither in-part, nor
            in-full]. But, that is sort of the point of this project.
          </p>
          <p className="lead">This will hopefully serve the purpose of saying, "Look, it is possible."</p>
          <p>Could it be better?</p>
          <p>
            The problem with this project as it stands is that I have stored a book, and THEN I am asking for{" "}
            <span> </span>
            <Link href="/confirm" passHref className="link" target="_blank">
              confirmations
            </Link>{" "}
            after the fact. Ideally I think this would be much better with a council-of-members that all vote on the
            validity of a sentence (or verse) <em>before</em> it is saved.
          </p>
          <p>Want to get into the technicals?</p>
          <Link href="/about" passHref className="link">
            Click to Learn More about this project &mdash; it's more than just censor-proofing books
          </Link>{" "}
        </article>

        <div className="flex-grow w-full px-8 py-12 mt-16 bg-base-300">
          <div className="flex flex-col items-center justify-center gap-12 sm:flex-row">
            <div className="flex flex-col items-center max-w-xs px-10 py-10 text-center bg-base-100 rounded-3xl">
              <MagnifyingGlassIcon className="w-8 h-8 fill-secondary" />
              <p className="text-2xl">
                Want to check it out?{" "}
                <Link href="/read" passHref className="link">
                  Start Reading
                </Link>{" "}
              </p>
              <p></p>
            </div>
            <div className="flex flex-col items-center max-w-xs px-10 py-10 text-center bg-base-100 rounded-3xl">
              <ShieldCheckIcon className="w-8 h-8 fill-secondary" />
              <p className="text-2xl">
                Validate against the original and{" "}
                <Link href="/confirm" passHref className="link">
                  Confirm a Verse onchain
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>

      <JsonLD
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "website",
          name: "Gospel Onchain",
          url: "https://www.gospelonchain.com",
        }}
      />
    </>
  );
};

export default Home;
