import { useApolloClient } from "@apollo/client";
import { useAccount, useWriteContract } from "wagmi";
import { useScaffoldWriteContract, useTransactor } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { notification } from "~~/utils/scaffold-eth";

interface DisplayVerseProps {
  bookId: string;
  verseId: string;
  content: string;
  chapterNum: string;
  verseNum: string;
  confirmationCount: number;
  numericalId: bigint;
  selectedContract: string;
  deployedContractData: any;
}

export const ConfirmVerse = (_verse: DisplayVerseProps) => {
  const client = useApolloClient();
  const { chain } = useAccount();
  const writeTxn = useTransactor();
  const { targetNetwork } = useTargetNetwork();
  const writeDisabled = !chain || chain?.id !== targetNetwork.id;
  
  const { data: result, isPending, writeContractAsync } = useWriteContract();

  const writeAsync = async () => {
    if (writeDisabled) {
      notification.error("Chain/targetNetwork mismatch");
      return;
    }
    //TODO: book id may not be needed
    if (!_verse.bookId || _verse.bookId === "") {
      notification.error("There is no book ID (bytes subgraph id) selected");
      console.log(
        "There is no book ID (bytes subgraph id) selected - This is a query that should be automatically occurring",
      );
      return;
    }
    try {
      const args = [_verse?.verseId, _verse?.numericalId];

      const makeWriteWithParams = () =>
        writeContractAsync({
          address: _verse.selectedContract,
          functionName: "confirmVerse",
          abi: _verse.deployedContractData.abi as Abi,
          args: args,
        });
      await writeTxn(makeWriteWithParams);
    } catch (e: any) {
      console.error("error from SaveVerses.tsx writeAsync()", e);
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
