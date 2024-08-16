import { useEffect, useState } from "react";
import { BookDDL } from "~~/components/helpers/BookDDL";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface VerseProps {
  bookId: string;
  content: string[];
  chapterNum: bigint[];
  verseNum: bigint[];
}

export const SaveVerses = (_v: VerseProps) => {
  const [selectedContract, setSelectedContract] = useState<string>("");
  const [selectedBookId, setSelectedBookId] = useState<string>("");

  const { writeContractAsync: writeToJohn } = useScaffoldWriteContract("John");
  const { writeContractAsync: writeToMark } = useScaffoldWriteContract("Mark");

  useEffect(() => {
    console.log("Selected contract changed to:", selectedContract);
  }, [selectedContract]);

  useEffect(() => {
    console.log("Selected book ID changed to:", selectedBookId);
  }, [selectedBookId]);

  const writeAsync = async () => {
    try {
      const args = [selectedBookId, _v?.verseNum, _v?.chapterNum, _v?.content];
      const contractCall = {
        functionName: "addBatchVerses",
        args: args,
      };

      if (selectedContract === "Mark") {
        await writeToMark(contractCall);
      } else {
        await writeToJohn(contractCall);
      }
    } catch (e) {
      console.error("Error calling addBatchVerses on contract:", e);
    }
  };

  const changeContract = e => {
    setSelectedContract(e.target.value);
    setSelectedBookId(e.target.selectedOptions[0].getAttribute("data-bookid"));
  };

  return (
    <>
      <BookDDL
        selectedContract={selectedContract}
        setSelectedContract={setSelectedContract}
        setSelectedBookId={setSelectedBookId}
        changeContract={changeContract}
      />

      <button className="btn btn-primary" onClick={() => writeAsync()}>
        BATCH SAVE ONCHAIN
      </button>
    </>
  );
};
