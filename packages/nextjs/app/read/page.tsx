"use client";

import { VersesList_Read } from "./_components/VersesList_read";
import { NextPage } from "next";
import { JsonLD } from "~~/components/helpers/JsonLD";
import { Wrapper_VerseViewer } from "~~/components/wrappers/Wrapper_VerseViewer";

const Read: NextPage = () => {
  return (
    <>
      <Wrapper_VerseViewer innerComponent={VersesList_Read} />

      <JsonLD
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "webpage",
          name: "Read Gospel of John",
          description:
            "You can read the Gospel of John from Optimism Mainnet today | Are you interested in a blockchain Bible? Start reading now: In the beginning was the Word",
        }}
      />
    </>
  );
};

export default Read;
