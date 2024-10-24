// way to change chapters with Prev/Next buttons
import { Dispatch } from "react";

interface PrevNextProps {
  currentChapterId: number;
  setCurrentChapterId: Dispatch<number>;
  chapterCount: number;
  setjustdoit: Dispatch<boolean>;
  justdoit: boolean;
}

export const PrevNextButtons = ({
  currentChapterId,
  setCurrentChapterId,
  chapterCount,
  setjustdoit,
  justdoit,
}: PrevNextProps) => {
  const handlePrevPageClick = async (e: React.SyntheticEvent) => {
    if (currentChapterId > 1) setCurrentChapterId(currentChapterId - 1);
    setjustdoit(!justdoit); //triggers fetch verses
  };

  const handleNextPageClick = async (e: React.SyntheticEvent) => {
    setCurrentChapterId(currentChapterId + 1);
    setjustdoit(!justdoit); //triggers fetch verses
  };

  return (
    <>
      <div className="flex flex-row justify-around w-screen mx-auto mt-4 mb-8 xl:justify-between md:w-11/12 xl:w-4/5">
        <button className="btn btn-primary" onClick={handlePrevPageClick} disabled={currentChapterId <= 1}>
          PREV
        </button>

        <button className="btn btn-primary" onClick={handleNextPageClick} disabled={currentChapterId >= chapterCount}>
          NEXT
        </button>
      </div>
    </>
  );
};
