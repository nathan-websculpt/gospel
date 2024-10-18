//verses of a chapter -- like a "page" view

export const Verses = ({ verses }: any) => {
  return (
    <>
      <div className="pt-10 pb-8 pl-4 pr-3 mx-auto sm:px-10 md:pl-10 md:pr-12 xl:pl-2 xl:pr-2 2xl:pl-6 2xl:pr-6">
        {verses?.map((verse: any) => (
          <span key={verse.id.toString()} className="pl-2 prose align-text-bottom">
            {verse.verseNumber}
            <span className="pl-2 prose-2xl align-text-top">{verse.verseContent}</span>
          </span>
        ))}
      </div>
    </>
  );
};
