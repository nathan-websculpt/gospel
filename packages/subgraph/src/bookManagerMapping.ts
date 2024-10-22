import { Bytes, log, BigInt } from "@graphprotocol/graph-ts";
import {
  Verse as VerseEvent,
  Confirmation as ConfirmationEvent,
  Finalization as FinalizationEvent
} from "../generated/templates/BookManager/BookManager";
import { Verse, Confirmation, Book, Finalization } from "../generated/schema";

export function handleVerse(event: VerseEvent): void {
  let entity = new Verse(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );

  entity.signer = event.params.signer;
  entity.verseId = event.params.verseId;
  entity.verseNumber = event.params.verseNumber;
  entity.chapterNumber = event.params.chapterNumber;
  entity.verseContent = event.params.verseContent;
  entity.confirmationCount = 0;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let bookEntity = Book.load(event.params.bookId);
  if (bookEntity !== null) {
    entity.book = bookEntity.id;

    //if this verse's chapter number is greater than the book's chapter count, increment chapter count (on book)
    if (event.params.chapterNumber > bookEntity.chapterCount) {
      bookEntity.chapterCount = event.params.chapterNumber;
      bookEntity.save();
    }
  }

  entity.save();
}

export function handleConfirmation(event: ConfirmationEvent): void {
  let entity = new Confirmation(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.confirmedBy = event.params.confirmedBy;
  entity.verseId = event.params.verseId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let verseEntity = Verse.load(event.params.verseId);
  if (verseEntity !== null) {
    entity.verse = verseEntity.id;
    verseEntity.confirmationCount++;
    verseEntity.save();
  }

  entity.save();
}

export function handleFinalization(event: FinalizationEvent): void {
  let entity = new Finalization(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.finalizedBy = event.params.finalizedBy;
  entity.bookId = event.params.bookId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;  

  let bookEntity = Book.load(event.params.bookId);
  if (bookEntity !== null) {
    bookEntity.isFinalized = true;
    bookEntity.save();
  }

  entity.save();
}