"use client";

import { GetVerse } from "./_components/GetVerse";
import type { NextPage } from "next";

const OnchainTestPage: NextPage = () => {
  return (
    <>
      <div className="w-full px-6 pt-10 pb-8 shadow-xl sm:my-auto bg-secondary sm:mx-auto md:w-9/12 sm:rounded-lg sm:px-10">
        <div className="flex flex-col items-center flex-grow w-full pt-10 mx-auto md:w-1/3">
          <div className="px-5">
            <h1 className="text-center">
              <span className="block mb-2 text-4xl">Test bypassing subgraph!</span>
              <span className="block text-2xl font-bold">For test/dev purposes only........</span>
            </h1>
          </div>
          <div className="mt-8">
            <GetVerse />
          </div>
        </div>
      </div>
    </>
  );
};

export default OnchainTestPage;
