import { useEffect, useState } from "react";
import { BaseButtons } from "./BaseButtons";
import { BookDetails } from "./BookDetails";
import { PrevNextButtons } from "./PrevNextButtons";
import { Verses } from "./Verses";
import { ViewBooks } from "./ViewBooks";
import { ViewChapters } from "./ViewChapters";
import { useApolloClient, useQuery } from "@apollo/client";
import { LoadingSpinner } from "~~/components/helpers/LoadingSpinner";
import { GQL_BOOK_TITLES, GQL_VERSES_by_chapter } from "~~/helpers/getQueries";
import { getActsMetaData } from "~~/json_bible/ActsMeta";
import { getJohnMetaData } from "~~/json_bible/JohnMeta";
import { getLukeMetaData } from "~~/json_bible/LukeMeta";
import { getMarkMetaData } from "~~/json_bible/MarkMeta";
import { getMatthewMetaData } from "~~/json_bible/MatthewMeta";

export const Base = () => {
  const client = useApolloClient();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isInViewBooksMode, setIsInViewBooksMode] = useState(false);
  const [isInViewChaptersMode, setIsInViewChaptersMode] = useState(false);

  //TODO: look for null-breaks and checks before moving away from ':any' here
  const [verses, setVerses]: any = useState(null);

  const [prelimBookId, setPrelimBookId] = useState("");
  const [currentBookId, setCurrentBookId] = useState("");
  const [prelimBookTitle, setPrelimBookTitle] = useState("");
  const [currentBookTitle, setCurrentBookTitle] = useState("");
  const [currentChapterTitle, setCurrentChapterTitle] = useState(""); //str version of chapter number
  const [chapterCount, setChapterCount] = useState(0);

  const [currentChapterId, setCurrentChapterId] = useState<number | undefined>(undefined);

  const [queryLoading, setQueryLoading] = useState(true);

  const [metaData, setMetaData] = useState<any[]>(getMatthewMetaData());

  const [justdoit, setjustdoit] = useState(false); // stupid, but instead of checking if a chapter changed, going to use this as a "get verses" ... its value is irrelevant ... just in a useEffect

  const { loading: booksListLoading, error, data: booksList } = useQuery(GQL_BOOK_TITLES(), {});
  useEffect(() => {
    if (error !== undefined && error !== null) console.log("GQL_BOOK_TITLES Query Error: ", error);
  }, [error]);
  useEffect(() => {
    if (booksList !== undefined && booksList !== null) {
      console.log("GQL_BOOK_TITLES Query DATA: ", booksList);
      setCurrentBookId(booksList?.books[0].id); //triggers chapter count to be set
      setCurrentBookTitle(booksList?.books[0].title);
      setCurrentChapterId(1);
      setCurrentChapterTitle("1");

      setIsInitialized(true); //TODO: may not need in prod
    }
  }, [booksList]);

  // Just to reset the chapter count when a book is selected
  useEffect(() => {
    const book = booksList?.books.find(b => b.id === currentBookId);
    if (book) setChapterCount(book.chapterCount);
  }, [currentBookId]);

  // todo: was useful for debugging/testing
  useEffect(() => {
    if (!isInitialized) {
      // setCurrentBookId("0xd044190d1f7ead4dee7663cc8b819f48edaa1740d99865e87a98ef9b1d0efdfa01000000");
      // setCurrentBookTitle("Matthew");
      // setCurrentChapterId(1);
      // setCurrentChapterTitle("1");
      // setIsInitialized(true);
    }
  }, []); //componentDidMount

  useEffect(() => {
    if (currentChapterId) setCurrentChapterTitle(currentChapterId?.toString());
  }, [currentChapterId]);

  useEffect(() => {
    if (isInitialized) setjustdoit(!justdoit);
  }, [isInitialized]);

  useEffect(() => {
    if (isInitialized) doQuery_basic();
  }, [justdoit]); //justdoit's value is irrelevant, other components change it to trigger a query

  const doQuery_basic = async () => {
    setQueryLoading(true);
    if (currentChapterId === undefined) {
      console.log("PROCESS STOPPED: in doQuery_basic with an undefined currentChapterId");
      setQueryLoading(false);
      return;
    }

    await client
      .query({
        query: GQL_VERSES_by_chapter(),
        variables: {
          searchByBook: currentBookId,
          searchByChapterNumber: currentChapterId,
        },
        fetchPolicy: "no-cache", //TODO:
      })
      .then(d => {
        console.log("GQL_VERSES_by_chapter: ", d.data);
        setVerses(d.data?.verses);
      })
      .catch(e => {
        console.log("GQL_VERSES_by_chapter QUERY ERROR: ", e);
      });
    setQueryLoading(false);
  };

  //metadata
  //I want prod to work this way to spare extra graph queries until funded
  useEffect(() => {
    if (!currentBookTitle || currentBookTitle === "") return;
    switch (currentBookTitle) {
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
        console.log("...defaulting to Matthew's Meta Data.......");
        setMetaData(getMatthewMetaData());
        break;
    }
  }, [prelimBookTitle]);

  return (
    <>
      <div className="flex flex-row justify-between w-full mt-2 md:w-4/5 xl:w-3/5 md:mt-6">
        <BaseButtons
          isInViewChaptersMode={isInViewChaptersMode}
          isInViewBooksMode={isInViewBooksMode}
          setIsInViewBooksMode={setIsInViewBooksMode}
          setIsInViewChaptersMode={setIsInViewChaptersMode}
          queryLoading={queryLoading}
        />
      </div>

      {isInViewBooksMode || isInViewChaptersMode ? (
        <>
          {/* book-selections will show/hide chapters */}
          {isInViewChaptersMode ? (
            <ViewChapters
              setIsInViewChaptersMode={setIsInViewChaptersMode}
              setIsInViewBooksMode={setIsInViewBooksMode}
              setCurrentBookId={setCurrentBookId}
              setCurrentBookTitle={setCurrentBookTitle}
              setCurrentChapterId={setCurrentChapterId}
              prelimBookId={prelimBookId}
              prelimBookTitle={prelimBookTitle}
              chapters={metaData}
              justdoit={justdoit}
              setjustdoit={setjustdoit}
            />
          ) : (
            <ViewBooks
              books={booksList.books}
              setPrelimBookId={setPrelimBookId}
              setPrelimBookTitle={setPrelimBookTitle}
              setIsInViewChaptersMode={setIsInViewChaptersMode}
            />
          )}
        </>
      ) : (
        <>
          {queryLoading ? (
            <LoadingSpinner />
          ) : (
            // prev-next buttons, book-chapter details, and verses
            <div className="flex flex-col gap-1 mx-auto mb-4 prose prose-xl lg:px-12 xl:w-full">
              <PrevNextButtons
                currentChapterId={currentChapterId}
                setCurrentChapterId={setCurrentChapterId}
                chapterCount={chapterCount}
                justdoit={justdoit}
                setjustdoit={setjustdoit}
              />

              <BookDetails currentBookTitle={currentBookTitle} currentChapterTitle={currentChapterTitle} />

              <Verses verses={verses} />

              <PrevNextButtons
                currentChapterId={currentChapterId}
                setCurrentChapterId={setCurrentChapterId}
                chapterCount={chapterCount}
                justdoit={justdoit}
                setjustdoit={setjustdoit}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
