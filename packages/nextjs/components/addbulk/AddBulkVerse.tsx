import { useEffect, useState } from "react";
import { SaveBulkVerse } from "./SaveBulkVerse";
import { getGospelOfJohn } from "~~/helpers/John";
import { notification } from "~~/utils/scaffold-eth";

export const AddBulkVerse = () => {
  const versesArray = getGospelOfJohn();
  const [selectedChapter, setSelectedChapter] = useState<string>(undefined);
  const [selectedVerse, setSelectedVerse] = useState<string>(undefined);
  const [selectedIndex, setSelectedIndex] = useState<number>(undefined);
  const [amountInBatch, setAmountInBatch] = useState<number>(10);
  const [selectedVersesObject, setSelectedVersesObject] = useState<object[]>(undefined);

  useEffect(() => {
    if (selectedVersesObject !== undefined) {
      console.log("selected verses obj:", selectedVersesObject);
    }
  }, [selectedVersesObject]);

  useEffect(() => {
    console.log("selected index: ", selectedIndex);
    if (selectedIndex !== undefined) {
      setSelectedChapter("");
      setSelectedVerse("");
      setSelectedVersesObject(versesArray.slice(selectedIndex, amountInBatch + selectedIndex)); //starts at selection, and gets range of items
    }
  }, [selectedIndex]);

  const getVerses = async () => {
    if (!selectedChapter || !selectedVerse) {
      notification.error("need a chapter AND verse selected to retrieve a verse.");
      return;
    }

    for (let i = 0; i < versesArray.length; i++) {
      if (versesArray[i].ChapterNumber.toString() === selectedChapter) {
        if (versesArray[i].VerseNumber.toString() === selectedVerse) {
          setSelectedIndex(i);
          return;
        }
      }
    }
  };

  const getNextVerse = async () => {
    console.log(selectedIndex + amountInBatch);
    setSelectedIndex(selectedIndex + amountInBatch);
  };

  return (
    <>
      <p>how many in batch?</p>
      <input
        className="w-3/4 input input-bordered input-accent"
        value={amountInBatch}
        onChange={e => setAmountInBatch(parseInt(e.target.value))}
      />
      <p>choose where to start</p>
      <div className="flex flex-row justfy-between">
        <input
          placeholder="chapter number"
          className="w-3/4 input input-bordered input-accent"
          value={selectedChapter}
          onChange={e => setSelectedChapter(e.target.value)}
        />

        <input
          placeholder="verse number"
          className="w-3/4 input input-bordered input-accent"
          value={selectedVerse}
          onChange={e => setSelectedVerse(e.target.value)}
        />

        <button className="btn btn-primary" onClick={() => getVerses()}>
          GET VERSE
        </button>
      </div>

      <div className="px-6 pt-10 pb-8 mt-6 shadow-xl bg-primary sm:mx-auto sm:max-w-11/12 md:w-full sm:rounded-lg sm:px-10">
        {selectedVersesObject?.map(verse => (
          <div key={verse.FullVerseChapter} className="flex flex-row gap-6">
            <p className="text-lg text-nowrap">{verse?.FullVerseChapter}</p>
            <p className="text-2xl">{verse?.VerseContent}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 mb-6">
        <button className="btn btn-primary" onClick={() => getNextVerse()}>
          GET NEXT
        </button>
      </div>

      <hr />

      <div className="mt-32">
        {selectedVersesObject !== undefined && (
          <>
            <SaveBulkVerse
              content={selectedVersesObject.map(x => x.VerseContent)}
              chapterNum={selectedVersesObject.map(x => BigInt(x.ChapterNumber))}
              verseNum={selectedVersesObject.map(x => BigInt(x.VerseNumber))}
            />
          </>
        )}
      </div>
    </>
  );
};
