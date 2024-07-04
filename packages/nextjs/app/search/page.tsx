"use client";

import { VersesList_Search } from "./_components/VersesList_search";
import { NextPage } from "next";
import { Wrapper_VerseViewer } from "~~/components/wrappers/Wrapper_VerseViewer";

const Search: NextPage = () => {
  return (
    <>
      <Wrapper_VerseViewer innerComponent={VersesList_Search} />
    </>
  );
};

export default Search;
