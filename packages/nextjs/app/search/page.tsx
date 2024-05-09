"use client";

import { NextPage } from "next";
import { VersesList_Search } from "~~/components/search/VersesList_search";

const Search: NextPage = () => {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex flex-col w-full gap-2 p-2 m-4 border shadow-xl md:w-3/5 border-base-300 bg-base-200 sm:rounded-lg">
          <VersesList_Search />
        </div>
      </div>
    </>
  );
};

export default Search;
