import { Dispatch } from "react";
import { ArrowLeftIcon, BookOpenIcon, ListBulletIcon } from "@heroicons/react/24/solid";

// Buttons that toggle book/chapter view,
// and the chapter-view contains a back button that will go back to the book view.

interface BaseButtonsProps {
  isInViewChaptersMode: boolean;
  isInViewBooksMode: boolean;
  setIsInViewBooksMode: Dispatch<boolean>;
  setIsInViewChaptersMode: Dispatch<boolean>;
  queryLoading: boolean;
}

export const BaseButtons = ({
  isInViewChaptersMode,
  isInViewBooksMode,
  setIsInViewBooksMode,
  setIsInViewChaptersMode,
  queryLoading,
}: BaseButtonsProps) => {
  const handleToggle = () => {
    if (isInViewChaptersMode) setIsInViewChaptersMode(false); //either way, chapter list should be hidden
    setIsInViewBooksMode(!isInViewBooksMode);
  };

  const backButtonOnChapters = async () => {
    setIsInViewChaptersMode(false);
  };

  return (
    <>
      {/* the book-view / verses-view toggle button */}
      {!queryLoading && (
        <div className="flex flex-row pl-4">
          <label className="btn btn-circle btn-primary swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              className="focus:outline-none"
              type="checkbox"
              onChange={handleToggle}
              checked={isInViewBooksMode}
              aria-label="Change View Mode"
            />

            {/* LIST icon */}
            <ListBulletIcon className="w-6 h-6 swap-on" />

            {/* BOOK icon */}
            <BookOpenIcon className="w-6 h-6 swap-off" />
          </label>
        </div>
      )}

      {/* this back button is only on the chapters page - takes you back to the book list */}
      {isInViewChaptersMode && (
        <>
          <button className="mr-6 xl:mr-0 btn-circle btn btn-primary" onClick={backButtonOnChapters}>
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
        </>
      )}
    </>
  );
};
