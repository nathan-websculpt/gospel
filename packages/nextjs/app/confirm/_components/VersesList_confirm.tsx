import { useEffect, useState } from "react";
import Link from "next/link";
import { ConfirmVerse } from "./ConfirmVerse";
import { useApolloClient, useQuery } from "@apollo/client";
import { BookContractDDL } from "~~/components/helpers/BookContractDDL";
import { BookDDL } from "~~/components/helpers/BookDDL";
import { LoadingSpinner } from "~~/components/helpers/LoadingSpinner";
import { PaginationBottom } from "~~/components/helpers/PaginationBottom";
import { PaginationTop } from "~~/components/helpers/PaginationTop";
import deployedContracts from "~~/contracts/deployedContracts";
import { GQL_BOOKS_List, GQL_VERSES_For_Confirmation } from "~~/helpers/getQueries";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { notification } from "~~/utils/scaffold-eth";

export const VersesList_Confirm = () => {
  console.log("VersesList_Confirm");
  const [isInitialized, setIsInitialized] = useState(false);
  const [isFirstRun, setIsFirstRun] = useState(true);
  const { targetNetwork } = useTargetNetwork();
  const client = useApolloClient();
  const [pageSize, setPageSize] = useState(25);
  const [pageNum, setPageNum] = useState(0);

  const [data_onebook, setData_onebook] = useState({});
  const [queryLoading, setQueryLoading] = useState(false);

  const [cloneContractsData, setCloneContractsData] = useState<object[]>();
  const [selectedContractTitle, setSelectedContractTitle] = useState<string>("");
  const [selectedContract, setSelectedContract] = useState<string>("");
  const [theSelectedContractData, setTheSelectedCloneContractData] = useState<any>();
  const [selectedBookId, setSelectedBookId] = useState<string>("");

  const bookManager = deployedContracts[targetNetwork.id].BookManager;

  //to get the book id later
  const {
    loading: simpleBookListLoading,
    error: simpleBookListError,
    data: simpleBookList,
  } = useQuery(GQL_BOOKS_List());

  const { data: listOfBookContracts, isLoading: isListLoading } = useScaffoldReadContract({
    contractName: "BookDeployer",
    functionName: "getDeployments",
  });

  useEffect(() => {
    console.log("useEffect: isListLoading", isListLoading);
    console.log("useEffect: listOfBookContracts", listOfBookContracts);
    if (isListLoading) {
      setIsInitialized(false);
    } else if (listOfBookContracts && listOfBookContracts?.length > 0) {
      setIsInitialized(true);
    } else {
      setIsInitialized(false);
      // notification.error("No Book Deployments Found"); //TODO
    }
  }, [isListLoading]);

  useEffect(() => {
    console.log("useEffect: selectedContract", selectedContract);
    if (selectedContract) {
      const theSelectedCloneContractData = cloneContractsData.find(c => c.address === selectedContract);
      console.log("useEffect: theSelectedCloneContractData", theSelectedCloneContractData);
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

  //TODO: If ddl defaults to no selection, then there is no need to preQuery ... still not sure what code these ddls share, so it's getting dirty
  //still not sure if this shared ddl should default to anything

  useEffect(() => {
    console.log("useEffect: isFirstRun", isFirstRun);
    if (!isFirstRun) preQuery();
    else setIsFirstRun(false);
  }, [pageSize, pageNum]);

  // prevents double-querying on page load
  useEffect(() => {
    console.log("useEffect: isFirstRun", isFirstRun);
    if (!isFirstRun && isInitialized && selectedContract && selectedContract !== "") preQuery();
  }, [isFirstRun]);

  //when DDL change, use Contract Title to get the book id (which is needed to query verses)
  useEffect(() => {
    if (!simpleBookList) return;
    const theBook = simpleBookList?.books?.find(b => b.title === selectedContractTitle);
    if (theBook) setSelectedBookId(theBook.id);
  }, [selectedContractTitle]);

  useEffect(() => {
    console.log("useEffect: selectedBookId", selectedBookId);
    if (selectedBookId !== "") preQuery();
  }, [selectedBookId]);

  const preQuery = async () => {
    console.log("preQuery: selectedBookId", selectedBookId);
    console.log("pageNum + pageSize", pageNum, pageSize);
    setQueryLoading(true);

    doQuery({
      limit: pageSize,
      offset: pageNum * pageSize,
      searchByBook: selectedBookId,
    });

    setQueryLoading(false);
  };

  const doQuery = async (options: object) => {
    setQueryLoading(true);
    await client
      .query({
        query: GQL_VERSES_For_Confirmation(),
        variables: options,
        fetchPolicy: "no-cache",
      })
      .then(d => {
        setData_onebook(d.data);
      })
      .catch(e => {
        console.log("doQuery: ERROR: ", e);
      });
    setQueryLoading(false);
  };

  //TODO: Do this better, this is a hack
  //I will probably have to do manual polling for these queries since the addresses are dynamic
  const [count, setCount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prevCount => prevCount + 1);
      if (data_onebook?.verses?.length > 0) {
        console.log("Timer ... running preQuery");
        preQuery();
      } else {
        console.log("Timer ... nothing to run.");
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [count, data_onebook]);

  return (
    <>
      <div className="flex self-center w-full">
        <article className="px-4 mx-auto mt-8 prose mb-14 lg:prose-lg md:px-0">
          <h2 className="text-center">Want to confirm a verse?</h2>
          <h3 className="text-center prose-h4:">Please verify the text against the original</h3>
          <h4 className="text-center">
            You can confirm verses for pennies on
            <span> </span>
            <Link href="https://www.optimism.io/" passHref className="link" target="_blank">
              Optimism
            </Link>{" "}
          </h4>
          <p className="mt-12 text-center">** Select a book to get started...</p>
        </article>
      </div>
      {/* todo: figure out this css */}
      <div className="flex items-center justify-center w-3/5 mx-auto mb-12 xl:w-1/5 max-w-4/5">
        <BookContractDDL
          listOfBookContracts={listOfBookContracts}
          selectedContract={selectedContract} //just to display on ddl
          setSelectedContract={setSelectedContract}
          setSelectedContractTitle={setSelectedContractTitle}
        />
      </div>

      <PaginationTop pageNum={pageNum} pageSize={pageSize} setPageNum={setPageNum} setPageSize={setPageSize} />

      {queryLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {data_onebook?.verses?.map(verse => (
            <div key={verse.id.toString()} className="flex flex-row">
              <ConfirmVerse
                content={verse.verseContent}
                chapterNum={verse.chapterNumber}
                verseNum={verse.verseNumber}
                verseId={verse.id}
                confirmationCount={verse.confirmationCount}
                numericalId={BigInt(verse.verseId)}
                selectedContract={selectedContract}
                deployedContractData={theSelectedContractData}
              />
            </div>
          ))}
        </>
      )}

      <PaginationBottom pageNum={pageNum} setPageNum={setPageNum} />
    </>
  );
};
