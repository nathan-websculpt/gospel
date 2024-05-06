import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

interface DisplayVerseProps {
  verseId: string;
  content: string;
  chapterNum: string;
  verseNum: string;
  confirmationCount: number;
}

export const ConfirmVerse = (_verse: DisplayVerseProps) => {
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("John");

  const writeAsync = async () => {
    try {
      await writeYourContractAsync({
        functionName: "confirmVerse",
        args: [_verse?.verseId],
      });
    } catch (e) {
      console.error("Error calling confirmVerse on contract:", e);
    }
  };

  return (
    <>
      <div className="px-6 pt-10 pb-8 mt-6 shadow-xl bg-primary sm:mx-auto sm:max-w-11/12 md:w-full sm:rounded-lg sm:px-10">
        <p className="text-lg">
          {_verse?.chapterNum} : {_verse?.verseNum}
        </p>
        <p className="text-2xl">{_verse?.content}</p>
        <p>Confirmations: <span>{_verse?.confirmationCount}</span></p>

        <button className="btn btn-primary" onClick={() => writeAsync()}>
          CONFIRM ON-CHAIN
        </button>
      </div>
    </>
  );
};
