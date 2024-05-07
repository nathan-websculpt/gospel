"use client";

import type { NextPage } from "next";
import { Donate } from "~~/components/donate/Donate";

const DonatePage: NextPage = () => {
  return (
    <>
    <div className="px-6 pt-10 pb-8 shadow-xl sm:my-auto bg-secondary sm:mx-auto sm:max-w-11/12 md:w-9/12 sm:rounded-lg sm:px-10">
      <div className="flex flex-col items-center flex-grow w-1/3 pt-10 mx-auto">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block mb-2 text-4xl">Donate Now!</span>
            <span className="block text-2xl font-bold">
              TODO: Add copy here...
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
