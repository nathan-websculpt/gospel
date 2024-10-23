import { useState } from "react";
import { useWriteContract } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useTransactor } from "~~/hooks/scaffold-eth";

interface LockBookProps {
  selectedContract: string;
  selectedContractTitle: string;
  deployedContractData: any;
  bookId: string;
}

export const LockBook = ({ selectedContract, selectedContractTitle, deployedContractData, bookId }: LockBookProps) => {
  const writeTxn = useTransactor();
  const [enableButton, setEnableButton] = useState(false);

  const { data: result, isPending, writeContractAsync } = useWriteContract();

  const handleLockBook = async () => {
    try {
      const args = [bookId];
      console.log("args", args);

      const makeWriteWithParams = () =>
        writeContractAsync({
          address: selectedContract,
          functionName: "finalizeBook",
          abi: deployedContractData.abi as Abi,
          args: args,
        });
      await writeTxn(makeWriteWithParams);
    } catch (e: any) {
      console.error("error from LockBook.tsx writeAsync()", e);
    }

    setEnableButton(false);
  };

  return (
    <div className="flex flex-row gap-2">
      <button className="btn btn-primary" onClick={() => setEnableButton(!enableButton)}>
        {enableButton ? "Disable" : "Enable"}
      </button>
      <button className="btn btn-primary" disabled={!enableButton} onClick={() => handleLockBook()}>
        !!LOCKBOOK!!
        <span>
          <span>{selectedContractTitle}</span>
          <Address address={selectedContract} size="xs" disableAddressLink={true} disableCopyButton={true} format="short"/>
        </span>
      </button>
    </div>
  );
};
