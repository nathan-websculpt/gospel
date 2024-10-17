//Displays all chapters
//When user clicks on a chapter, displays the verses
import { Dispatch } from "react";

interface ViewChaptersProps {
  setIsInViewChaptersMode: Dispatch<boolean>;
  setIsInViewBooksMode: Dispatch<boolean>;
  setCurrentChapterId: Dispatch<number>;
  chapters: [];
  setjustdoit: Dispatch<boolean>;
  justdoit: boolean;
}

export const ViewChapters = ({
  setIsInViewChaptersMode,
  setIsInViewBooksMode,
  setCurrentChapterId,
  chapters,
  setjustdoit,
  justdoit,
}: ViewChaptersProps) => {
  const handleChangeChapter = async (e: React.SyntheticEvent) => {
    const chapterId = e.target.getAttribute("data-chapterid");

    setCurrentChapterId(Number(chapterId));

    setIsInViewChaptersMode(false);
    setIsInViewBooksMode(false);

    setjustdoit(!justdoit); //justdoit's val is irrelevant, just triggering a fetch of verses
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-4 mt-12 mb-12 xl:grid-cols-10 xl:mt-24">
        {chapters?.map((chapter: any) => (
          <button
            className="btn btn-primary"
            key={chapter.ChapterNumber}
            onClick={handleChangeChapter}
            data-chapterid={chapter.ChapterNumber}
          >
            {chapter.ChapterNumber}
          </button>
        ))}
      </div>
    </>
  );
};
