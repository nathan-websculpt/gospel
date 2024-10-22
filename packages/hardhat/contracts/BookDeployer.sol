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

	Deployment[] public deployments;

	event Book(
		address indexed contractAddress,
		uint256 indexed index,
		string title
	);

	constructor(address contractOwner) {
		_transferOwnership(contractOwner);
	}

	function deployBook(uint256 index, string memory title) external onlyOwner {
		BookManager b = new BookManager(index, title, msg.sender);
		deployments.push(Deployment(address(b), index, title));
		emit Book(address(b), index, title);
	}

	//TODO: read by var and del func?
	function getDeployments() public view returns (Deployment[] memory) {
		Deployment[] memory result = new Deployment[](deployments.length);
		for (uint256 i = 0; i < deployments.length; i++) {
			result[i] = deployments[i];
		}
		return result;
	}
}
