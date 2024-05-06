import { Bytes, log, BigInt } from "@graphprotocol/graph-ts";
import {
  Verse as VerseEvent,
  Confirmation as ConfirmationEvent,
} from "../generated/John/John";
import {
  Verse,
  Confirmation,
} from "../generated/schema";

export function handleVerse(
  event: VerseEvent
): void {
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
