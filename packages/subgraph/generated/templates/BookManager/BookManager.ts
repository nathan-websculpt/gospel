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

  get title(): string {
    return this._event.parameters[0].value.toString();
  }

  get index(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }
}

export class Confirmation extends ethereum.Event {
  get params(): Confirmation__Params {
    return new Confirmation__Params(this);
  }
}

export class Confirmation__Params {
  _event: Confirmation;

  constructor(event: Confirmation) {
    this._event = event;
  }

  get confirmedBy(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get verseId(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }
}

export class Donation extends ethereum.Event {
  get params(): Donation__Params {
    return new Donation__Params(this);
  }
}

export class Donation__Params {
  _event: Donation;

  constructor(event: Donation) {
    this._event = event;
  }

  get donor(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[1].value.toBigInt();
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

export class Verse extends ethereum.Event {
  get params(): Verse__Params {
    return new Verse__Params(this);
  }
}

export class Verse__Params {
  _event: Verse;

  constructor(event: Verse) {
    this._event = event;
  }

  get signer(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get bookId(): Bytes {
    return this._event.parameters[1].value.toBytes();
  }

  get verseId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get verseNumber(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get chapterNumber(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get verseContent(): string {
    return this._event.parameters[5].value.toString();
  }
}

export class BookManager__versesResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: string;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt, value3: string) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromString(this.value3));
    return map;
  }

  getVerseId(): BigInt {
    return this.value0;
  }

  getVerseNumber(): BigInt {
    return this.value1;
  }

  getChapterNumber(): BigInt {
    return this.value2;
  }

  getVerseContent(): string {
    return this.value3;
  }
}

export class BookManager extends ethereum.SmartContract {
  static bind(address: Address): BookManager {
    return new BookManager("BookManager", address);
  }

  bookIndex(): BigInt {
    let result = super.call("bookIndex", "bookIndex():(uint256)", []);

    return result[0].toBigInt();
  }

  try_bookIndex(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("bookIndex", "bookIndex():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  bookTitle(): string {
    let result = super.call("bookTitle", "bookTitle():(string)", []);

    return result[0].toString();
  }

  try_bookTitle(): ethereum.CallResult<string> {
    let result = super.tryCall("bookTitle", "bookTitle():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  confirmations(param0: Address, param1: BigInt): BigInt {
    let result = super.call(
      "confirmations",
      "confirmations(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return result[0].toBigInt();
  }

  try_confirmations(
    param0: Address,
    param1: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "confirmations",
      "confirmations(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  hasBeenFinalized(): boolean {
    let result = super.call(
      "hasBeenFinalized",
      "hasBeenFinalized():(bool)",
      []
    );

    return result[0].toBoolean();
  }

  try_hasBeenFinalized(): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "hasBeenFinalized",
      "hasBeenFinalized():(bool)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  numberOfChapters(): BigInt {
    let result = super.call(
      "numberOfChapters",
      "numberOfChapters():(uint256)",
      []
    );

    return result[0].toBigInt();
  }

  try_numberOfChapters(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "numberOfChapters",
      "numberOfChapters():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  numberOfVerses(): BigInt {
    let result = super.call("numberOfVerses", "numberOfVerses():(uint256)", []);

    return result[0].toBigInt();
  }

  try_numberOfVerses(): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "numberOfVerses",
      "numberOfVerses():(uint256)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
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

  verses(param0: BigInt): BookManager__versesResult {
    let result = super.call(
      "verses",
      "verses(uint256):(uint256,uint256,uint256,string)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new BookManager__versesResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toString()
    );
  }

  try_verses(param0: BigInt): ethereum.CallResult<BookManager__versesResult> {
    let result = super.tryCall(
      "verses",
      "verses(uint256):(uint256,uint256,uint256,string)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new BookManager__versesResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toString()
      )
    );
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

  get index(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get title(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AddBatchVersesCall extends ethereum.Call {
  get inputs(): AddBatchVersesCall__Inputs {
    return new AddBatchVersesCall__Inputs(this);
  }

  get outputs(): AddBatchVersesCall__Outputs {
    return new AddBatchVersesCall__Outputs(this);
  }
}

export class AddBatchVersesCall__Inputs {
  _call: AddBatchVersesCall;

  constructor(call: AddBatchVersesCall) {
    this._call = call;
  }

  get _bookId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _verseNumber(): Array<BigInt> {
    return this._call.inputValues[1].value.toBigIntArray();
  }

  get _chapterNumber(): Array<BigInt> {
    return this._call.inputValues[2].value.toBigIntArray();
  }

  get _verseContent(): Array<string> {
    return this._call.inputValues[3].value.toStringArray();
  }
}

export class AddBatchVersesCall__Outputs {
  _call: AddBatchVersesCall;

  constructor(call: AddBatchVersesCall) {
    this._call = call;
  }
}

export class ConfirmVerseCall extends ethereum.Call {
  get inputs(): ConfirmVerseCall__Inputs {
    return new ConfirmVerseCall__Inputs(this);
  }

  get outputs(): ConfirmVerseCall__Outputs {
    return new ConfirmVerseCall__Outputs(this);
  }
}

export class ConfirmVerseCall__Inputs {
  _call: ConfirmVerseCall;

  constructor(call: ConfirmVerseCall) {
    this._call = call;
  }

  get _verseId(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get _numericalId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ConfirmVerseCall__Outputs {
  _call: ConfirmVerseCall;

  constructor(call: ConfirmVerseCall) {
    this._call = call;
  }
}

export class DonateCall extends ethereum.Call {
  get inputs(): DonateCall__Inputs {
    return new DonateCall__Inputs(this);
  }

  get outputs(): DonateCall__Outputs {
    return new DonateCall__Outputs(this);
  }
}

export class DonateCall__Inputs {
  _call: DonateCall;

  constructor(call: DonateCall) {
    this._call = call;
  }
}

export class DonateCall__Outputs {
  _call: DonateCall;

  constructor(call: DonateCall) {
    this._call = call;
  }
}

export class FinalizeBookCall extends ethereum.Call {
  get inputs(): FinalizeBookCall__Inputs {
    return new FinalizeBookCall__Inputs(this);
  }

  get outputs(): FinalizeBookCall__Outputs {
    return new FinalizeBookCall__Outputs(this);
  }
}

export class FinalizeBookCall__Inputs {
  _call: FinalizeBookCall;

  constructor(call: FinalizeBookCall) {
    this._call = call;
  }
}

export class FinalizeBookCall__Outputs {
  _call: FinalizeBookCall;

  constructor(call: FinalizeBookCall) {
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

export class WithdrawCall extends ethereum.Call {
  get inputs(): WithdrawCall__Inputs {
    return new WithdrawCall__Inputs(this);
  }

  get outputs(): WithdrawCall__Outputs {
    return new WithdrawCall__Outputs(this);
  }
}

export class WithdrawCall__Inputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}

export class WithdrawCall__Outputs {
  _call: WithdrawCall;

  constructor(call: WithdrawCall) {
    this._call = call;
  }
}
