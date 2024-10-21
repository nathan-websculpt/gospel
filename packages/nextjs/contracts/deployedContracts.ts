/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  10: {
    John: {
      address: "0xbF7766D1488Fe89337174847D533052fc17B475b",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_contractOwner",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "confirmedBy",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bytes",
              name: "verseId",
              type: "bytes",
            },
          ],
          name: "Confirmation",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "donor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "Donation",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "signer",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "verseId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "verseNumber",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "chapterNumber",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "verseContent",
              type: "string",
            },
          ],
          name: "Verse",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256[]",
              name: "_verseNumber",
              type: "uint256[]",
            },
            {
              internalType: "uint256[]",
              name: "_chapterNumber",
              type: "uint256[]",
            },
            {
              internalType: "string[]",
              name: "_verseContent",
              type: "string[]",
            },
          ],
          name: "addBatchVerses",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_verseNumber",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_chapterNumber",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "_verseContent",
              type: "string",
            },
          ],
          name: "addVerse",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "_verseId",
              type: "bytes",
            },
            {
              internalType: "uint256",
              name: "_numericalId",
              type: "uint256",
            },
          ],
          name: "confirmVerse",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "confirmations",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "donate",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "numberOfVerses",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "verses",
          outputs: [
            {
              internalType: "uint256",
              name: "verseId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "verseNumber",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "chapterNumber",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "verseContent",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "receive",
        },
      ],
      inheritedFunctions: {},
    },
    Mark: {
      address: "0x821001b6Bcf64d65C4258219B5559725Ca095bf6",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_contractOwner",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "confirmedBy",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bytes",
              name: "verseId",
              type: "bytes",
            },
          ],
          name: "Confirmation",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "donor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "Donation",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "signer",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "verseId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "verseNumber",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "chapterNumber",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "verseContent",
              type: "string",
            },
          ],
          name: "Verse",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256[]",
              name: "_verseNumber",
              type: "uint256[]",
            },
            {
              internalType: "uint256[]",
              name: "_chapterNumber",
              type: "uint256[]",
            },
            {
              internalType: "string[]",
              name: "_verseContent",
              type: "string[]",
            },
          ],
          name: "addBatchVerses",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_verseNumber",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_chapterNumber",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "_verseContent",
              type: "string",
            },
          ],
          name: "addVerse",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "_verseId",
              type: "bytes",
            },
            {
              internalType: "uint256",
              name: "_numericalId",
              type: "uint256",
            },
          ],
          name: "confirmVerse",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "confirmations",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "donate",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "numberOfVerses",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "verses",
          outputs: [
            {
              internalType: "uint256",
              name: "verseId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "verseNumber",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "chapterNumber",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "verseContent",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "receive",
        },
      ],
      inheritedFunctions: {},
    },
  },
  31337: {
    BookDeployer: {
      address: "0xa85233C63b9Ee964Add6F2cffe00Fd84eb32338f",
      abi: [
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "contractAddress",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "index",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "title",
              type: "string",
            },
          ],
          name: "NewBookContract",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          inputs: [],
          name: "OWNER_ADDR",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "index",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "title",
              type: "string",
            },
          ],
          name: "deployBook",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "deployments",
          outputs: [
            {
              internalType: "address",
              name: "bAddr",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "index",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "title",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "getDeployments",
          outputs: [
            {
              components: [
                {
                  internalType: "address",
                  name: "bAddr",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "index",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "title",
                  type: "string",
                },
              ],
              internalType: "struct BookDeployer.Deployment[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      inheritedFunctions: {
        owner: "@openzeppelin/contracts/access/Ownable.sol",
        renounceOwnership: "@openzeppelin/contracts/access/Ownable.sol",
        transferOwnership: "@openzeppelin/contracts/access/Ownable.sol",
      },
    },
    BookManager: {
      address: "0x4A679253410272dd5232B3Ff7cF5dbB88f295319",
      abi: [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "index",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "title",
              type: "string",
            },
            {
              internalType: "address",
              name: "contractOwner",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "string",
              name: "title",
              type: "string",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "index",
              type: "uint256",
            },
          ],
          name: "Book",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "confirmedBy",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bytes",
              name: "verseId",
              type: "bytes",
            },
          ],
          name: "Confirmation",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "donor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "Donation",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "signer",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bytes",
              name: "bookId",
              type: "bytes",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "verseId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "verseNumber",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "chapterNumber",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "verseContent",
              type: "string",
            },
          ],
          name: "Verse",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "_bookId",
              type: "bytes",
            },
            {
              internalType: "uint256[]",
              name: "_verseNumber",
              type: "uint256[]",
            },
            {
              internalType: "uint256[]",
              name: "_chapterNumber",
              type: "uint256[]",
            },
            {
              internalType: "string[]",
              name: "_verseContent",
              type: "string[]",
            },
          ],
          name: "addBatchVerses",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "bookIndex",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "bookTitle",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "_verseId",
              type: "bytes",
            },
            {
              internalType: "uint256",
              name: "_numericalId",
              type: "uint256",
            },
          ],
          name: "confirmVerse",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "confirmations",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "donate",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "finalizeBook",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "hasBeenFinalized",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "numberOfChapters",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "numberOfVerses",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "verses",
          outputs: [
            {
              internalType: "uint256",
              name: "verseId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "verseNumber",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "chapterNumber",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "verseContent",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "receive",
        },
      ],
      inheritedFunctions: {
        donate: "contracts/Main.sol",
        owner: "contracts/Main.sol",
        renounceOwnership: "contracts/Main.sol",
        transferOwnership: "contracts/Main.sol",
        withdraw: "contracts/Main.sol",
      },
    },
  },
  11155420: {
    John: {
      address: "0xa5BAF105bad838cf1Cd4518dc59ba51Df283aab0",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_contractOwner",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "confirmedBy",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bytes",
              name: "verseId",
              type: "bytes",
            },
          ],
          name: "Confirmation",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "donor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "Donation",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "previousOwner",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "OwnershipTransferred",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: false,
              internalType: "address",
              name: "signer",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "verseId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "verseNumber",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "chapterNumber",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "verseContent",
              type: "string",
            },
          ],
          name: "Verse",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256[]",
              name: "_verseNumber",
              type: "uint256[]",
            },
            {
              internalType: "uint256[]",
              name: "_chapterNumber",
              type: "uint256[]",
            },
            {
              internalType: "string[]",
              name: "_verseContent",
              type: "string[]",
            },
          ],
          name: "addBatchVerses",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_verseNumber",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "_chapterNumber",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "_verseContent",
              type: "string",
            },
          ],
          name: "addVerse",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "bytes",
              name: "_verseId",
              type: "bytes",
            },
            {
              internalType: "uint256",
              name: "_numericalId",
              type: "uint256",
            },
          ],
          name: "confirmVerse",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "confirmations",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "donate",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "numberOfVerses",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "renounceOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "newOwner",
              type: "address",
            },
          ],
          name: "transferOwnership",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "verses",
          outputs: [
            {
              internalType: "uint256",
              name: "verseId",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "verseNumber",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "chapterNumber",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "verseContent",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "receive",
        },
      ],
      inheritedFunctions: {
        owner: "@openzeppelin/contracts/access/Ownable.sol",
        renounceOwnership: "@openzeppelin/contracts/access/Ownable.sol",
        transferOwnership: "@openzeppelin/contracts/access/Ownable.sol",
      },
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
