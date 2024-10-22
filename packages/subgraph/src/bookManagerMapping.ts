import { Bytes, log, BigInt } from "@graphprotocol/graph-ts";
import {
  Verse as VerseEvent,
  Confirmation as ConfirmationEvent,
  Donation as DonationEvent
} from "../generated/templates/BookManager/BookManager"; // Oct 18th, changing events to templates dir, because the old one wasn't working with Event updates
// } from "../generated/BookManager/BookManager";
import { Verse, Confirmation, Donation, Book } from "../generated/schema";
import {
  Book as BookEvent,
} from "../generated/BookDeployer/BookDeployer";

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

export function handleDonation(event: DonationEvent): void {
  let entity = new Donation(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.donor = event.params.donor;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
