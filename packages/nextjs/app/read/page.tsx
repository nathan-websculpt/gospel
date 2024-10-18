"use client";

import { Base } from "./_components/Base";
import { NextPage } from "next";
import { JsonLD } from "~~/components/helpers/JsonLD";

const Read: NextPage = () => {
  return (
    <>
      <div className="flex flex-col items-center flex-1 w-full gap-2 mb-28">
        <Base />
      </div>

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
