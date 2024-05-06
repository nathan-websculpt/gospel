import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface VerseProps {
  content: string;
  chapterNum: bigint;
  verseNum: bigint;
}

export const SaveVerse = (_v: VerseProps) => {
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("John");

  const writeAsync = async () => {
    try {
      await writeYourContractAsync({
        functionName: "addVerse",
        args: [_v?.verseNum , _v?.chapterNum, _v?.content],
      });
    } catch (e) {
      console.error("Error calling addVerse on contract:", e);
    }
  };

  return (
    <>
      <button className="btn btn-primary" onClick={() => writeAsync()}>
        SAVE ON-CHAIN
      </button>
    </>
  );
};
