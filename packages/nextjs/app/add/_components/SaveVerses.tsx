import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface VerseProps {
  content: string[];
  chapterNum: bigint[];
  verseNum: bigint[];
}

export const SaveVerses = (_v: VerseProps) => {
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("John");

  const writeAsync = async () => {
    try {
      await writeYourContractAsync({
        functionName: "addBatchVerses",
        args: [_v?.verseNum, _v?.chapterNum, _v?.content],
      });
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
