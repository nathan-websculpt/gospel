"use client";

import { VersesList_Confirm } from "./_components/VersesList_confirm";
import { NextPage } from "next";
import { Wrapper_VerseViewer } from "~~/components/wrappers/Wrapper_VerseViewer";

const Confirm: NextPage = () => {
  return (
    <>
      <Wrapper_VerseViewer innerComponent={VersesList_Confirm} />
    </>
  );
};

export default Confirm;
