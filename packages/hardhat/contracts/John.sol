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
		uint256 verseId
	);

	constructor(address _contractOwner) {
		_transferOwnership(_contractOwner);
	}
	
	function addVerse(uint256 _verseNumber, uint256 _chapterNumber, string memory _verseContent) external onlyOwner {
		numberOfVerses++;
		VerseStr storage thisVerse = verses[numberOfVerses];
		thisVerse.verseId = numberOfVerses;
		thisVerse.verseNumber = _verseNumber;
		thisVerse.chapterNumber = _chapterNumber;
		thisVerse.verseContent = _verseContent;

		emit Verse(msg.sender, numberOfVerses, _verseNumber, _chapterNumber, _verseContent);
	}

	function confirmVerse(uint256 _verseId) external {
		emit Confirmation(msg.sender, _verseId);
	}


	function withdraw() external onlyOwner nonReentrant {
		(bool success, ) = payable(msg.sender).call{ value: address(this).balance }("");
		require(success, "Failed to send Ether");
	}

	receive() external payable {}
}
