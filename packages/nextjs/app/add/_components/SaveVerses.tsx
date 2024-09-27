import { useEffect, useState } from "react";
import { Abi, AbiFunction } from "abitype";
import { useAccount, useWriteContract } from "wagmi";
import { useDeployedContractInfo, useScaffoldWriteContract, useTransactor } from "~~/hooks/scaffold-eth";
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

  // useEffect(() => {
  //   console.log("Selected contract changed to:", _v.selectedContract);
  // }, [_v.selectedContract]);

  // useEffect(() => {
  //   console.log("Selected book ID changed to:", _v.selectedBookId);
  // }, [_v.selectedBookId]);

  const writeAsync = async () => {
    // try {
    //   const args = [_v.selectedBookId, _v?.verseNum, _v?.chapterNum, _v?.content];
    //   const contractCall = {
    //     functionName: "addBatchVerses",
    //     args: args,
    //   };
    //   if (_v.selectedContract === "Mark") {
    //     await writeToMark(contractCall);
    //   } else {
    //     await writeToJohn(contractCall);
    //   }
    // } catch (e) {
    //   console.error("Error calling addBatchVerses on contract:", e);
    // }

    try {
      const args = [_v.selectedBookId, _v?.verseNum, _v?.chapterNum, _v?.content];
      const makeWriteWithParams = () =>
        writeContractAsync({
          address: _v.selectedContract,
          functionName: "addBatchVerses",
          abi: _v.deployedContractData.abi as Abi,
          args: args,
        });
      await writeTxn(makeWriteWithParams);
      onChange();
    } catch (e: any) {
      console.error("⚡️ ~ file: WriteOnlyFunctionForm.tsx:handleWrite ~ error", e);
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
