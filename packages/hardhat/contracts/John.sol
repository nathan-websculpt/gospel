//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * WARNING: CONTRACT IS CURRENTLY FOR PROOF-OF-CONCEPT
 * WARNING: CONTRACT HAS NOT BEEN AUDITED
 * Dev/Testing: I want to see how well this works and do some cost-analysis.
 *
 *
 * At the time of writing, I can not confirm that the goal of this contract will be achieved;
 * THEREFORE, I can not assert that this will properly represent The Gospel of John (KJV) [neither in-part, nor in-full];
 * This will hopefully serve the purpose of saying, "Look, it is possible."
 * But, if you wanted to read The Gospel of John (KJV) yourself, this contract (or, this iteration of this contract) is not the right source.
 * One area where this text will be lacking is that it will not contain any of the original italics.
 *
 * The intention of this smart contract is to store/confirm (verse-by-verse) The Gospel of John (KJV) on Optimism,
 * and (if all goes well) this could evolve to become a template for other books/documents.
 *
 * Ideally, I believe that this would be better with a council-of-members voting on the validity of a section-of-text BEFORE it is stored.
 * This is more than protecting books against censorship. The blockchain could also allow us to timestamp the moment a group of
 * people agreed upon the contents of a book/written-work/document.
 * I do intend to try this with items like the Declaration of Independence, as well.
 *
 * WARNING: CONTRACT IS CURRENTLY FOR PROOF-OF-CONCEPT
 * WARNING: CONTRACT HAS NOT BEEN AUDITED
 * If you wish to donate, please do not use this contract's functionality.
 * Instead, simply send funds to: 0x1e7aAbB9D0C701208E875131d0A1cFcDAba79350
 * My most-sincere feeling of gratitude goes to anyone wanting to help out.
 *
 * @author
 * nathan-websculpt
 * https://github.com/nathan-websculpt
 * 0x1e7aAbB9D0C701208E875131d0A1cFcDAba79350
 *
 * Please see my repo: 'crowd-fund-v4' to see how a council-of-members can vote on text before it is processed.
 */

contract John is Ownable, ReentrancyGuard {
	struct VerseStr {
		uint256 verseId;
		uint256 verseNumber;
		uint256 chapterNumber;
		string verseContent;
	}

	mapping(uint256 => VerseStr) public verses;
	mapping(address => uint256[]) public confirmations;
	uint256 public numberOfVerses = 0;

	//TODO: indexed parameters
	event Verse(
		address signer,
		uint256 verseId,
		uint256 verseNumber,
		uint256 chapterNumber,
		string verseContent
	);

	event Confirmation(address confirmedBy, bytes verseId);

	event Donation(address donor, uint256 amount);

	modifier hasNotConfirmed(address addr, uint256 verseId) {
		bool canContinue = true;
		for (uint256 i = 0; i < confirmations[addr].length; i++) {
			if (confirmations[addr][i] == verseId) {
				canContinue = false;
				break;
			}
		}
		require(canContinue, "This address has already confirmed this verse.");
		_;
	}

	constructor(address _contractOwner) {
		_transferOwnership(_contractOwner);
	}

	receive() external payable {
		donate();
	}

	function addVerse(
		uint256 _verseNumber,
		uint256 _chapterNumber,
		string memory _verseContent
	) external onlyOwner {
		_storeVerse(_verseNumber, _chapterNumber, _verseContent);
	}

	function addBatchVerses(
		uint256[] memory _verseNumber,
		uint256[] memory _chapterNumber,
		string[] memory _verseContent
	) external onlyOwner {
		uint256 length = _verseNumber.length;
		require(
			length == _chapterNumber.length,
			"Invalid array lengths - lengths did not match."
		);
		require(
			length == _verseContent.length,
			"Invalid array lengths - lengths did not match."
		);

		for (uint256 i = 0; i < length; i++) {
			_storeVerse(_verseNumber[i], _chapterNumber[i], _verseContent[i]);
		}
	}

	function confirmVerse(
		bytes memory _verseId,
		uint256 _numericalId
	) external hasNotConfirmed(msg.sender, _numericalId) {
		confirmations[msg.sender].push(_numericalId);
		emit Confirmation(msg.sender, _verseId);
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

	function _storeVerse(
		uint256 _verseNumber,
		uint256 _chapterNumber,
		string memory _verseContent
	) private {
		numberOfVerses++;
		VerseStr storage thisVerse = verses[numberOfVerses];
		thisVerse.verseId = numberOfVerses;
		thisVerse.verseNumber = _verseNumber;
		thisVerse.chapterNumber = _chapterNumber;
		thisVerse.verseContent = _verseContent;

		emit Verse(
			msg.sender,
			numberOfVerses,
			_verseNumber,
			_chapterNumber,
			_verseContent
		);
	}
}
