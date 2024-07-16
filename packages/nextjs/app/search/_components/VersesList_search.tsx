import { useEffect, useRef, useState } from "react";
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
  const scrollToRef = useRef(null);

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
      <div className="flex self-center w-full">
        <article className="px-4 mx-auto mt-8 mb-16 prose lg:prose-lg md:px-0">
          <h1 className="text-center">Gospel of John (KJV)</h1>
          <h3 className="text-center">Search for Bible verses on the blockchain</h3>
        </article>
      </div>

      <div className="flex flex-row justify-center w-full gap-1 px-4 mx-auto mb-12 lg:w-11/12 xl:w-3/4 xl:px-0">
        <div className="flex flex-row w-11/12 xl:w-3/4">
          <input
            className="w-full h-12 pl-4 bg-secondary text-secondary-content focus:outline-none"
            placeholder="Search by text"
            value={userSearchInput}
            onChange={e => setUserSearchInput(e.target.value)}
            onKeyDown={e => (e.key === "Enter" ? handleSearch() : null)}
          ></input>
          <button className="px-4 rounded-none md:px-6 btn btn-primary" onClick={() => handleSearch()}>
            <MagnifyingGlassCircleIcon className="w-8 h-8" />
          </button>
        </div>
        <button className="px-2 ml-2 rounded-none md:px-10 btn btn-primary" onClick={() => clearSearch()}>
          <XCircleIcon className="w-8 h-8" />
        </button>
      </div>
      <div ref={scrollToRef}>
        <PaginationTop pageNum={pageNum} pageSize={pageSize} setPageNum={setPageNum} setPageSize={setPageSize} />
        {queryLoading ? (
          <LoadingSpinner />
        ) : (
          <>{data?.verses?.length > 0 && <VersesDisplay_ListView verses={data.verses} />}</>
        )}

        <PaginationBottom pageNum={pageNum} setPageNum={setPageNum} scrollTo={scrollToRef} />
      </div>
    </>
  );
};
