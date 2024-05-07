//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * Not Production Ready
 * Dev/Testing
 * @author nathan-websculpt https://github.com/nathan-websculpt
 */
contract John is Ownable, ReentrancyGuard {
	struct VerseStr {
		uint256 verseId;
		uint256 verseNumber;
		uint256 chapterNumber;
		string verseContent;
	}

	mapping(uint256 => VerseStr) public verses;
	uint256 public numberOfVerses = 0;

	event Verse(
		address signer, //TODO: indexed
		uint256 verseId,
		uint256 verseNumber,
		uint256 chapterNumber,
		string verseContent
	);

	event Confirmation(
		address confirmedBy, //TODO: indexed
		bytes verseId
	);

	constructor(address _contractOwner) {
		_transferOwnership(_contractOwner);
	}

	function addVerse(
		uint256 _verseNumber,
		uint256 _chapterNumber,
		string memory _verseContent
	) external onlyOwner {
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
			numberOfVerses++;
			VerseStr storage thisVerse = verses[numberOfVerses];
			thisVerse.verseId = numberOfVerses;
			thisVerse.verseNumber = _verseNumber[i];
			thisVerse.chapterNumber = _chapterNumber[i];
			thisVerse.verseContent = _verseContent[i];

			emit Verse(
				msg.sender,
				numberOfVerses,
				_verseNumber[i],
				_chapterNumber[i],
				_verseContent[i]
			);
		}
	}

	//TODO: prevent same address from confirming twice
	function confirmVerse(bytes memory _verseId) external {
		emit Confirmation(msg.sender, _verseId);
	}

	function withdraw() external onlyOwner nonReentrant {
		(bool success, ) = payable(msg.sender).call{
			value: address(this).balance
		}("");
		require(success, "Failed to send Ether");
	}

	receive() external payable {}
}

//TODO: add donate functionality
//only owner can withdraw
