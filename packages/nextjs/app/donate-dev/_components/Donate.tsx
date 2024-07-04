import { useState } from "react";
import { IntegerVariant, isValidInteger } from "../../../components/scaffold-eth";
import { parseEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { notification } from "~~/utils/scaffold-eth";

export const Donate = () => {
  const [donationInput, setDonationInput] = useState("");
  const { writeContractAsync: writeYourContractAsync } = useScaffoldWriteContract("John");

  function handleBigIntChange(newVal: string): void {
    const _v = newVal.trim();
    if (_v.length === 0 || _v === "." || isValidInteger(IntegerVariant.UINT256, _v, false)) setDonationInput(_v);
  }

  const writeAsync = async () => {
    try {
      await writeYourContractAsync({
        functionName: "donate",
        value: parseEther(donationInput),
      });
    } catch (e) {
      console.error("Error calling donate on contract:", e);
    }
  };

  const validateThenWrite = () => {
    if (donationInput.trim() === "" || donationInput.trim() === ".") {
      notification.warning("Please input a valid donation amount.", { position: "top-right", duration: 6000 });
      return;
    }
    writeAsync();
  };

  return (
    <>
      <div className="flex gap-1 mt-5">
        <input
          placeholder="Amount EX: 0.1"
          className="w-3/4 input input-bordered input-accent"
          value={donationInput}
          onChange={e => handleBigIntChange(e.target.value)}
        />
        <button className="btn btn-primary" onClick={() => validateThenWrite()}>
          DONATE
        </button>
      </div>
    </>
  );
};
