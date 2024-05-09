import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { GQL_VERSES_For_Display_search_by_chapter } from "~~/helpers/getQueries";
import { notification } from "~~/utils/scaffold-eth";

export const VersesList_Read = () => {
  const client = useApolloClient();
  const [userSearchInput, setUserSearchInput] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [pageNum, setPageNum] = useState(0);
  const [data, setData] = useState({});
  const [queryLoading, setQueryLoading] = useState(false);

  useEffect(() => {
    preQuery();
  }, [pageSize, pageNum]);

  const preQuery = async () => {
    if (userSearchInput.trim().length === 0) {
      doQuery({
        limit: pageSize,
        offset: pageNum * pageSize,
      });
    } else {
      if (isNaN(+userSearchInput)) {
        notification.warning("Please input a valid Chapter Number");
      } else {
        if (+userSearchInput > 21 || +userSearchInput < 1) {
          notification.warning("There are only 21 Chapters");
        } else {
          doQuery({
            limit: pageSize,
            offset: pageNum * pageSize,
            searchBy: userSearchInput,
          });
        }
      }
    }
  };

  //NOTE: useLazyQuery gets executed again IF ANY of the Options change
  //^^^https://github.com/apollographql/apollo-client/issues/5912#issuecomment-797060422
  //Here, I am just using the Apollo Client directly in order to allow:
  //     - the table to initially load with data
  //     - then, the filtering of the data via the Search Bar
  const doQuery = async (options: object) => {
    setQueryLoading(true);
    await client
      .query({
        query: GQL_VERSES_For_Display_search_by_chapter(userSearchInput),
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

  if (queryLoading) {
    return (
      <div className="flex flex-col items-center gap-2 p-2 m-4 mx-auto border shadow-xl border-base-300 bg-base-200 sm:rounded-lg">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  } else {
    return (
      <>
        <div className="flex self-center w-full mb-6">
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
        </div>

        <div className="flex flex-col justify-center gap-1 mb-12 md:justify-end md:flex-row">
          <input
            className="h-12 pl-4 bg-secondary text-secondary-content"
            placeholder="Search by chapter"
            value={userSearchInput}
            onChange={e => setUserSearchInput(e.target.value)}
          ></input>
          <button className="px-8 py-2 text-xl bg-primary" onClick={() => preQuery()}>
            SEARCH
          </button>
        </div>

        <div className="flex justify-center gap-3 mb-3">
          <span className="my-auto text-lg">Page {pageNum + 1}</span>
          <select
            className="px-4 py-2 text-xl bg-primary"
            onChange={event => setPageSize(parseInt(event.target.value))}
            value={pageSize.toString()}
          >
            <option value="100">Show 100</option>
            <option value="25">Show 25</option>
            <option value="10">Show 10</option>
            <option value="1">Show 1</option>
          </select>
        </div>
        <div className="flex justify-between">
          <button disabled={!pageNum} className="btn btn-primary" onClick={() => setPageNum(prev => prev - 1)}>
            Previous
          </button>
          <button className="btn btn-primary" onClick={() => setPageNum(prev => prev + 1)}>
            Next
          </button>
        </div>

        <div className="px-6 pt-10 pb-8 mt-6 shadow-xl bg-primary sm:mx-auto sm:max-w-11/12 md:w-full sm:rounded-lg sm:px-10">
          {data?.verses?.map(verse => (
            <div key={verse.id.toString()} className="flex flex-row gap-6">
              <p className="text-sm md:text-lg text-nowrap">
                {verse.chapterNumber} : {verse.verseNumber}
              </p>
              <p className="text-md md:text-2xl">{verse.verseContent}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3 mx-5 mt-5">
          <button className="btn btn-sm" disabled={!pageNum} onClick={() => setPageNum(0)}>
            <ArrowLeftIcon className="w-4 h-4" />
            <ArrowLeftIcon className="w-4 h-4" />
          </button>
          <span>...</span>
          <button className="btn btn-sm" disabled={!pageNum} onClick={() => setPageNum(prev => prev - 1)}>
            <ArrowLeftIcon className="w-4 h-4" />
          </button>
          <span className="self-center font-medium text-primary-content">Page {pageNum + 1}</span>
          <button className="btn btn-sm" onClick={() => setPageNum(prev => prev + 1)}>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </>
    );
  }
};
