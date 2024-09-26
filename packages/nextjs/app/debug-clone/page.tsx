"use client";

import { useEffect, useRef, useState } from "react";
import { ContractClonesUI } from "../debug/_components/contract/ContractClonesUI";
import type { NextPage } from "next";
import { useLocalStorage } from "usehooks-ts";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import deployedContracts from "~~/contracts/deployedContracts";
import { useOutsideClick, useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";
import { ContractName } from "~~/utils/scaffold-eth/contract";
import { getAllContracts } from "~~/utils/scaffold-eth/contractsData";

const selectedContractStorageKey = "scaffoldEth2.selectedContractClone";
const contractsData = getAllContracts();
const contractNames = Object.keys(contractsData) as ContractName[];

// started from: https://github.com/gotnoshoeson/se-clone-factory

const DebugClone: NextPage = () => {
  // add networks in scaffoldConfig, change the number in the targetNetwork[] below for deployed public network contracts
  const chain = scaffoldConfig.targetNetworks[0];
  const factory = deployedContracts[chain.id].BookDeployer;
  const yourContract = deployedContracts[chain.id].BookManager;

  useEffect(() => {
    console.log("factory", factory);
  }, [factory]);

  const [cloneContracts, setCloneContracts] = useState<string[]>();
  const [cloneContractData, setCloneContractData] = useState<object[]>();

  const [selectedContract, setSelectedContract] = useLocalStorage(selectedContractStorageKey, "");

  const listOfContractAddresses = useScaffoldReadContract({
    contractName: "BookDeployer",
    functionName: "getDeployments",
  });

  useEffect(() => {
    console.log("listOfContractAddresses", listOfContractAddresses);
  }, [listOfContractAddresses]);

  const dropdownRef = useRef<HTMLDetailsElement>(null);
  const closeDropdown = () => {
    dropdownRef.current?.removeAttribute("open");
  };
  useOutsideClick(dropdownRef, closeDropdown);

  useEffect(() => {
    if (listOfContractAddresses) setCloneContracts(listOfContractAddresses?.data);
    if (listOfContractAddresses?.data?.length < 2) setSelectedContract(listOfContractAddresses.data[0]);
  }, [listOfContractAddresses]);

  useEffect(() => {
    console.log("ur contr", yourContract);
    console.log("clone contracts", cloneContracts);
    const dataArray = [];

    const iterate = () => {
      for (let index = 0; index < cloneContracts.length; index++) {
        const data = Object.create(yourContract);
        data.address = cloneContracts[index];
        dataArray.push(data);
      }
    };

    if (cloneContracts?.length > 0) iterate();
    setCloneContractData(dataArray);
  }, [cloneContracts]);

  return (
    <>
      <div className="flex flex-col items-center justify-center py-8 gap-y-6 lg:gap-y-8 lg:py-12">
        {contractNames.length === 0 ? (
          <p className="text-3xl mt-14">No clones found!</p>
        ) : (
          <>
            {contractNames?.length > 1 && (
              <div className="flex flex-row flex-wrap w-full gap-2 px-6 pb-1 max-w-7xl lg:px-10">
                <details ref={dropdownRef} className="leading-3 dropdown dropdown-right">
                  <summary tabIndex={0} className="btn btn-secondary btn-sm shadow-md dropdown-toggle gap-0 !h-auto">
                    Select Clone Contract
                    <ChevronDownIcon className="w-4 h-6 ml-2 sm:ml-0" />
                  </summary>
                  <ul className="dropdown-content menu z-[100] p-2 mt-2 shadow-center shadow-accent bg-base-200 rounded-box gap-1">
                    {cloneContracts?.map(address => (
                      <li
                        key={address}
                        onClick={() => {
                          setSelectedContract(address);
                          closeDropdown();
                        }}
                        onKeyUp={() => setSelectedContract(address)}
                      >
                        <Address address={address} disableAddressLink={true} />
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            )}
            {cloneContractData?.map(data => (
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
