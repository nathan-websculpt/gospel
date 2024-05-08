"use client";

import Link from "next/link";
import type { NextPage } from "next";
import Markdown from "react-markdown";
import { useAccount } from "wagmi";
import { MagnifyingGlassIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex flex-col flex-grow pt-10">
        <div className="self-center w-full px-5 md:w-1/3">
          <h1 className="text-center">
            <span className="block mb-2 text-2xl">Welcome to</span>
            <span className="block text-4xl font-bold">onchain Gospel of John</span>
          </h1>
          <p className="text-sm text-center md:text-lg">
            While this Smart Contract is live on Optimism Mainnet, it has not been audited, and it should be considered
            a proof-of-concept.
          </p>
          <p className="text-sm text-center md:text-lg">
            Can not currently confirm that this properly represents The Gospel of John (KJV) [neither in-part, nor
            in-full]; But, that is the point of this project ... todo: learn more link
          </p>
        </div>

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
      <Markdown className="w-full px-6 md:pl-10 md:w-2/3">
        While this Smart Contract is live on Optimism Mainnet, it has not been audited, and it should be considered a
        proof-of-concept. I am 99% certain that the upload (is that the right word?) was a success, but I can not assert
        that this will properly represent The Gospel of John (KJV) [neither in-part, nor in-full]; This will hopefully
        serve the purpose of saying, "Look, it is possible." But, if you wanted to read The Gospel of John (KJV)
        yourself, this contract (or, this iteration of this contract) is not the right source. One area where this text
        will be lacking is that it will not contain any of the original italics. If you wish to donate, please do not
        use this contract's functionality. *Instead, simply send funds to:*
        **websculpt.eth** My most-sincere feeling of gratitude goes to anyone wanting to
        help out. [Click to view Github](https://github.com/nathan-websculpt) Please see my repo: 'crowd-fund-v4' to see
        how a council-of-members can vote on text before it is processed.
      </Markdown>
    </>
  );
};

export default Home;
