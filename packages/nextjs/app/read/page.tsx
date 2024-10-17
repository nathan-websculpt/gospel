"use client";

import { VersesList_Read } from "./_components/VersesList_read_old";
import { NextPage } from "next";
import { JsonLD } from "~~/components/helpers/JsonLD";
import { Wrapper_VerseViewer } from "~~/components/wrappers/Wrapper_VerseViewer";
import { Base } from "./_components/Base";

const Read: NextPage = () => {
  return (
    <>
      {/* new code: branch ux: updating ux, requires new queries */}
      <Base />

      {/* old code */}
      {/* <Wrapper_VerseViewer innerComponent={VersesList_Read} /> */}

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
