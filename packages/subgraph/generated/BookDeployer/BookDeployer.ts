// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Book extends ethereum.Event {
  get params(): Book__Params {
    return new Book__Params(this);
  }
}

export class Book__Params {
  _event: Book;

  constructor(event: Book) {
    this._event = event;
  }

  get contractAddress(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get index(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get title(): string {
    return this._event.parameters[2].value.toString();
  }
}

export class OwnershipTransferred extends ethereum.Event {
  get params(): OwnershipTransferred__Params {
    return new OwnershipTransferred__Params(this);
  }
}

export class OwnershipTransferred__Params {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class BookDeployer__deploymentsResult {
  value0: Address;
  value1: BigInt;
  value2: string;

  constructor(value0: Address, value1: BigInt, value2: string) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromString(this.value2));
    return map;
  }

  getBookAddress(): Address {
    return this.value0;
  }

  getIndex(): BigInt {
    return this.value1;
  }

  getTitle(): string {
    return this.value2;
  }
}

export class BookDeployer__getDeploymentsResultValue0Struct extends ethereum.Tuple {
  get bookAddress(): Address {
    return this[0].toAddress();
  }

  get index(): BigInt {
    return this[1].toBigInt();
  }

  get title(): string {
    return this[2].toString();
  }
}

export class BookDeployer extends ethereum.SmartContract {
  static bind(address: Address): BookDeployer {
    return new BookDeployer("BookDeployer", address);
  }

  BIBLE_VERSION(): string {
    let result = super.call("BIBLE_VERSION", "BIBLE_VERSION():(string)", []);

    return result[0].toString();
  }

  try_BIBLE_VERSION(): ethereum.CallResult<string> {
    let result = super.tryCall("BIBLE_VERSION", "BIBLE_VERSION():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  BIBLE_VERSION_LONG(): string {
    let result = super.call(
      "BIBLE_VERSION_LONG",
      "BIBLE_VERSION_LONG():(string)",
      []
    );

    return result[0].toString();
  }

  try_BIBLE_VERSION_LONG(): ethereum.CallResult<string> {
    let result = super.tryCall(
      "BIBLE_VERSION_LONG",
      "BIBLE_VERSION_LONG():(string)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  CODE_VERSION(): string {
    let result = super.call("CODE_VERSION", "CODE_VERSION():(string)", []);

    return result[0].toString();
  }

  try_CODE_VERSION(): ethereum.CallResult<string> {
    let result = super.tryCall("CODE_VERSION", "CODE_VERSION():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  deployments(param0: BigInt): BookDeployer__deploymentsResult {
    let result = super.call(
      "deployments",
      "deployments(uint256):(address,uint256,string)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new BookDeployer__deploymentsResult(
      result[0].toAddress(),
      result[1].toBigInt(),
      result[2].toString()
    );
  }

  try_deployments(
    param0: BigInt
  ): ethereum.CallResult<BookDeployer__deploymentsResult> {
    let result = super.tryCall(
      "deployments",
      "deployments(uint256):(address,uint256,string)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new BookDeployer__deploymentsResult(
        value[0].toAddress(),
        value[1].toBigInt(),
        value[2].toString()
      )
    );
  }

  getDeployments(): Array<BookDeployer__getDeploymentsResultValue0Struct> {
    let result = super.call(
      "getDeployments",
      "getDeployments():((address,uint256,string)[])",
      []
    );

    return result[0].toTupleArray<
      BookDeployer__getDeploymentsResultValue0Struct
    >();
  }

  try_getDeployments(): ethereum.CallResult<
    Array<BookDeployer__getDeploymentsResultValue0Struct>
  > {
    let result = super.tryCall(
      "getDeployments",
      "getDeployments():((address,uint256,string)[])",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTupleArray<BookDeployer__getDeploymentsResultValue0Struct>()
    );
  }

  owner(): Address {
    let result = super.call("owner", "owner():(address)", []);

    return result[0].toAddress();
  }

  try_owner(): ethereum.CallResult<Address> {
    let result = super.tryCall("owner", "owner():(address)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get contractOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class DeployBookCall extends ethereum.Call {
  get inputs(): DeployBookCall__Inputs {
    return new DeployBookCall__Inputs(this);
  }

  get outputs(): DeployBookCall__Outputs {
    return new DeployBookCall__Outputs(this);
  }
}

export class DeployBookCall__Inputs {
  _call: DeployBookCall;

  constructor(call: DeployBookCall) {
    this._call = call;
  }

  get index(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get title(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class DeployBookCall__Outputs {
  _call: DeployBookCall;

  constructor(call: DeployBookCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall extends ethereum.Call {
  get inputs(): RenounceOwnershipCall__Inputs {
    return new RenounceOwnershipCall__Inputs(this);
  }

  get outputs(): RenounceOwnershipCall__Outputs {
    return new RenounceOwnershipCall__Outputs(this);
  }
}

export class RenounceOwnershipCall__Inputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class RenounceOwnershipCall__Outputs {
  _call: RenounceOwnershipCall;

  constructor(call: RenounceOwnershipCall) {
    this._call = call;
  }
}

export class TransferOwnershipCall extends ethereum.Call {
  get inputs(): TransferOwnershipCall__Inputs {
    return new TransferOwnershipCall__Inputs(this);
  }

  get outputs(): TransferOwnershipCall__Outputs {
    return new TransferOwnershipCall__Outputs(this);
  }
}

export class TransferOwnershipCall__Inputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }

  get newOwner(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class TransferOwnershipCall__Outputs {
  _call: TransferOwnershipCall;

  constructor(call: TransferOwnershipCall) {
    this._call = call;
  }
}
