import { useEffect } from "react";
import { Abi } from "abitype";
import { useAccount, useWriteContract } from "wagmi";
import { useTransactor } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

interface VerseProps {
  content: string[];
  chapterNum: bigint[];
  verseNum: bigint[];
  selectedContract: string;
  setSelectedContract: Dispatch<SetStateAction<string | null>>;
  selectedBookId: string;
  setSelectedBookId: Dispatch<SetStateAction<string>>;
  deployedContractData: any; //todo:
}

export const SaveVerses = (_v: VerseProps) => {
  const { chain } = useAccount();
  const writeTxn = useTransactor();
  const { targetNetwork } = useTargetNetwork();
  const writeDisabled = !chain || chain?.id !== targetNetwork.id;

  const { data: result, isPending, writeContractAsync } = useWriteContract();

  useEffect(() => {
    console.log("deployedContractData:", _v.deployedContractData);
  }, [_v.deployedContractData]);

  const writeAsync = async () => {
    try {
      if (writeDisabled) {
        notification.error("There is a discrepency - chain and targetNetwork mismatch");
        return;
      }
      const args = [_v.selectedBookId, _v?.verseNum, _v?.chapterNum, _v?.content];
      const makeWriteWithParams = () =>
        writeContractAsync({
          address: _v.selectedContract,
          functionName: "addBatchVerses",
          abi: _v.deployedContractData.abi as Abi,
          args: args,
        });
      await writeTxn(makeWriteWithParams);
    } catch (e: any) {
      console.error("SaveVerses.tsx:writeAsync - err:", e);
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
