import { useEffect, useRef, useState } from "react";
import { ArticleOne } from "./ArticleOne";
import { useApolloClient } from "@apollo/client";
import { MagnifyingGlassCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { VersesDisplay_ListView } from "~~/components/VersesDisplay_listview";
import { BookDDL } from "~~/components/helpers/BookDDL";
import { LoadingSpinner } from "~~/components/helpers/LoadingSpinner";
import { PaginationBottom } from "~~/components/helpers/PaginationBottom";
import { PaginationTop } from "~~/components/helpers/PaginationTop";
import {
  GQL_VERSES_For_Display_with_search_all_books,
  GQL_VERSES_For_Display_with_search_one_book,
} from "~~/helpers/getQueries";

export const VersesList_Search = () => {
  const [isFirstRun, setIsFirstRun] = useState(true);

  const client = useApolloClient();
  const [userSearchInput, setUserSearchInput] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [pageNum, setPageNum] = useState(0);
  const [data_allbooks, setData_allbooks] = useState({});
  const [data_onebook, setData_onebook] = useState({});
  const [queryLoading, setQueryLoading] = useState(true);
  const scrollToRef = useRef(null);

  const [selectedBookId, setSelectedBookId] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<string>("");

  const [booksCleared, setBooksCleared] = useState<boolean>(false);

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

  //so that changing books will trigger a query
  useEffect(() => {
    if (!isFirstRun) preQuery();
  }, [selectedBook]);

  useEffect(() => {
    if (booksCleared) setSelectedBook("");
  }, [booksCleared]);

  const preQuery = async () => {
    setQueryLoading(true);
    if (selectedBook === "") {
      if (userSearchInput.trim().length === 0) {
        doQuery_allbooks({
          limit: pageSize,
          offset: pageNum * pageSize,
        });
      } else {
        doQuery_allbooks({
          limit: pageSize,
          offset: pageNum * pageSize,
          searchBy: userSearchInput,
        });
      }
    } else {
      if (userSearchInput.trim().length === 0) {
        doQuery_onebook({
          limit: pageSize,
          offset: pageNum * pageSize,
          searchByBook: selectedBookId,
        });
      } else {
        doQuery_onebook({
          limit: pageSize,
          offset: pageNum * pageSize,
          searchByBook: selectedBookId,
          searchBy: userSearchInput,
        });
      }
    }
  };

  const doQuery_onebook = async (options: object) => {
    setQueryLoading(true);
    await client
      .query({
        query: GQL_VERSES_For_Display_with_search_one_book(userSearchInput),
        variables: options,
        fetchPolicy: "no-cache",
      })
      .then(d => {
        setData_onebook(d.data);
      })
      .catch(e => {
        console.log("GQL_VERSES_For_Display_with_search_one_book QUERY ERROR: ", e);
      });
    setQueryLoading(false);
  };

  const doQuery_allbooks = async (options: object) => {
    setQueryLoading(true);
    await client
      .query({
        query: GQL_VERSES_For_Display_with_search_all_books(userSearchInput),
        variables: options,
        fetchPolicy: "no-cache",
      })
      .then(d => {
        setData_allbooks(d.data);
      })
      .catch(e => {
        console.log("GQL_VERSES_For_Display_with_search_all_books QUERY ERROR: ", e);
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

  const clearBooks = () => {
    setBooksCleared(!booksCleared);
  };

  return (
    <>
      <ArticleOne />
      <div className="flex flex-row justify-center w-full gap-1 px-4 mx-auto mb-12 lg:w-11/12 xl:w-3/4 xl:px-0">
        <div className="flex flex-row w-11/12 xl:w-3/4">
          {!booksCleared && (
            <BookDDL
              selectedContract={selectedBook}
              setSelectedContract={setSelectedBook}
              setSelectedBookId={setSelectedBookId}
            />
          )}

          {/* <button
            className="px-2 ml-2 rounded-none md:px-10 btn btn-primary"
            onClick={() => clearBooks()}
            aria-labelledby="Clear Books Button"
          >
            <XCircleIcon className="w-8 h-8" />
          </button> */}
        </div>
      </div>

      <div className="flex flex-row justify-center w-full gap-1 px-4 mx-auto mb-12 lg:w-11/12 xl:w-3/4 xl:px-0">
        <div className="flex flex-row w-11/12 xl:w-3/4">
          <input
            className="w-full h-12 pl-4 bg-secondary text-secondary-content focus:outline-none"
            placeholder="Search by text"
            value={userSearchInput}
            onChange={e => setUserSearchInput(e.target.value)}
            onKeyDown={e => (e.key === "Enter" ? handleSearch() : null)}
            aria-labelledby="Search by text"
          ></input>
          <button
            className="px-4 rounded-none md:px-6 btn btn-primary"
            onClick={() => handleSearch()}
            aria-labelledby="Search Button"
          >
            <MagnifyingGlassCircleIcon className="w-8 h-8" />
          </button>
        </div>
        <button
          className="px-2 ml-2 rounded-none md:px-10 btn btn-primary"
          onClick={() => clearSearch()}
          aria-labelledby="Clear Search Button"
        >
          <XCircleIcon className="w-8 h-8" />
        </button>
      </div>
      <div ref={scrollToRef}>
        <PaginationTop pageNum={pageNum} pageSize={pageSize} setPageNum={setPageNum} setPageSize={setPageSize} />

        {queryLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {selectedBook === "" ? (
              <>{data_allbooks?.verses?.length > 0 && <VersesDisplay_ListView verses={data_allbooks.verses} />}</>
            ) : (
              <>
                {data_onebook?.verses?.length > 0 && (
                  <VersesDisplay_ListView selectedBook={selectedBook} verses={data_onebook.verses} />
                )}
              </>
            )}
          </>
        )}

        <PaginationBottom pageNum={pageNum} setPageNum={setPageNum} scrollTo={scrollToRef} />
      </div>
    </>
  );
};
