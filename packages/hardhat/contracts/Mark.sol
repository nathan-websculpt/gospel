//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./Book.sol";

contract Mark is Book {
	constructor(address _contractOwner) {
		_transferOwnership(_contractOwner);
	}
}
