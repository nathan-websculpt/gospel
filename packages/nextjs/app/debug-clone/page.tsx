"use client";

import { useEffect, useState } from "react";
import { ContractClonesUI } from "../debug/_components/contract/ContractClonesUI";
import type { NextPage } from "next";
import { useLocalStorage } from "usehooks-ts";
import { BookContractDDL } from "~~/components/helpers/BookContractDDL";
import deployedContracts from "~~/contracts/deployedContracts";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { ContractName } from "~~/utils/scaffold-eth/contract";
import { getAllContracts } from "~~/utils/scaffold-eth/contractsData";

const selectedContractStorageKey = "scaffoldEth2.selectedContractClone";
const contractsData = getAllContracts();
const contractNames = Object.keys(contractsData) as ContractName[];

// started from: https://github.com/gotnoshoeson/se-clone-factory

const DebugClone: NextPage = () => {
  const { targetNetwork } = useTargetNetwork();
  const bookManager = deployedContracts[targetNetwork.id].BookManager;

  const [cloneContractsData, setCloneContractsData] = useState<object[]>();
  const [selectedContractTitle, setSelectedContractTitle] = useState<string>(""); //after user selects from ddl, set book title from contract, Probably won't be used on this page
  const [selectedContract, setSelectedContract] = useLocalStorage(selectedContractStorageKey, "");

  const { data: listOfBookContracts, isLoading: isListLoading } = useScaffoldReadContract({
    contractName: "BookDeployer",
    functionName: "getDeployments",
  });

  useEffect(() => {
    const dataArray = [];
    if (listOfBookContracts && listOfBookContracts?.length > 0) {
      for (const deployment of listOfBookContracts) {
        const data = Object.create(bookManager);
        data.address = deployment.bAddr;
        dataArray.push(data);
      }
    setCloneContractsData(dataArray);

    if (listOfBookContracts?.length < 2) setSelectedContract(listOfBookContracts[0].bAddr); //todo:
    }
  }, [listOfBookContracts]);

  return (
    <>
      <div className="flex flex-col items-center justify-center py-8 gap-y-6 lg:gap-y-8 lg:py-12">
        {contractNames.length === 0 ? (
          <p className="text-3xl mt-14">No clones found!</p>
        ) : (
          <>
            <BookContractDDL
              listOfBookContracts={listOfBookContracts}
              setSelectedContract={setSelectedContract}
              setSelectedContractTitle={setSelectedContractTitle}
            />
            {cloneContractsData?.map(data => (
              <ContractClonesUI
                key={data.address}
                className={data.address === selectedContract ? "" : "hidden"}
                deployedContractData={data}
              />
            ))}
          </>
        )}
      </div>
      <div className="p-10 mt-8 text-center bg-secondary">
        <h1 className="my-0 text-4xl">Debug Contracts</h1>
        <p className="text-neutral">
          You can debug & interact with your deployed contracts here.
          <br /> Check{" "}
          <code className="italic bg-base-300 text-base font-bold [word-spacing:-0.5rem] px-1">
            packages / nextjs / pages / debug.tsx
          </code>{" "}
        </p>
      </div>
    </>
  );
};

export default DebugClone;
