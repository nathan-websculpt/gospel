//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * Not Production Ready
 * Dev/Testing
 *
 * I want to see how well this works and do some cost-analysis
 *
 *
 *      CHECKLIST
 * Can't confirm twice
 * onlyOwner can add
 * onlyOwner can batch add
 *
 *
 *
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
	mapping(address => uint256[]) public confirmations;
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

	event Donation(
		address donor, //TODO: indexed
		uint256 amount
	);

	modifier hasNotConfirmed(address user, uint256 verseId) {
		bool canContinue = true;
		for (uint256 i = 0; i < confirmations[user].length; i++) {
			if (confirmations[user][i] == verseId) {
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

	function confirmVerse(
		bytes memory _verseId,
		uint256 _numericalId
	) external hasNotConfirmed(msg.sender, _numericalId) {
		confirmations[msg.sender].push(_numericalId);
		emit Confirmation(msg.sender, _verseId);
	}

	function withdraw() external onlyOwner nonReentrant {
		require(address(this).balance > 0, "There is nothing to withdraw.");
		(bool success, ) = payable(msg.sender).call{
			value: address(this).balance
		}("");
		require(success, "Failed to send Ether");
	}

	function donate() public payable {
		emit Donation(msg.sender, msg.value);
	}

	receive() external payable {
		donate();
	}
}

//TODO: add donate functionality
//only owner can withdraw
