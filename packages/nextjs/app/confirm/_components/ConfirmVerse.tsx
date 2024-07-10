import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface DisplayVerseProps {
  verseId: string;
  content: string;
  chapterNum: string;
  verseNum: string;
  confirmationCount: number;
  numericalId: bigint;
}

export const ConfirmVerse = (_verse: DisplayVerseProps) => {
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("John");

  const writeAsync = async () => {
    try {
      await writeYourContractAsync({
        functionName: "confirmVerse",
        args: [_verse?.verseId, _verse?.numericalId],
      });
    } catch (e) {
      console.error("Error calling confirmVerse on contract:", e);
    }
  };

  return (
    <>
      <div className="w-full px-6 pt-10 pb-8 mx-auto mt-6 shadow-xl bg-primary md:w-11/12 xl:w-4/5 sm:rounded-lg sm:px-10">
        <p className="text-lg">
          {_verse?.chapterNum} : {_verse?.verseNum}
        </p>
        <p className="text-2xl">{_verse?.content}</p>
        <p>
          Confirmations: <span>{_verse?.confirmationCount}</span>
        </p>

        <button className="btn btn-secondary" onClick={() => writeAsync()}>
          CONFIRM ONCHAIN
        </button>
      </div>
    </>
  );
};
