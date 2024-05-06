/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  31337: {
    John: {
      address: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
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
          ],
          name: "confirmVerse",
          outputs: [],
          stateMutability: "nonpayable",
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
