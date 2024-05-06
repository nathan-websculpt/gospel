import { useEffect, useState } from "react";
import { getGospelOfJohn } from "~~/helpers/John";
import { notification } from "~~/utils/scaffold-eth";

export const AddVerse = () => {
  const versesArray = getGospelOfJohn();
  const [selectedChapter, setSelectedChapter] = useState<string>(undefined);
  const [selectedVerse, setSelectedVerse] = useState<string>(undefined);
  const [selectedIndex, setSelectedIndex] = useState<number>(undefined);
  const [selectedVerseObject, setSelectedVerseObject] = useState<object>(undefined);

  useEffect(() => {
    if (selectedVerseObject !== undefined) {
      console.log("selected verse obj:", selectedVerseObject);
    }
  }, [selectedVerseObject]);

  useEffect(() => {
    if (selectedIndex !== undefined) {
      setSelectedChapter("");
      setSelectedVerse("");
      setSelectedVerseObject(versesArray[selectedIndex]);
    }
  }, [selectedIndex]);

  const getVerse = async () => {
    console.log("getting verse ...");
    if (!selectedChapter || !selectedVerse) {
      notification.error("need a chapter AND verse selected to retrieve a verse.");
      return;
    }

    for (let i = 0; i < versesArray.length; i++) {
      if (versesArray[i].ChapterNumber.toString() === selectedChapter) {
        if (versesArray[i].VerseNumber.toString() === selectedVerse) {
          console.log("got the verse ...");
          setSelectedIndex(i);
          return;
        }
      }
    }
  };

  const getNextVerse = async () => {
    setSelectedIndex(selectedIndex + 1);
  };

  return (
    <>
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

        <button className="btn btn-primary" onClick={() => getVerse()}>
          GET VERSE
        </button>
      </div>

      <div>
        {selectedVerseObject !== undefined && (
          <>
            <p>{selectedVerseObject?.FullVerseChapter}</p>
            <p>{selectedVerseObject?.VerseContent}</p>
            <p>STRING LENGTH: {selectedVerseObject?.StringLength}</p>
          </>
        )}
      </div>

      <div className="mt-6">
        <button className="btn btn-primary" onClick={() => getNextVerse()}>
          GET NEXT
        </button>
      </div>
    </>
  );
};
