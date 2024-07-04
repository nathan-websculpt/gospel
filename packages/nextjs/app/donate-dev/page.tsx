"use client";

import type { NextPage } from "next";
import { Donate } from "./_components/Donate";

const DonatePage: NextPage = () => {
  return (
    <>
    <div className="w-full px-6 pt-10 pb-8 shadow-xl sm:my-auto bg-secondary sm:mx-auto lg:w-4/5 xl:w-9/12 sm:rounded-lg sm:px-10">
      <div className="flex flex-col items-center flex-grow w-full pt-10 mx-auto xl:w-1/3">
        <div className="px-5 prose">
          <h1 className="text-center">
            <span className="block mb-2 text-4xl">Donations</span>
            <span className="block text-2xl font-bold">
              For test/dev purposes only. If you wish to donate, please send funds to websculpt.eth
            </span>
          </h1>
        </div>
        <div className="mt-8">
          <Donate />
        </div>
      </div>
      </div>
    </>
  );
};

export default DonatePage;
