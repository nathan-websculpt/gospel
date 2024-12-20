/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  10: {
    BookDeployer: {
      address: "0x3dce29F3444E4Fe00F47883C8CC2c9847bAb8e3f",
      abi: [
        {
          inputs: [
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
              indexed: true,
              internalType: "address",
              name: "contractAddress",
              type: "address",
            },
            {
              indexed: true,
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
          name: "Book",
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
          name: "BIBLE_VERSION",
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
          inputs: [],
          name: "BIBLE_VERSION_LONG",
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
          inputs: [],
          name: "CODE_VERSION",
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
              name: "bookAddress",
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
                  name: "bookAddress",
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
      address: "0xeea60Fbe2d877c0AB5DfFdFa20d0040550a010b0",
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
              indexed: true,
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
              indexed: true,
              internalType: "address",
              name: "finalizedBy",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bytes",
              name: "bookId",
              type: "bytes",
            },
          ],
          name: "Finalization",
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
              indexed: true,
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
          inputs: [],
          name: "BIBLE_VERSION",
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
          inputs: [],
          name: "BIBLE_VERSION_LONG",
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
          inputs: [],
          name: "CODE_VERSION",
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
          name: "deployerAddress",
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
              internalType: "bytes",
              name: "_bookId",
              type: "bytes",
            },
          ],
          name: "finalizeBook",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "getLastVerseAdded",
          outputs: [
            {
              components: [
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
              internalType: "struct BookManager.VerseStr",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_numericalId",
              type: "uint256",
            },
          ],
          name: "getVerseByNumber",
          outputs: [
            {
              components: [
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
              internalType: "struct BookManager.VerseStr",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
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
      ],
      inheritedFunctions: {
        owner: "@openzeppelin/contracts/access/Ownable.sol",
        renounceOwnership: "@openzeppelin/contracts/access/Ownable.sol",
        transferOwnership: "@openzeppelin/contracts/access/Ownable.sol",
      },
    },
  },
  31337: {
    BookDeployer: {
      address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
      abi: [
        {
          inputs: [
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
              indexed: true,
              internalType: "address",
              name: "contractAddress",
              type: "address",
            },
            {
              indexed: true,
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
          name: "Book",
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
          name: "BIBLE_VERSION",
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
          inputs: [],
          name: "BIBLE_VERSION_LONG",
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
          inputs: [],
          name: "CODE_VERSION",
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
              name: "bookAddress",
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
                  name: "bookAddress",
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
      address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
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
              indexed: true,
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
              indexed: true,
              internalType: "address",
              name: "finalizedBy",
              type: "address",
            },
            {
              indexed: false,
              internalType: "bytes",
              name: "bookId",
              type: "bytes",
            },
          ],
          name: "Finalization",
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
              indexed: true,
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
          inputs: [],
          name: "BIBLE_VERSION",
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
          inputs: [],
          name: "BIBLE_VERSION_LONG",
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
          inputs: [],
          name: "CODE_VERSION",
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
          name: "deployerAddress",
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
              internalType: "bytes",
              name: "_bookId",
              type: "bytes",
            },
          ],
          name: "finalizeBook",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          name: "getLastVerseAdded",
          outputs: [
            {
              components: [
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
              internalType: "struct BookManager.VerseStr",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_numericalId",
              type: "uint256",
            },
          ],
          name: "getVerseByNumber",
          outputs: [
            {
              components: [
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
              internalType: "struct BookManager.VerseStr",
              name: "",
              type: "tuple",
            },
          ],
          stateMutability: "view",
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
