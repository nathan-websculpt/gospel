//Displays all books
//When user clicks on a book, display the chapters
import { Dispatch } from "react";

interface ViewBooksProps {
  books: [];
  setCurrentBookId: Dispatch<string>;
  setIsInViewChaptersMode: Dispatch<boolean>;
  setIsInViewBooksMode: Dispatch<boolean>;
  setCurrentBookTitle: Dispatch<string>;
}

export const ViewBooks = ({
  books,
  setCurrentBookId,
  setIsInViewChaptersMode,
  setIsInViewBooksMode,
  setCurrentBookTitle,
}: ViewBooksProps) => {
  const handleChangeBook = async (e: React.SyntheticEvent) => {
    const bookId = e.target.getAttribute("data-bookid");
    const bookTitle = e.target.getAttribute("data-booktitle");
    //I guess we need to store this in case they close before selecting a chapter...like a preliminary var
    setCurrentBookId(bookId); //bytes subgraph id // the verses do not get swapped until chapter is selected
    setCurrentBookTitle(bookTitle); // changes metadata on base
    
    // setIsInViewBooksMode(false);
    
    setIsInViewChaptersMode(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 mt-12 mb-12 xl:grid-cols-4 xl:mt-24">
        {books?.map((book: any) => (
          <button
            className="btn btn-primary"
            key={book.id}
            onClick={handleChangeBook}
            data-bookid={book.id}
            data-booktitle={book.title}
          >
            {book.title}
          </button>
        ))}
      </div>
    </>
  );
};
