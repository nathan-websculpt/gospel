//top of Verses, displays book title and chapter number

interface BookDetailsProps {
  currentBookTitle: string;
  currentChapterTitle: string;
}

export const BookDetails = ({
  currentBookTitle,
  currentChapterTitle,
}: BookDetailsProps) => {
  return (
    <>
      <div className="text-center">
        <h1>{currentBookTitle}</h1>
        <h2>Chapter {currentChapterTitle}</h2>
      </div>
    </>
  );
};
