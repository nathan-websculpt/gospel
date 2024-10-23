//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./BookManager.sol";



contract BookDeployer is Ownable {
	struct Deployment {
		address bookAddress;
		uint256 index;
		string title;
	}

	string public constant BIBLE_VERSION = "KJV";
	string public constant BIBLE_VERSION_LONG = "King James Version";
	string public constant CODE_VERSION = "0.0.2";

	/// @dev The list of deployed books; their finalization-status is stored in the BookManager contract
	Deployment[] public deployments;

	event Book(
		address indexed contractAddress,
		uint256 indexed index,
		string title
	);

	constructor(address contractOwner) {
		_transferOwnership(contractOwner);
	}

	/// @dev Allows owner to deploy a new book
	/// @param index The index of the book (to order-by)
	/// @param title The title of the book (to display)
	function deployBook(uint256 index, string memory title) external onlyOwner {
		BookManager b = new BookManager(index, title, msg.sender);
		deployments.push(Deployment(address(b), index, title));
		emit Book(address(b), index, title);
	}

	function getDeployments() external view returns (Deployment[] memory) {
		Deployment[] memory result = new Deployment[](deployments.length);
		for (uint256 i = 0; i < deployments.length; i++) {
			result[i] = deployments[i];
		}
		return result;
	}
}
