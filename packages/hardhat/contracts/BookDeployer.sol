//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./BookManager.sol";

contract BookDeployer {
	struct Deployment {
		address bAddr;
		uint256 index;
		string title;
	}
	Deployment[] public deployments;

	event NewB(address indexed b, uint256 indexed index, string title);

	constructor(address _contractOwner) {
		//_transferOwnership(_contractOwner);
		// emit Book("Mark");
	}

	function deployBook(uint256 index, string memory title) external {
		BookManager b = new BookManager(index, title);
		deployments.push(Deployment(address(b), index, title));

		emit NewB(address(b), index, title);
	}

    function getDeployments() public view returns (Deployment[] memory) {
        Deployment[] memory result = new Deployment[](deployments.length);
		for (uint256 i = 0; i < deployments.length; i++){
			result[i] = deployments[i];
		}
		return result;
    }
}
