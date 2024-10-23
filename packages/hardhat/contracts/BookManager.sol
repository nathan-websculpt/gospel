//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title BookManager
 * @author Nathan - 0x1e7aAbB9D0C701208E875131d0A1cFcDAba79350
 * @notice BookManager can represent a book of the Bible (KJV).
 * @dev This contract's deployer address is stored on variable: deployerAddress
 * BookManager will store/confirm (verse-by-verse) Bible verses (KJV) onto the blockchain.
 *
 */

contract BookManager is Ownable {
	struct VerseStr {
		uint256 verseId;
		uint256 verseNumber;
		uint256 chapterNumber;
		string verseContent;
	}

	mapping(uint256 => VerseStr) public verses;
	mapping(address => uint256[]) public confirmations;
	bool public hasBeenFinalized = false;
	uint256 public numberOfChapters = 0;
	uint256 public numberOfVerses = 0;
	uint256 public bookIndex;
	address public deployerAddress;
	string public bookTitle;
	string public constant BIBLE_VERSION = "KJV";
	string public constant BIBLE_VERSION_LONG = "King James Version";
	string public constant CODE_VERSION = "0.0.2";

	event Verse(
		address indexed signer,
		bytes bookId,
		uint256 verseId,
		uint256 verseNumber,
		uint256 chapterNumber,
		string verseContent
	);

	event Confirmation(address indexed confirmedBy, bytes verseId);

	event Finalization(address indexed finalizedBy, bytes bookId);

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

	modifier notFinalized() {
		require(!hasBeenFinalized, "This contract has already been finalized.");
		_;
	}

	constructor(uint256 index, string memory title, address contractOwner) {
		_transferOwnership(contractOwner);
		deployerAddress = msg.sender;
		bookIndex = index;
		bookTitle = title;
	}

	/// @dev _bookId is the (bytes) id in the subgraph; function will check validity of starting verse/chapter numbers
	/// @notice Add a batch of verses to the book
	function addBatchVerses(
		bytes memory _bookId,
		uint256[] memory _verseNumber,
		uint256[] memory _chapterNumber,
		string[] memory _verseContent
	) external notFinalized onlyOwner {
		uint256 length = _verseNumber.length;
		require(
			length == _chapterNumber.length,
			"Invalid array lengths - lengths did not match."
		);
		require(
			length == _verseContent.length,
			"Invalid array lengths - lengths did not match."
		);
		// make sure a verse has been added before checking for skipped verses/chapters
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
			// this is a first-verse scenario
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

		// if last chapter number (being added) is greater than current number of chapters, set the number of chapters
		if (_chapterNumber[length - 1] > numberOfChapters)
			numberOfChapters = _chapterNumber[length - 1];
	}

	/// @dev Allows a user to confirm a verse
	/// @notice Once you have compared a verse against the original source, you can confirm it
	function confirmVerse(
		bytes memory _verseId,
		uint256 _numericalId
	) external hasNotConfirmed(msg.sender, _numericalId) {
		confirmations[msg.sender].push(_numericalId);
		emit Confirmation(msg.sender, _verseId);
	}

	/// Can't add verses after book is finalized
	/// @dev sets hasBeenFinalized to true; only needs the subgraph bookId to update on event
	/// @notice This function can't be un-done - verses can't be added once book is finalized
	function finalizeBook(
		bytes memory _bookId
	) external notFinalized onlyOwner {
		hasBeenFinalized = true;
		emit Finalization(msg.sender, _bookId);
	}

	/// @dev Just for the ability to easily retrieve the last-verse-added on front-end 
	/// @notice Use this when uploading verses to easily know what the next verse number should be
	function getLastVerseAdded() external view returns (VerseStr memory) {
		return verses[numberOfVerses];
	}

	/// @dev Retrieve verse by numerical id
	/// @notice Use this to bypass the subgraph and read the data directly from the blockchain
	function getVerseByNumber(
		uint256 _numericalId
	) external view returns (VerseStr memory) {
		return verses[_numericalId];
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

	// verse-skip prevention
	// to prevent skipping verses
	// prevents the situation of storing 1:1 and then storing 1:3
	function preventSkippingVerse(
		uint256 _verseNumber,
		uint256 _chapterNumber
	) private view returns (bool) {
		bool canContinue = true;
		VerseStr storage lastVerseAdded = verses[numberOfVerses];

		if (lastVerseAdded.chapterNumber == _chapterNumber) {
			if (_verseNumber != lastVerseAdded.verseNumber + 1) {
				canContinue = false;
			}
		}
		return canContinue;
	}

	// to prevent skipping chapters
	// prevents the situation of storing 1:1 and then storing 3:1
	function preventSkippingChapter(
		uint256 _chapterNumber
	) private view returns (bool) {
		bool canContinue = true;
		VerseStr storage lastVerseAdded = verses[numberOfVerses];
		if (
			_chapterNumber != lastVerseAdded.chapterNumber &&
			_chapterNumber != lastVerseAdded.chapterNumber + 1
		) {
			canContinue = false;
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
}
