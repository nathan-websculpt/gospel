"use client";

import { VersesList_Read } from "./_components/VersesList_read";
import { NextPage } from "next";
import { Wrapper_VerseViewer } from "~~/components/wrappers/Wrapper_VerseViewer";

const Read: NextPage = () => {
  return (
    <>
      <Wrapper_VerseViewer innerComponent={VersesList_Read} />
    </>
  );
};

export default Read;
