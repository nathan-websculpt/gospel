"use client";

import { AddVerses } from "./_components/AddVerses";
import { DiplayLastAdded } from "./_components/DisplayLastAdded";
import type { NextPage } from "next";

const AddVersesPage: NextPage = () => {
  return (
    <>
      <div className="w-full px-6 pt-10 pb-8 shadow-xl sm:my-auto bg-secondary sm:mx-auto md:w-5/6 sm:rounded-lg sm:px-10">
        <div className="flex flex-col items-center flex-grow w-full pt-10 mx-auto md:w-2/3">
          <div className="px-5 prose lg:prose-lg">
            <h1 className="text-center">
              <span className="block mb-2 text-2xl">Add Batch Verses</span>
              <span className="block text-xl font-bold">
                Only websculpt.eth can add verses.
              </span>
            </h1>
          </div>
          <div className="mt-8">
            <DiplayLastAdded />
            <AddVerses />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddVersesPage;
