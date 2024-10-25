import { useEffect, useState } from "react";
import { LockBook } from "./LockBook";
import { SaveVerses } from "./SaveVerses";
import { BookContractDDL } from "~~/components/helpers/BookContractDDL";
import { LoadingSpinner } from "~~/components/helpers/LoadingSpinner";
import deployedContracts from "~~/contracts/deployedContracts";
import { isValidNumber } from "~~/helpers/utils";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { getActs } from "~~/json_bible/Acts";
import { getGospelOfJohn } from "~~/json_bible/John";
import { getGospelOfLuke } from "~~/json_bible/Luke";
import { getGospelOfMark } from "~~/json_bible/Mark";
import { getGospelOfMatthew } from "~~/json_bible/Matthew";
import { notification } from "~~/utils/scaffold-eth";

export const AddVerses = () => {
  const { targetNetwork } = useTargetNetwork();
  const [versesArray, setVersesArray] = useState<object[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedVerse, setSelectedVerse] = useState("");
  const [selectedIndex, setSelectedIndex] = useState("");
  const [amountInBatch, setAmountInBatch] = useState("100");
  const [selectedVersesObject, setSelectedVersesObject] = useState<object[]>(undefined);
  const [isFirstRun, setIsFirstRun] = useState(true);

  const [selectedContractTitle, setSelectedContractTitle] = useState<string>("");
  const [selectedContract, setSelectedContract] = useState<string>("");
  const [selectedBookId, setSelectedBookId] = useState<string>("");

  const bookManager = deployedContracts[targetNetwork.id].BookManager;

  const [cloneContractsData, setCloneContractsData] = useState<object[]>();
  const [theSelectedContractData, setTheSelectedCloneContractData] = useState<any>();

  const { data: listOfBookContracts, isLoading: isListLoading } = useScaffoldReadContract({
    contractName: "BookDeployer",
    functionName: "getDeployments",
  });

  useEffect(() => {
    if (isListLoading) {
      setIsInitialized(false);
    } else if (listOfBookContracts && listOfBookContracts?.length > 0) {
      setIsInitialized(true);
    } else {
      setIsInitialized(false);
      // notification.error("No Book Deployments Found"); //TODO: 
    }
  }, [isListLoading]);

  useEffect(() => {
    if (selectedContractTitle && selectedContractTitle !== "") {
      console.log("selectedContractTitle", selectedContractTitle);
      // switch case for selectedContractTitle
      switch (selectedContractTitle.trim().toLowerCase()) {
        case "matthew":
          setVersesArray(getGospelOfMatthew());
          break;
        case "mark":
          setVersesArray(getGospelOfMark());
          break;
        case "luke":
          setVersesArray(getGospelOfLuke());
          break;
        case "john":
          setVersesArray(getGospelOfJohn());
          break;
        case "acts":
          setVersesArray(getActs());
          break;
        default:
          console.log("wat do?", selectedContractTitle);
          break;
      }
    }
  }, [selectedContractTitle]);

  useEffect(() => {
    if (selectedContract) {
      const theSelectedCloneContractData = cloneContractsData.find(c => c.address === selectedContract);
      console.log("theSelectedCloneContractData", theSelectedCloneContractData);
      setTheSelectedCloneContractData(theSelectedCloneContractData);
    }
  }, [selectedContract]);

  useEffect(() => {
    const dataArray = [];
    if (listOfBookContracts) {
      for (const deployment of listOfBookContracts) {
        const data = Object.create(bookManager);
        data.address = deployment.bookAddress;
        dataArray.push(data);
      }
    }
    if (!listOfBookContracts || listOfBookContracts?.length === 0) {
      setIsInitialized(true);
      return;
    }

    if (listOfBookContracts?.length < 2) setSelectedContract(listOfBookContracts[0].bookAddress); //todo:

    setCloneContractsData(dataArray);
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
      {isListLoading || !isInitialized ? (
        <>
          <h1 className="text-center">Loading...</h1>
          <h2 className="text-center">May take a second, grabbing deployed books</h2>
          <LoadingSpinner />
        </>
      ) : (
        <>
          {!cloneContractsData || cloneContractsData?.length === 0 ? (
            <>
              <h1 className="text-center">No Books Deployed...</h1>
            </>
          ) : (
            <>
              <div className="flex flex-row justify-around mb-12">
                <BookContractDDL
                  listOfBookContracts={listOfBookContracts}
                  selectedContract={selectedContract} //just to display on ddl
                  setSelectedContract={setSelectedContract}
                  setSelectedContractTitle={setSelectedContractTitle}
                />
                {selectedVersesObject !== undefined && (
                  <>
                    <SaveVerses
                      content={selectedVersesObject.map(x => x.VerseContent)}
                      chapterNum={selectedVersesObject.map(x => BigInt(x.ChapterNumber))}
                      verseNum={selectedVersesObject.map(x => BigInt(x.VerseNumber))}
                      selectedContract={selectedContract}
                      setSelectedContract={setSelectedContract}
                      selectedContractTitle={selectedContractTitle}
                      selectedBookId={selectedBookId}
                      setSelectedBookId={setSelectedBookId}
                      deployedContractData={theSelectedContractData} //at this point it is for the .abi
                    />
                  </>
                )}
              </div>

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

              <div className="flex flex-row justify-around mt-6 mb-6">
                <button className="btn btn-primary" onClick={() => getNextVerse()}>
                  GET NEXT
                </button>
                <LockBook
                  selectedContract={selectedContract}
                  selectedContractTitle={selectedContractTitle}
                  deployedContractData={theSelectedContractData}
                  bookId={selectedBookId}
                />
              </div>

              {selectedVersesObject?.length > 0 ? (
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
              ) : (
                <>
                  <div className="flex flex-col w-full prose-2xl">
                    <p className="text-center">Select a deployed book to get started</p>
                  </div>
                </>
              )}

              <hr />
            </>
          )}
        </>
      )}
    </>
  );
};
