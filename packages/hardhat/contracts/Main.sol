//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Main is Ownable, ReentrancyGuard {
	event Donation(address donor, uint256 amount);

	receive() external payable {
		donate();
	}

	function withdraw() external onlyOwner nonReentrant {
		address contractOwner = owner();
		require(address(this).balance > 0, "There is nothing to withdraw.");
		(bool success, ) = payable(contractOwner).call{
			value: address(this).balance
		}("");
		require(success, "Failed to send Ether");
	}

	function donate() public payable {
		emit Donation(msg.sender, msg.value);
	}
}
