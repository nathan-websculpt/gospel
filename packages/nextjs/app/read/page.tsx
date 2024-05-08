"use client";

import Link from "next/link";
import { NextPage } from "next";
import { VersesList } from "~~/components/read/VersesList";

const Read: NextPage = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex flex-col w-full gap-2 p-2 m-4 border shadow-xl md:w-3/5 border-base-300 bg-base-200 sm:rounded-lg">
          <VersesList />
        </div>
      </div>
    </>
  );
};

export default Read;
