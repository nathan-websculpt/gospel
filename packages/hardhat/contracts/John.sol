//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./BookManager.sol";

contract John is BookManager {
	constructor(address _contractOwner) {
		_transferOwnership(_contractOwner);
		emit Book("John");
	}
}
