interface VersesListDisplay {
  verses: any[]; // todo: what type?
}

export const VersesDisplay_ListView = (_this: VersesListDisplay) => {
  return (
    <>
      <div className="px-6 pt-10 pb-8 mt-6 shadow-xl bg-primary sm:mx-auto sm:max-w-11/12 md:w-3/4 sm:rounded-lg sm:px-8 md:px-14 lg:px-20 xl:px-22">
        {_this?.verses?.map(verse => (
          <div key={verse.id.toString()} className="flex flex-row gap-6">
            <p className="text-md xl:text-lg text-nowrap">
              {verse.chapterNumber} : {verse.verseNumber}
            </p>
            <p className="text-xl xl:text-2xl">{verse.verseContent}</p>
          </div>
        ))}
      </div>
    </>
  );
};
