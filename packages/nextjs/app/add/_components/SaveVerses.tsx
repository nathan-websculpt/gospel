import { useEffect, useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface VerseProps {
  content: string[];
  chapterNum: bigint[];
  verseNum: bigint[];
  selectedContract: string;
  setSelectedContract: Dispatch<SetStateAction<string | null>>;
  selectedBookId: string;
  setSelectedBookId: Dispatch<SetStateAction<string>>;
}

export const SaveVerses = (_v: VerseProps) => {
  const { writeContractAsync: writeToJohn } = useScaffoldWriteContract("John");
  const { writeContractAsync: writeToMark } = useScaffoldWriteContract("Mark");

  useEffect(() => {
    console.log("Selected contract changed to:", _v.selectedContract);
  }, [_v.selectedContract]);

  useEffect(() => {
    console.log("Selected book ID changed to:", _v.selectedBookId);
  }, [_v.selectedBookId]);

  const writeAsync = async () => {
    try {
      const args = [_v.selectedBookId, _v?.verseNum, _v?.chapterNum, _v?.content];
      const contractCall = {
        functionName: "addBatchVerses",
        args: args,
      };

      if (_v.selectedContract === "Mark") {
        await writeToMark(contractCall);
      } else {
        await writeToJohn(contractCall);
      }
    } catch (e) {
      console.error("Error calling addBatchVerses on contract:", e);
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={() => writeAsync()}>
        BATCH SAVE ONCHAIN
      </button>
    </>
  );
};
