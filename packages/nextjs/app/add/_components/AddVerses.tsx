import { useEffect, useState } from "react";
import { SaveVerses } from "./SaveVerses";
import { BookContractDDL } from "~~/components/helpers/BookContractDDL";
import deployedContracts from "~~/contracts/deployedContracts";
import { isValidNumber } from "~~/helpers/utils";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { getGospelOfJohn } from "~~/json_bible/John";
import { notification } from "~~/utils/scaffold-eth";
import { ContractName } from "~~/utils/scaffold-eth/contract";
import { getAllContracts } from "~~/utils/scaffold-eth/contractsData";

export const AddVerses = () => {
  const [versesArray, setVersesArray] = useState<object[]>(getGospelOfJohn());
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedVerse, setSelectedVerse] = useState("");
  const [selectedIndex, setSelectedIndex] = useState("");
  const [amountInBatch, setAmountInBatch] = useState("8");
  const [selectedVersesObject, setSelectedVersesObject] = useState<object[]>(undefined);
  const [isFirstRun, setIsFirstRun] = useState(true);

  const [selectedContract, setSelectedContract] = useState<string>("");
  const [selectedBookId, setSelectedBookId] = useState<string>("");

  const contractsData = getAllContracts();
  const contractNames = Object.keys(contractsData) as ContractName[];

  const { targetNetwork } = useTargetNetwork();
  const bookManager = deployedContracts[targetNetwork.id].BookManager;

  const [clonedContractsAddresses, setClonedContractsAddresses] = useState<string[]>();
  const [cloneContractData, setCloneContractData] = useState<object[]>();
  const [theSelectedContractData, setTheSelectedCloneContractData] = useState<any>();

  const listOfBookContracts = useScaffoldReadContract({
    contractName: "BookDeployer",
    functionName: "getDeployments2",
    watch: false,
  });

  useEffect(() => {
    if (selectedContract) {
      const theSelectedCloneContractData = cloneContractData.find(c => c.address === selectedContract);
      console.log("theSelectedCloneContractData", theSelectedCloneContractData);
      setTheSelectedCloneContractData(theSelectedCloneContractData);
    }
  }, [selectedContract]);

  useEffect(() => {
    const dataArray = [];
    if (listOfBookContracts?.data) {
      for (const deployment of listOfBookContracts.data) {
        const data = Object.create(bookManager);
        data.address = deployment.bAddr;
        dataArray.push(data);
      }
    }

    if (listOfBookContracts?.data?.length < 2) setSelectedContract(listOfBookContracts.data[0].bAddr); //todo:

    setCloneContractData(dataArray);

  }, [listOfBookContracts]);

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
      <BookContractDDL
        listOfBookContracts={listOfBookContracts.data}
        setSelectedContract={setSelectedContract}
      />

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
