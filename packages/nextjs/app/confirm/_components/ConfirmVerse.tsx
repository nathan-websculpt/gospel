import { useEffect } from "react";
import { Abi } from "abitype";
import { useAccount, useWriteContract } from "wagmi";
import { useTransactor } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { notification } from "~~/utils/scaffold-eth";

interface DisplayVerseProps {
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
  const { chain } = useAccount();
  const writeTxn = useTransactor();
  const { targetNetwork } = useTargetNetwork();
  const writeDisabled = !chain || chain?.id !== targetNetwork.id;

  const { data: result, isPending, writeContractAsync } = useWriteContract();

  useEffect(() => {
    if (result) {
      notification.success("Verse confirmed");
    }
  }, [result]);

  const writeAsync = async () => {
    if (writeDisabled) {
      notification.error("Wallet could be disconnected or there is a chain/targetNetwork mismatch.");
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
      console.error("error from ConfirmVerse.tsx writeAsync()", e);
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
