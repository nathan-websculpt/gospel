import { Bytes, log, BigInt } from "@graphprotocol/graph-ts";
import {
  NewBookContract as NewBookContractEvent,
} from "../generated/BookDeployer/BookDeployer";
import { NewBookContract } from "../generated/schema";
import { BookManager } from "../generated/templates/BookManager/BookManager";

export function handleNewBookContract(event: NewBookContractEvent): void {
  let entity = new NewBookContract(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.contractAddress = event.params.contractAddress;
  entity.index = event.params.index;
  entity.title = event.params.title;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  BookManager.create(event.params.contractAddress);
}