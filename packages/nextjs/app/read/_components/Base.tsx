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

  const [justdoit, setjustdoit] = useState(false); // stupid, but instead of checking if a chapter changed, going to use this as a "get verses" ... its value is irrelevant ... just in a useEffect

  const { loading: booksListLoading, error, data: booksList } = useQuery(GQL_BOOK_TITLES(), {});
  useEffect(() => {
    if (error !== undefined && error !== null) console.log("GQL_BOOK_TITLES Query Error: ", error);
  }, [error]);

  useEffect(() => {
    if (booksList !== undefined && booksList !== null && !isInitialized) {
      console.log("GQL_BOOK_TITLES Query DATA: ", booksList);
      setCurrentBookId(booksList?.books[0].id); 
      setCurrentBookTitle(booksList?.books[0].title);
      setPrelimBookId(booksList?.books[0].id); 
      setPrelimBookTitle(booksList?.books[0].title);
      setCurrentChapterId(1);
      setCurrentChapterTitle("1");

      setIsInitialized(true); //needed to prevent light/dark-mode switch from running this code again (resetting book/chap)
    }
  }, [booksList]);

  // Just to reset the chapter count when a book is selected
  useEffect(() => {
    if (!prelimBookId) return;
    const book = booksList?.books.find(b => b.id === prelimBookId);
    if (book) setChapterCount(book.chapterCount);
  }, [prelimBookId]);

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
              chapterCount={chapterCount}
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
