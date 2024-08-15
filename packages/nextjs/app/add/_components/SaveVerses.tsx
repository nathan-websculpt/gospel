import { useState } from "react";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface VerseProps {
  content: string[];
  chapterNum: bigint[];
  verseNum: bigint[];
}

export const SaveVerses = (_v: VerseProps) => {
  const defaultContractName = "John";
  const [selectedContract, setSelectedContract] = useState(defaultContractName);

  const { writeContractAsync: writeToJohn } = useScaffoldWriteContract("John");
  const { writeContractAsync: writeToMark } = useScaffoldWriteContract("Mark");

  const writeAsync = async () => {
    try {
      const args = [_v?.verseNum, _v?.chapterNum, _v?.content];
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
    setSelectedContract(e.target.value.toString());
  };

  return (
    <>
      <select
        className="w-32 px-2 py-2 mr-1 text-xs rounded-none sm:px-6 sm:py-2 sm:mr-2 sm:text-sm md:text-md lg:text-lg sm:w-44 btn btn-primary"
        value={selectedContract}
        onChange={changeContract}
        aria-label="Change Book"
      >
        <option>{defaultContractName}</option>
        <option>Mark</option>
      </select>

      <button className="btn btn-primary" onClick={() => writeAsync()}>
        BATCH SAVE ONCHAIN
      </button>
    </>
  );
};
