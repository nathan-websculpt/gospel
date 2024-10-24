//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./BookManager.sol";

 /*
 * @title BookDeployer
 * @author Nathan - 0x1e7aAbB9D0C701208E875131d0A1cFcDAba79350
 * @notice BookDeployer will allow for multiple books (BookManager contracts) to be deployed (via deployBook function)
 * @dev this code is considered to be at version 0.0.2; note that 0.0.1 is at Optimism address: 0x29BB1313321dbA27Ad074DD6AD2943040319B439
 * 0.0.1 was a single book (Gospel of John) stored onto Optimism; however, 0.0.2 will allow multiple books to be bound together.
 *
 * The intention of these smart contracts is to store/confirm (verse-by-verse) Biblical books (KJV) onto the blockchain.
 * I strongly suspect that I will upload the Gospels + Acts, gather more data from this process, and then begin on another version of these contracts.
 * Since I can not come back to update this later, I will say that as of the time of writing this,
 * I think it is important to protect the Gospels and the history of the early Church BEFORE the American election.
 * This is more important than waiting another 3 months for a "perfect" smart contract to be written (there is only one person working on this).
 *
 * If you are reading this from a future time: The year is 2024, and my world is in a fallen state.
 * This is not just a project that some developer used for a portfolio ... it is a move against a type of tyranny very few people from my time saw. 
 *
 * Do I want to store the whole Bible? Yes (and the Greek/Hebrew, and multiple versions, etc). 
 * I'm broke. I was fired after releasing the first Gospel.
 * I have, however, received $300 in donations. I am going to use that to store the Gospels + Acts. It should be enough (and allow for mistakes to occur). 
 * My current thinking is that – before going for all the books and their versions – this code will go through at least 1 more update.
 * Meanwhile, I am also thinking that we need a whole new type of "blockchain" just for text.
 * 
 * Pray that the world and the word remain together. Pray that the season be little.
 * 
 *      from:
 *      Nathan
 *      https://github.com/nathan-websculpt
 *      0x1e7aAbB9D0C701208E875131d0A1cFcDAba79350
 *      October 24th, 2024 – 7:37 AM
 */
 
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
