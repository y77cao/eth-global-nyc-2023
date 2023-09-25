import { defineConfig } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20ABI } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";
import { votingContractABI } from "./src/generated";

export default defineConfig({
  out: "src/generated.ts",
  contracts: [
    {
      name: "votingContract",
      abi: [
        {
          inputs: [
            {
              internalType: "uint256",
              name: "questionId",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "choice",
              type: "string",
            },
          ],
          name: "addAnswerToQuestion",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "questionId",
              type: "uint256",
            },
          ],
          name: "closeQuestion",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "questionId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "choice",
              type: "string",
            },
          ],
          name: "AnswerAdded",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "text",
              type: "string",
            },
            {
              internalType: "string[]",
              name: "initialChoices",
              type: "string[]",
            },
          ],
          name: "createQuestion",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "questionId",
              type: "uint256",
            },
          ],
          name: "QuestionClosed",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "questionId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "text",
              type: "string",
            },
            {
              indexed: false,
              internalType: "string[]",
              name: "choices",
              type: "string[]",
            },
          ],
          name: "QuestionCreated",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "questionId",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "choice",
              type: "string",
            },
          ],
          name: "vote",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "voter",
              type: "address",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "questionId",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "choice",
              type: "string",
            },
          ],
          name: "Voted",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "questionId",
              type: "uint256",
            },
          ],
          name: "getQuestion",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
            {
              internalType: "string[10]",
              name: "",
              type: "string[10]",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
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
          inputs: [
            {
              internalType: "uint256",
              name: "questionId",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "choice",
              type: "string",
            },
          ],
          name: "getVoteCount",
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
          inputs: [
            {
              internalType: "uint256",
              name: "questionId",
              type: "uint256",
            },
          ],
          name: "getVotesForQuestion",
          outputs: [
            {
              internalType: "string[10]",
              name: "choices",
              type: "string[10]",
            },
            {
              internalType: "uint256[10]",
              name: "voteCounts",
              type: "uint256[10]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "questionId",
              type: "uint256",
            },
          ],
          name: "isQuestionOpen",
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
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "questions",
          outputs: [
            {
              internalType: "string",
              name: "text",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "choiceCount",
              type: "uint256",
            },
            {
              internalType: "bool",
              name: "isOpen",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "totalQuestions",
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
          name: "totalVoters",
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
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "voters",
          outputs: [
            {
              internalType: "bool",
              name: "hasVoted",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
      ] as const,
    },
  ],
  plugins: [react()],
});
