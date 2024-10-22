import { Bytes, log, BigInt } from "@graphprotocol/graph-ts";
import { Book } from "../generated/schema";
import { BookManager } from "../generated/templates";
import {
  Book as BookEvent,
} from "../generated/BookDeployer/BookDeployer";

export function handleBook(event: BookEvent): void {
  let entity = new Book(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.contractAddress = event.params.contractAddress;
  entity.title = event.params.title;
  entity.index = event.params.index;
  entity.chapterCount = BigInt.fromI32(0); //start at 0 chapters

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  BookManager.create(event.params.contractAddress);
}
