
import { SaveVerses } from "./SaveVerses";
import { BookDDL } from "~~/components/helpers/BookDDL";
import { isValidNumber } from "~~/helpers/utils";
import { getGospelOfJohn } from "~~/json_bible/John";
import { getGospelOfMark } from "~~/json_bible/Mark";
import { notification } from "~~/utils/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";
import { getAllContracts } from "~~/utils/scaffold-eth/contractsData";
import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import deployedContracts from "~~/contracts/deployedContracts";
import { useDeployedContractInfo, useOutsideClick, useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import scaffoldConfig from "~~/scaffold.config";
import { ContractName } from "~~/utils/scaffold-eth/contract";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";

export const AddVerses = () => {
  const [versesArray, setVersesArray] = useState<object[]>(getGospelOfJohn);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedVerse, setSelectedVerse] = useState("");
  const [selectedIndex, setSelectedIndex] = useState("");
  // const [amountInBatch, setAmountInBatch] = useState("150");
  const [amountInBatch, setAmountInBatch] = useState("8");
  const [selectedVersesObject, setSelectedVersesObject] = useState<object[]>(undefined);
  const [isFirstRun, setIsFirstRun] = useState(true);

  const [selectedContract, setSelectedContract] = useState<string>("");
  const [selectedBookId, setSelectedBookId] = useState<string>("");

  const contractsData = getAllContracts();
  const contractNames = Object.keys(contractsData) as ContractName[];





useEffect(() => {
  if (selectedContract) {
    // cloneContractData where addr == selectedContract
    console.log("whoa boi ___>");
    for(let i = 0; i < cloneContractData.length; i++) {
        console.log("i:", cloneContractData[i].abi);
    }
    console.log("whoa boi _________________________________>");
    const theSelectedCloneContractData = cloneContractData.find((c) => c.address === selectedContract);
    console.log("theSelectedCloneContractData:", theSelectedCloneContractData.abi);
    setTheSelectedCloneContractData(theSelectedCloneContractData)
  }
}, [selectedContract]);





  

  const { targetNetwork } = useTargetNetwork();
  const bookManager = deployedContracts[targetNetwork.id].BookManager;

  const [cloneContracts, setCloneContracts] = useState<string[]>();
  const [cloneContractData, setCloneContractData] = useState<object[]>();
  const [theSelectedContractData, setTheSelectedCloneContractData] = useState<any>();

  const listOfContractAddresses = useScaffoldReadContract({
    contractName: "BookDeployer",
    functionName: "getDeployments",
  });

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
    const dataArray = [];

    const iterate = () => {
      for (let index = 0; index < cloneContracts.length; index++) {
        const data = Object.create(bookManager);
        data.address = cloneContracts[index];
        dataArray.push(data);
      }
    };

    if (cloneContracts?.length > 0) iterate();
    setCloneContractData(dataArray);
    console.log("halp cloneContractData:", dataArray);
  }, [cloneContracts]);





  

  useEffect(() => {
    // reset
    setSelectedChapter("1");
    setSelectedVerse("1");

    if (selectedIndex === 0)
      setSelectedVersesObject(versesArray.slice(selectedIndex, Number(amountInBatch) + selectedIndex));
    else setSelectedIndex(0); //triggers setSelectedVersesObject change
  }, [versesArray]);

  useEffect(() => {
    if (!isFirstRun) setSelectedVersesObject(versesArray.slice(selectedIndex, Number(amountInBatch) + selectedIndex));
    //starts at selection, and gets range of items
    else setIsFirstRun(false);
  }, [selectedIndex]);

  const getVerses = async () => {
    if (!selectedChapter || !selectedVerse) {
      notification.error("need a chapter AND verse selected to retrieve a verse.");
      return;
    }

    for (let i = 0; i < versesArray.length; i++) {
      if (versesArray[i].ChapterNumber.toString() === selectedChapter) {
        if (versesArray[i].VerseNumber.toString() === selectedVerse) {
          if (selectedIndex === i)
            //the selectedIndex will not be changing; still need to set Sel Verses
            setSelectedVersesObject(versesArray.slice(selectedIndex, Number(amountInBatch) + selectedIndex));
          else setSelectedIndex(i);
          return;
        }
      }
    }
  };

  const getNextVerse = async () => {
    setSelectedIndex(selectedIndex + Number(amountInBatch));
  };

  function handleAmtInBatchChange(newVal: string): void {
    const _v = newVal.trim();
    if (_v.length === 0 || isValidNumber(_v)) setAmountInBatch(_v);
  }

  function handleSelectedChapterChange(newVal: string): void {
    const _v = newVal.trim();
    if (_v.length === 0 || isValidNumber(_v)) setSelectedChapter(_v);
  }

  function handleSelectedVerseChange(newVal: string): void {
    const _v = newVal.trim();
    if (_v.length === 0 || isValidNumber(_v)) setSelectedVerse(_v);
  }

  return (
    <>
      {/* <BookDDL
        selectedContract={selectedContract}
        setSelectedContract={setSelectedContract}
        setSelectedBookId={setSelectedBookId}
        setVersesArray={setVersesArray}
      /> */}

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

      <p className="text-sm font-bold md:text-md lg:text-lg">how many in batch?</p>
      <input
        className="w-full sm:w-3/4 input input-bordered input-accent"
        value={amountInBatch}
        onChange={e => handleAmtInBatchChange(e.target.value)}
        aria-label="Amount"
      />
      <p className="text-sm font-bold md:text-md lg:text-lg">choose where to start</p>
      <div className="flex flex-col gap-2 md:flex-row md:justfy-between">
        <input
          placeholder="chapter number"
          className="w-full sm:w-3/4 input input-bordered input-accent"
          value={selectedChapter}
          onChange={e => handleSelectedChapterChange(e.target.value)}
          aria-label="Chapter"
        />

        <input
          placeholder="verse number"
          className="w-full sm:w-3/4 input input-bordered input-accent"
          value={selectedVerse}
          onChange={e => handleSelectedVerseChange(e.target.value)}
          aria-label="Verse"
        />

        <button className="btn btn-primary" onClick={() => getVerses()}>
          GET VERSES
        </button>
      </div>

      {selectedVersesObject?.length > 0 && (
        <>
          <div className="px-6 pt-10 pb-8 mt-6 shadow-xl bg-primary sm:mx-auto sm:max-w-11/12 md:w-full sm:rounded-lg sm:px-10">
            {selectedVersesObject?.map(verse => (
              <div key={verse.FullVerseChapter} className="flex flex-row gap-6">
                <p className="text-lg text-nowrap">{verse?.FullVerseChapter}</p>
                <p className="text-2xl">{verse?.VerseContent}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-6 mb-6">
        <button className="btn btn-primary" onClick={() => getNextVerse()}>
          GET NEXT
        </button>
      </div>

      <hr />

      <div className="mt-32">
        {selectedVersesObject !== undefined && (
          <>
            <SaveVerses
              content={selectedVersesObject.map(x => x.VerseContent)}
              chapterNum={selectedVersesObject.map(x => BigInt(x.ChapterNumber))}
              verseNum={selectedVersesObject.map(x => BigInt(x.VerseNumber))}
              selectedContract={selectedContract}
              setSelectedContract={setSelectedContract}
              selectedBookId={selectedBookId}
              setSelectedBookId={setSelectedBookId}
              deployedContractData={theSelectedContractData} //at this point it is for the .abi
            />
          </>
        )}
      </div>
    </>
  );
};
