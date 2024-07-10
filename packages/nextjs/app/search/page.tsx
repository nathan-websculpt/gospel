"use client";

import { VersesList_Search } from "./_components/VersesList_search";
import { NextPage } from "next";
import { JsonLD } from "~~/components/helpers/JsonLD";
import { Wrapper_VerseViewer } from "~~/components/wrappers/Wrapper_VerseViewer";

const Search: NextPage = () => {
  return (
    <>
      <Wrapper_VerseViewer innerComponent={VersesList_Search} />

      <JsonLD
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "webpage",
          name: "Search Gospel of John",
          description:
            "Search for Bible verses on the blockchain. The Gospel of John is fully-functional onchain | Try searching for the word: beginning",
        }}
      />
    </>
  );
};

export default Search;
