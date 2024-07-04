import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { MagnifyingGlassCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { VersesDisplay_ListView } from "~~/components/VersesDisplay_listview";
import { LoadingSpinner } from "~~/components/helpers/LoadingSpinner";
import { PaginationBottom } from "~~/components/helpers/PaginationBottom";
import { PaginationTop } from "~~/components/helpers/PaginationTop";
import { GQL_VERSES_For_Display_with_search } from "~~/helpers/getQueries";

export const VersesList_Search = () => {
  const [isFirstRun, setIsFirstRun] = useState(true);

  const client = useApolloClient();
  const [userSearchInput, setUserSearchInput] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [pageNum, setPageNum] = useState(0);
  const [data, setData] = useState({});
  const [queryLoading, setQueryLoading] = useState(true);

  useEffect(() => {
    if (!isFirstRun) preQuery();
    else setIsFirstRun(false);
  }, [pageSize, pageNum]);

  // prevents double-querying on page load
  useEffect(() => {
    if (!isFirstRun) preQuery();
  }, [isFirstRun]);

  //so that clearing the search box will trigger a query
  useEffect(() => {
    if (!isFirstRun && userSearchInput.trim().length === 0) preQuery();
  }, [userSearchInput]);

  const preQuery = async () => {
    setQueryLoading(true);
    if (userSearchInput.trim().length === 0) {
      doQuery({
        limit: pageSize,
        offset: pageNum * pageSize,
      });
    } else {
      doQuery({
        limit: pageSize,
        offset: pageNum * pageSize,
        searchBy: userSearchInput,
      });
    }
  };

  const doQuery = async (options: object) => {
    setQueryLoading(true);
    await client
      .query({
        query: GQL_VERSES_For_Display_with_search(userSearchInput),
        variables: options,
        fetchPolicy: "no-cache",
      })
      .then(d => {
        setData(d.data);
      })
      .catch(e => {
        console.log("QUERY ERROR: ", e);
      });
    setQueryLoading(false);
  };

  const clearSearch = () => {
    setUserSearchInput("");
  };

  const handleSearch = () => {
    // need to be at page one
    // a change of page num will also cause a query
    if (pageNum === 0) {
      preQuery();
    } else {
      setPageNum(0);
    }
  };

  return (
    <>
      {/* <div className="flex self-center w-full mb-6">
          {data?.verses?.length > 0 && (
            <>
              <article className="px-4 mx-auto mt-8 mb-12 prose lg:prose-lg md:px-0">
                <h1 className="text-center">Gospel of John (KJV)</h1>
                <blockquote>Contract has not been audited, and it should be considered a proof-of-concept.</blockquote>
                <p>
                  Can not currently confirm that this properly represents The Gospel of John (KJV) [neither in-part, nor
                  in-full].
                </p>
                <p>
                  If you are reading this, you are reading from the blockchain on Optimism Mainnet at Smart Contract
                  address:
                </p>
                <p className="break-all">0x29BB1313321dbA27Ad074DD6AD2943040319B439</p>
              </article>
            </>
          )}
        </div> */}

      <div className="flex flex-row justify-center w-full gap-1 px-4 mx-auto mb-12 lg:w-11/12 xl:w-3/4 xl:px-0">
        <div className="flex flex-row w-11/12 xl:w-3/4">
          <input
            className="w-full h-12 pl-4 bg-secondary text-secondary-content"
            placeholder="Search by text"
            value={userSearchInput}
            onChange={e => setUserSearchInput(e.target.value)}
            onKeyDown={e => (e.key === "Enter" ? handleSearch() : null)}
          ></input>
          <button className="px-4 py-2 md:px-8 bg-primary" onClick={() => handleSearch()}>
            <MagnifyingGlassCircleIcon className="w-8 h-8" />
          </button>
        </div>
        <button className="px-2 py-2 ml-2 text-sm md:px-6 xl:text-xl bg-primary" onClick={() => clearSearch()}>
          <XCircleIcon className="w-8 h-8" />
        </button>
      </div>
      <div>
        <PaginationTop pageNum={pageNum} pageSize={pageSize} setPageNum={setPageNum} setPageSize={setPageSize} />
        {queryLoading ? (
          <LoadingSpinner />
        ) : (
          <>{data?.verses?.length > 0 && <VersesDisplay_ListView verses={data.verses} />}</>
        )}

        <PaginationBottom pageNum={pageNum} setPageNum={setPageNum} />
      </div>
    </>
  );
};
