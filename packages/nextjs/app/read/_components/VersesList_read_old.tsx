import { useEffect, useRef, useState } from "react";
import { ArticleOne } from "./ArticleOne";
import { ArticleTwo } from "./ArticleTwo";
import { useApolloClient } from "@apollo/client";
import { VersesDisplay_ListView } from "~~/components/VersesDisplay_listview";
import { BookDDL } from "~~/components/helpers/BookDDL";
import { LoadingSpinner } from "~~/components/helpers/LoadingSpinner";
import { PaginationBottom } from "~~/components/helpers/PaginationBottom";
import { PaginationTop } from "~~/components/helpers/PaginationTop";
import {
  GQL_VERSEID_by_chapter_and_verse,
  GQL_VERSES_after_verseid,
  GQL_VERSES_by_chapter,
} from "~~/helpers/getQueries";
import { getActsMetaData } from "~~/json_bible/ActsMeta";
import { getJohnMetaData } from "~~/json_bible/JohnMeta";
import { getLukeMetaData } from "~~/json_bible/LukeMeta";
import { getMarkMetaData } from "~~/json_bible/MarkMeta";
import { getMatthewMetaData } from "~~/json_bible/MatthewMeta";

export const VersesList_Read = () => {
  const [isFirstRun, setIsFirstRun] = useState(true);

  const client = useApolloClient();
  const [viewStyleDisplayString, setViewStyleDisplayString] = useState("Book View");

  const defaultChapterValue = "Select Chapter";
  const defaultVerseValue = "Select Verse";
  const [metaData, setMetaData] = useState<any[]>(getJohnMetaData());
  const [versesList, setVersesList] = useState<number[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState(defaultChapterValue);
  const [selectedVerse, setSelectedVerse] = useState(defaultVerseValue);

  const [isListMode, setIsListMode] = useState(false);
  const [pageSize, setPageSize] = useState(25);
  const [pageNum, setPageNum] = useState(0);
  const [data, setData] = useState({});
  const [queryLoading, setQueryLoading] = useState(true);
  const scrollToRef = useRef(null);

  useEffect(() => {
    console.log("Changing chapter and verse drop downs to book:", selectedBook);
    switch (selectedBook) {
      case "Matthew":
        setMetaData(getMatthewMetaData());
        break;
      case "Mark":
        setMetaData(getMarkMetaData());
        break;
      case "Luke":
        setMetaData(getLukeMetaData());
        break;
      case "John":
        setMetaData(getJohnMetaData());
        break;
      case "Acts":
        setMetaData(getActsMetaData());
        break;
      default:
        console.log("...defaulting to Matthew's Meta Data for chapter and verse drop downs");
        setMetaData(getMatthewMetaData());
        break;
    }
  }, [selectedBook]);

  useEffect(() => {
    if (!isFirstRun) preQuery();
    else setIsFirstRun(false);
  }, [pageSize, pageNum]);

  // prevents double-querying on page load
  useEffect(() => {
    if (!isFirstRun) preQuery();
  }, [isFirstRun]);

  useEffect(() => {
    if (isListMode) setViewStyleDisplayString("List View");
    else setViewStyleDisplayString("Book View");
  }, [isListMode]);

  const preQuery = async () => {
    setQueryLoading(true);
    if (isNaN(selectedChapter) && isNaN(selectedVerse)) {
      // get all
      doQuery_basic({
        limit: pageSize,
        offset: pageNum * pageSize,
        searchByBook: selectedBookId,
      });
    } else if (isNaN(selectedVerse)) {
      // chapter selected - no verse selected
      doQuery_basic({
        limit: pageSize,
        offset: pageNum * pageSize,
        chapterNumberInput: selectedChapter,
        searchByBook: selectedBookId,
        searchByChapterNumber: selectedChapter,
      });
    } else {
      // both chapter and verse are selected
      // get the single verse user selected, and
      // then send it to a separate query
      // returning all verses with a Numerical ID that is
      // greater-than/equal-to the selected verse
      doQuery_getVerseId({
        searchByBook: selectedBookId,
        searchByChapterNumber: selectedChapter,
        searchByVerseNumber: selectedVerse,
      });
    }
  };

  const doQuery_basic = async (options: object) => {
    const thisChapterQuery = isNaN(selectedChapter) ? "" : selectedChapter;
    await client
      .query({
        query: GQL_VERSES_by_chapter(thisChapterQuery),
        variables: options,
        fetchPolicy: "no-cache",
      })
      .then(d => {
        setData(d.data);
      })
      .catch(e => {
        console.log("GQL_VERSES_by_chapter QUERY ERROR: ", e);
      });
    setQueryLoading(false);
  };

  // a 2-part query
  // first gets the selected numerical (Verse) ID
  // then queries for all verses that are greater-than/equal-to
  const doQuery_getVerseId = async (options: object) => {
    await client
      .query({
        query: GQL_VERSEID_by_chapter_and_verse(),
        variables: options,
        fetchPolicy: "no-cache",
      })
      .then(d => {
        if (d?.data?.verses?.length > 0) {
          doQuery_searchByVerseId({
            limit: pageSize,
            offset: pageNum * pageSize,
            searchByBook: selectedBookId,
            searchByNumericalVerseId: d?.data?.verses[0].verseId,
          });
        } else {
          console.log("No verse found on object:", d?.data);
          setQueryLoading(false);
        }
      })
      .catch(e => {
        console.log("GQL_VERSEID_by_chapter_and_verse QUERY ERROR: ", e);
        setQueryLoading(false);
      });
  };

  const doQuery_searchByVerseId = async (options: object) => {
    await client
      .query({
        query: GQL_VERSES_after_verseid(),
        variables: options,
        fetchPolicy: "no-cache",
      })
      .then(d => {
        setData(d.data);
      })
      .catch(e => {
        console.log("GQL_VERSES_after_verseid QUERY ERROR: ", e);
      });
    setQueryLoading(false);
  };

  const changeChapter = e => {
    setSelectedChapter(e.target.value.toString());
    setVersesList(getJohnMetaData().find(x => x.ChapterNumber.toString() === e.target.value.toString())?.Verses);
    setSelectedVerse(defaultVerseValue);
  };

  const changeVerse = e => {
    setSelectedVerse(e.target.value.toString());
  };

  const handleToggle = () => {
    setIsListMode(!isListMode);
  };

  const getClicked = () => {
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
      <ArticleOne />
      <div className="flex self-center w-full mb-6">
        {data?.verses?.length > 0 && (
          <>
            {/* TODO: */}
            {/* <ArticleTwo /> */}
          </>
        )}
      </div>

      <div className="flex flex-col items-center justify-center gap-1 mb-12 lg:justify-between lg:flex-row lg:px-12">
        <div className="flex flex-row gap-4 place-items-center">
          <label className="btn btn-circle btn-primary swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              className="focus:outline-none"
              type="checkbox"
              onChange={handleToggle}
              checked={isListMode}
              aria-label="Change View Mode"
            />

            {/* icons from: https://heroicons.com/solid */}
            {/* LIST icon */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 swap-on">
              <path
                fillRule="evenodd"
                d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z"
                clipRule="evenodd"
              />
            </svg>

            {/* BOOK icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 swap-off"
            >
              <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
            </svg>
          </label>
          <p className="text-sm font-bold sm:text-md lg:text-xl">{viewStyleDisplayString}</p>
        </div>
        <div className="flex flex-row justify-center mt-4 sm:justify-around lg:mt-0">
          {metaData !== undefined && metaData !== null && (
            <>
              <BookDDL
                selectedContract={selectedBook}
                setSelectedContract={setSelectedBook}
                setSelectedBookId={setSelectedBookId}
              />
              <select
                className="w-32 px-2 py-2 mr-1 text-xs rounded-none sm:px-6 sm:py-2 sm:mr-2 sm:text-sm md:text-md lg:text-lg sm:w-44 btn btn-primary"
                value={selectedChapter}
                onChange={changeChapter}
                aria-label="Change Chapter"
              >
                <option>{defaultChapterValue}</option>
                {metaData.map(md => (
                  <option key={md.ChapterNumber.toString() + md.Verses.length.toString()} value={md.ChapterNumber}>
                    {md.ChapterNumber}
                  </option>
                ))}
              </select>

              <select
                className="w-32 px-2 py-2 mr-2 text-xs rounded-none sm:px-6 sm:py-2 sm:mr-4 sm:text-sm md:text-md lg:text-lg sm:w-44 btn btn-primary"
                value={selectedVerse}
                onChange={changeVerse}
                aria-label="Change Verse"
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
          <button
            className="px-4 py-2 text-xs rounded-none sm:px-6 sm:py-2 sm:px-8 sm:text-sm md:text-md lg:text-lg btn btn-primary"
            onClick={() => getClicked()}
            aria-label="Get Selected Verses"
          >
            GET
          </button>
        </div>
      </div>

      <div ref={scrollToRef}>
        <PaginationTop pageNum={pageNum} pageSize={pageSize} setPageNum={setPageNum} setPageSize={setPageSize} />
        {queryLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            {isListMode ? (
              <>{data?.verses?.length > 0 && <VersesDisplay_ListView verses={data.verses} />}</>
            ) : (
              <div className="pt-10 pb-8 pl-4 pr-3 mt-6 shadow-xl bg-primary sm:mx-auto sm:max-w-11/12 lg:w-3/4 sm:rounded-lg sm:px-10 md:pl-10 md:pr-12 xl:pl-16 xl:pr-16 2xl:pl-20 2xl:pr-16">
                {data?.verses?.map(verse => (
                  <span key={verse.id.toString()} className="pl-2 text-sm align-text-bottom">
                    {verse.chapterNumber}:{verse.verseNumber}
                    <span className="pl-2 text-lg align-text-top">{verse.verseContent}</span>
                  </span>
                ))}
              </div>
            )}
          </>
        )}
        <PaginationBottom pageNum={pageNum} setPageNum={setPageNum} scrollTo={scrollToRef} />
      </div>
    </>
  );
};
