"use client";

import { VersesList_Confirm } from "./_components/VersesList_confirm";
import { NextPage } from "next";
import { JsonLD } from "~~/components/helpers/JsonLD";
import { Wrapper_VerseViewer } from "~~/components/wrappers/Wrapper_VerseViewer";

const Confirm: NextPage = () => {
  return (
    <>
      <Wrapper_VerseViewer innerComponent={VersesList_Confirm} />

      <JsonLD
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "webpage",
          name: "Confirm Verses Onchain",
          description:
            "Want to confirm a verse? Just be sure that the text is the same as the original and state your claim onchain | Confirm verses for pennies on Optimism.",
        }}
      />
    </>
  );
};

export default Confirm;
