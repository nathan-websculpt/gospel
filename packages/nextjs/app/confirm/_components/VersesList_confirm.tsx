import { useEffect, useState } from "react";
import Link from "next/link";
import { ConfirmVerse } from "./ConfirmVerse";
import { useQuery } from "@apollo/client";
import { LoadingSpinner } from "~~/components/helpers/LoadingSpinner";
import { PaginationBottom } from "~~/components/helpers/PaginationBottom";
import { PaginationTop } from "~~/components/helpers/PaginationTop";
import { GQL_VERSES_For_Confirmation } from "~~/helpers/getQueries";
import { getJohnMetaData } from "~~/json_bible/JohnMeta";

// has three view modes
//    1. Next-Up View
//      a. shows the user's next verse to confirm
//    2. Viewing All
//      a. shows all verses
//    3. Cascading DDLs
//      a. shows the single verse from selections off of 2 drop-down lists (chapter and verse)

// NOTE:
// isViewAllMode means you are reading from "data"
// !isViewAllMode means you are reading from "filteredVerseList"

export const VersesList_Confirm = () => {
  const [pageSize, setPageSize] = useState(25);
  const [pageNum, setPageNum] = useState(0);

  const { loading, error, data } = useQuery(GQL_VERSES_For_Confirmation(), {
    variables: {
      limit: pageSize,
      offset: pageNum * pageSize,
    },
    pollInterval: 6000, //no longer needs to poll
  });

  useEffect(() => {
    if (error !== undefined && error !== null) console.log("GQL_VERSES_For_Confirmation Query Error: ", error);
  }, [error]);

  useEffect(() => {
    if (data !== undefined && data !== null) console.log("GQL_VERSES_For_Confirmation Query DATA: ", data);
  }, [data]);

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
        </article>
      </div>
      <div className="flex flex-col items-center justify-center gap-1 mb-12 lg:justify-between lg:flex-row lg:px-12">
        <div className="flex flex-row gap-4 place-items-center">
          {Number.isNaN(parseInt(selectedVerse)) ? (
            <>
              <label className="btn btn-circle btn-primary hover:btn-neutral swap swap-rotate">
                {/* this hidden checkbox controls the state */}
                <input type="checkbox" onChange={setViewMode} checked={isViewAllMode} />

                {/* icons from: https://heroicons.com/solid */}
                {/* BARS 2 icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 swap-off"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 9a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9Zm0 6.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>

                {/* BARS 4 icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6 swap-on"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 5.25Zm0 4.5A.75.75 0 0 1 3.75 9h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 9.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm0 4.5a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
              <p className="text-sm font-bold sm:text-md xl:text-xl">{viewStyleDisplayString}</p>
            </>
          ) : (
            <>
              <button onClick={() => setIsViewAllMode(false)} className="btn btn-circle btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <p className="text-xl">Clear Results</p>
            </>
          )}
        </div>
        <div className="flex flex-row justify-center gap-1 mt-4 md:justify-around lg:mt-0">
          {metaData !== undefined && metaData !== null && (
            <>
              <select
                className="w-32 px-6 py-2 mr-4 text-xs sm:w-44 bg-primary sm:text-sm md:text-md lg:text-lg"
                value={selectedChapter}
                onChange={changeChapter}
              >
                <option>{defaultChapterValue}</option>
                {metaData.map(md => (
                  <option key={md.ChapterNumber.toString() + md.Verses.length.toString()} value={md.ChapterNumber}>
                    {md.ChapterNumber}
                  </option>
                ))}
              </select>

              <select
                className="w-32 px-6 py-2 text-xs sm:w-44 bg-primary sm:text-sm md:text-md lg:text-lg"
                value={selectedVerse}
                onChange={changeVerse}
              >
                <option>{defaultVerseValue}</option>
                {versesList !== undefined && versesList !== null && (
                  <>
                    {versesList?.map(verse => (
                      <option key={verse.VerseNumber} value={verse.VerseNumber}>
                        {verse.VerseNumber}
                      </option>
                    ))}
                  </>
                )}
              </select>
            </>
          )}
        </div>
      </div>

      <PaginationTop pageNum={pageNum} pageSize={pageSize} setPageNum={setPageNum} setPageSize={setPageSize} />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {data?.verses?.map(verse => (
            <div key={verse.id.toString()} className="flex flex-row">
              <ConfirmVerse
                content={verse.verseContent}
                chapterNum={verse.chapterNumber}
                verseNum={verse.verseNumber}
                verseId={verse.id}
                confirmationCount={verse.confirmationCount}
                numericalId={BigInt(verse.verseId)}
              />
            </div>
          ))}
        </>
      )}

      <PaginationBottom pageNum={pageNum} setPageNum={setPageNum} />
    </>
  );
};
