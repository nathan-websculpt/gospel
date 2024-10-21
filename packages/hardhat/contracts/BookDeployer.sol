//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./BookManager.sol";

contract BookDeployer is Ownable {
	struct Deployment {
		address bAddr; //TODO: rename
		uint256 index;
		string title;
	}

	address public constant OWNER_ADDR = 0xf0ADAE0823444d70Eb5826F3C26b3704611c759A;
	//PRODTODO:address public constant OWNER_ADDR = 0x1e7aAbB9D0C701208E875131d0A1cFcDAba79350; //PRODTODO: 

	Deployment[] public deployments;

	event NewBookContract(address contractAddress, uint256 index, string title);

	constructor() {
		_transferOwnership(OWNER_ADDR);
		// emit Book("Mark");
	}

	function deployBook(uint256 index, string memory title) external onlyOwner {
		BookManager b = new BookManager(index, title, msg.sender);
		deployments.push(Deployment(address(b), index, title));

		emit NewBookContract(address(b), index, title);
	}

	//TODO: read by var and del func?
    function getDeployments() public view returns (Deployment[] memory) {
        Deployment[] memory result = new Deployment[](deployments.length);
		for (uint256 i = 0; i < deployments.length; i++){
			result[i] = deployments[i];
		}
		return result;
    }
}
