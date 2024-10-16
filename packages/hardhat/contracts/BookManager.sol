//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./Main.sol";

contract BookManager is Main {
	struct VerseStr {
		uint256 verseId;
		uint256 verseNumber;
		uint256 chapterNumber;
		string verseContent;
	}

	mapping(uint256 => VerseStr) public verses;
	mapping(address => uint256[]) public confirmations;
	uint256 public numberOfVerses = 0;
	uint256 public bookIndex;
	string public bookTitle;

	event Book(string title);

	//TODO: indexed parameters
	event Verse(
		address signer,
		bytes bookId,
		uint256 verseId,
		uint256 verseNumber,
		uint256 chapterNumber,
		string verseContent
	);

	event Confirmation(address confirmedBy, bytes verseId);

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

	constructor(uint256 index, string memory title) {
		// numberOfBooks++;
		// bookAtIndex[index] = title;
		emit Book(title);
		bookIndex = index;
		bookTitle = title;

		_transferOwnership(address(0xf0ADAE0823444d70Eb5826F3C26b3704611c759A)); //todo:
	}

	function addBatchVerses(
		bytes memory _bookId,
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
		//make sure a verse has been added before checking for skipped verses/chapters
		if (verses[1].verseNumber != 0) {
			require(
				preventSkippingVerse(_verseNumber[0], _chapterNumber[0]),
				"The contract is preventing you from skipping a verse."
			);
			require(
				preventSkippingChapter(_chapterNumber[0]),
				"The contract is preventing you from skipping a chapter."
			);
			require(
				enforceFirstVerseOfNewChapter(
					_verseNumber[0],
					_chapterNumber[0]
				),
				"The contract is preventing you from starting a new chapter with a verse that is not 1."
			);
		} else {
			//this is a first-verse scenario
			require(
				enforceFirstVerse(_verseNumber[0], _chapterNumber[0]),
				"The contract is preventing you from starting with a verse that is not 1:1"
			);
		}
		for (uint256 i = 0; i < length; i++) {
			_storeVerse(
				_bookId,
				_verseNumber[i],
				_chapterNumber[i],
				_verseContent[i]
			);
		}
	}

	// verse-skip prevention
	//to prevent skipping verses
	//prevents the situation of storing 1:1 and then storing 1:3
	function preventSkippingVerse(
		uint256 _verseNumber,
		uint256 _chapterNumber
	) private view returns (bool) {
		bool canContinue = true;
		VerseStr storage lastVerseAdded = verses[numberOfVerses];

		if (lastVerseAdded.chapterNumber == _chapterNumber) {
			if (_verseNumber != lastVerseAdded.verseNumber + 1) {
				canContinue = false; //in this situation, they are skipping a verse;
				//likely no real way to know if they are skipping verses IF the chapter number changes
			}
		}
		return canContinue;
	}

	//to prevent skipping chapters
	//prevents the situation of storing 1:1 and then storing 3:1
	function preventSkippingChapter(
		uint256 _chapterNumber
	) private view returns (bool) {
		bool canContinue = true;
		VerseStr storage lastVerseAdded = verses[numberOfVerses];
		if (
			_chapterNumber != lastVerseAdded.chapterNumber &&
			_chapterNumber != lastVerseAdded.chapterNumber + 1
		) {
			canContinue = false; //in this situation, they are skipping a chapter;
		}
		return canContinue;
	}

	function enforceFirstVerseOfNewChapter(
		uint256 _verseNumber,
		uint256 _chapterNumber
	) private view returns (bool) {
		bool canContinue = true;
		VerseStr storage lastVerseAdded = verses[numberOfVerses];
		if (
			_chapterNumber != lastVerseAdded.chapterNumber && _verseNumber != 1
		) {
			canContinue = false;
		}
		return canContinue;
	}

	function enforceFirstVerse(
		uint256 _verseNumber,
		uint256 _chapterNumber
	) private pure returns (bool) {
		bool canContinue = true;
		if (_chapterNumber != 1 || _verseNumber != 1) {
			canContinue = false;
		}
		return canContinue;
	}
	// end: verse-skip prevention

	function confirmVerse(
		bytes memory _verseId,
		uint256 _numericalId
	) external hasNotConfirmed(msg.sender, _numericalId) {
		confirmations[msg.sender].push(_numericalId);
		emit Confirmation(msg.sender, _verseId);
	}

	function _storeVerse(
		bytes memory _bookId,
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
			_bookId,
			numberOfVerses,
			_verseNumber,
			_chapterNumber,
			_verseContent
		);
	}
}
