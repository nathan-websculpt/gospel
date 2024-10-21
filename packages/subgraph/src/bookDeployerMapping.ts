import { Bytes, log, BigInt } from "@graphprotocol/graph-ts";
import { BookManager } from "../generated/templates";
import { Deployer as DeployerEvent } from "../generated/BookDeployer/BookDeployer";
import { Deployer } from "../generated/schema";

export function handleDeployer(event: DeployerEvent): void {
  let entity = new Deployer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.signer = event.params.signer;
  entity.deployerAddress = event.params.deployerAddress;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
  // BookManager.create(event.params.blankBookAddress);
}
