"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { MagnifyingGlassIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex flex-col flex-grow pt-10">
        <article className="mx-auto mt-8 mb-12 prose lg:prose-lg">
          <h1>onchain Gospel of John</h1>
          <blockquote>
            While this Smart Contract is live on Optimism Mainnet, it has not been audited, and it should be considered
            a proof-of-concept.
          </blockquote>
          <p>
            Can not currently confirm that this properly represents The Gospel of John (KJV) [neither in-part, nor
            in-full]; But, that is sort of the point of this project...
          </p>
          <p className="lead">This will hopefully serve the purpose of saying, "Look, it is possible."</p>
          <p>
            Ideally I think this would be much better with a council-of-members that vote on the validity of a sentence
            (or verse) <em>before</em> it is saved.
          </p>
          <Link href="/about" passHref className="link">
            Click to Learn More about this project &mdash; it is about more than just censor-proofing books
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
    </>
  );
};

export default Home;
