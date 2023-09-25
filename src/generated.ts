import {
  useContractRead,
  UseContractReadConfig,
  useContractWrite,
  UseContractWriteConfig,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useContractEvent,
  UseContractEventConfig,
} from 'wagmi'
import {
  ReadContractResult,
  WriteContractMode,
  PrepareWriteContractResult,
} from 'wagmi/actions'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// votingContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const votingContractABI = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'questionId', internalType: 'uint256', type: 'uint256' },
      { name: 'choice', internalType: 'string', type: 'string' },
    ],
    name: 'addAnswerToQuestion',
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'questionId', internalType: 'uint256', type: 'uint256' }],
    name: 'closeQuestion',
    outputs: [],
  },
  { stateMutability: 'nonpayable', type: 'constructor', inputs: [] },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'questionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'choice',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'AnswerAdded',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'text', internalType: 'string', type: 'string' },
      { name: 'initialChoices', internalType: 'string[]', type: 'string[]' },
    ],
    name: 'createQuestion',
    outputs: [],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'questionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'QuestionClosed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'questionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      { name: 'text', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'choices',
        internalType: 'string[]',
        type: 'string[]',
        indexed: false,
      },
    ],
    name: 'QuestionCreated',
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [
      { name: 'questionId', internalType: 'uint256', type: 'uint256' },
      { name: 'choice', internalType: 'string', type: 'string' },
    ],
    name: 'vote',
    outputs: [],
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'voter',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'questionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'choice',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'Voted',
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'questionId', internalType: 'uint256', type: 'uint256' }],
    name: 'getQuestion',
    outputs: [
      { name: '', internalType: 'string', type: 'string' },
      { name: '', internalType: 'string[10]', type: 'string[10]' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bool', type: 'bool' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [
      { name: 'questionId', internalType: 'uint256', type: 'uint256' },
      { name: 'choice', internalType: 'string', type: 'string' },
    ],
    name: 'getVoteCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'questionId', internalType: 'uint256', type: 'uint256' }],
    name: 'getVotesForQuestion',
    outputs: [
      { name: 'choices', internalType: 'string[10]', type: 'string[10]' },
      { name: 'voteCounts', internalType: 'uint256[10]', type: 'uint256[10]' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: 'questionId', internalType: 'uint256', type: 'uint256' }],
    name: 'isQuestionOpen',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'questions',
    outputs: [
      { name: 'text', internalType: 'string', type: 'string' },
      { name: 'choiceCount', internalType: 'uint256', type: 'uint256' },
      { name: 'isOpen', internalType: 'bool', type: 'bool' },
    ],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalQuestions',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [],
    name: 'totalVoters',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'voters',
    outputs: [{ name: 'hasVoted', internalType: 'bool', type: 'bool' }],
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link votingContractABI}__.
 */
export function useVotingContractRead<
  TFunctionName extends string,
  TSelectData = ReadContractResult<typeof votingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof votingContractABI, TFunctionName, TSelectData>,
    'abi'
  > = {} as any,
) {
  return useContractRead({
    abi: votingContractABI,
    ...config,
  } as UseContractReadConfig<
    typeof votingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link votingContractABI}__ and `functionName` set to `"getQuestion"`.
 */
export function useVotingContractGetQuestion<
  TFunctionName extends 'getQuestion',
  TSelectData = ReadContractResult<typeof votingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof votingContractABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: votingContractABI,
    functionName: 'getQuestion',
    ...config,
  } as UseContractReadConfig<
    typeof votingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link votingContractABI}__ and `functionName` set to `"getVoteCount"`.
 */
export function useVotingContractGetVoteCount<
  TFunctionName extends 'getVoteCount',
  TSelectData = ReadContractResult<typeof votingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof votingContractABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: votingContractABI,
    functionName: 'getVoteCount',
    ...config,
  } as UseContractReadConfig<
    typeof votingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link votingContractABI}__ and `functionName` set to `"getVotesForQuestion"`.
 */
export function useVotingContractGetVotesForQuestion<
  TFunctionName extends 'getVotesForQuestion',
  TSelectData = ReadContractResult<typeof votingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof votingContractABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: votingContractABI,
    functionName: 'getVotesForQuestion',
    ...config,
  } as UseContractReadConfig<
    typeof votingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link votingContractABI}__ and `functionName` set to `"isQuestionOpen"`.
 */
export function useVotingContractIsQuestionOpen<
  TFunctionName extends 'isQuestionOpen',
  TSelectData = ReadContractResult<typeof votingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof votingContractABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: votingContractABI,
    functionName: 'isQuestionOpen',
    ...config,
  } as UseContractReadConfig<
    typeof votingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link votingContractABI}__ and `functionName` set to `"owner"`.
 */
export function useVotingContractOwner<
  TFunctionName extends 'owner',
  TSelectData = ReadContractResult<typeof votingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof votingContractABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: votingContractABI,
    functionName: 'owner',
    ...config,
  } as UseContractReadConfig<
    typeof votingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link votingContractABI}__ and `functionName` set to `"questions"`.
 */
export function useVotingContractQuestions<
  TFunctionName extends 'questions',
  TSelectData = ReadContractResult<typeof votingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof votingContractABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: votingContractABI,
    functionName: 'questions',
    ...config,
  } as UseContractReadConfig<
    typeof votingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link votingContractABI}__ and `functionName` set to `"totalQuestions"`.
 */
export function useVotingContractTotalQuestions<
  TFunctionName extends 'totalQuestions',
  TSelectData = ReadContractResult<typeof votingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof votingContractABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: votingContractABI,
    functionName: 'totalQuestions',
    ...config,
  } as UseContractReadConfig<
    typeof votingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link votingContractABI}__ and `functionName` set to `"totalVoters"`.
 */
export function useVotingContractTotalVoters<
  TFunctionName extends 'totalVoters',
  TSelectData = ReadContractResult<typeof votingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof votingContractABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: votingContractABI,
    functionName: 'totalVoters',
    ...config,
  } as UseContractReadConfig<
    typeof votingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractRead}__ with `abi` set to __{@link votingContractABI}__ and `functionName` set to `"voters"`.
 */
export function useVotingContractVoters<
  TFunctionName extends 'voters',
  TSelectData = ReadContractResult<typeof votingContractABI, TFunctionName>,
>(
  config: Omit<
    UseContractReadConfig<typeof votingContractABI, TFunctionName, TSelectData>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return useContractRead({
    abi: votingContractABI,
    functionName: 'voters',
    ...config,
  } as UseContractReadConfig<
    typeof votingContractABI,
    TFunctionName,
    TSelectData
  >)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link votingContractABI}__.
 */
export function useVotingContractWrite<
  TFunctionName extends string,
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof votingContractABI,
          string
        >['request']['abi'],
        TFunctionName,
        TMode
      >
    : UseContractWriteConfig<typeof votingContractABI, TFunctionName, TMode> & {
        abi?: never
      } = {} as any,
) {
  return useContractWrite<typeof votingContractABI, TFunctionName, TMode>({
    abi: votingContractABI,
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link votingContractABI}__ and `functionName` set to `"addAnswerToQuestion"`.
 */
export function useVotingContractAddAnswerToQuestion<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof votingContractABI,
          'addAnswerToQuestion'
        >['request']['abi'],
        'addAnswerToQuestion',
        TMode
      > & { functionName?: 'addAnswerToQuestion' }
    : UseContractWriteConfig<
        typeof votingContractABI,
        'addAnswerToQuestion',
        TMode
      > & {
        abi?: never
        functionName?: 'addAnswerToQuestion'
      } = {} as any,
) {
  return useContractWrite<
    typeof votingContractABI,
    'addAnswerToQuestion',
    TMode
  >({
    abi: votingContractABI,
    functionName: 'addAnswerToQuestion',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link votingContractABI}__ and `functionName` set to `"closeQuestion"`.
 */
export function useVotingContractCloseQuestion<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof votingContractABI,
          'closeQuestion'
        >['request']['abi'],
        'closeQuestion',
        TMode
      > & { functionName?: 'closeQuestion' }
    : UseContractWriteConfig<
        typeof votingContractABI,
        'closeQuestion',
        TMode
      > & {
        abi?: never
        functionName?: 'closeQuestion'
      } = {} as any,
) {
  return useContractWrite<typeof votingContractABI, 'closeQuestion', TMode>({
    abi: votingContractABI,
    functionName: 'closeQuestion',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link votingContractABI}__ and `functionName` set to `"createQuestion"`.
 */
export function useVotingContractCreateQuestion<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof votingContractABI,
          'createQuestion'
        >['request']['abi'],
        'createQuestion',
        TMode
      > & { functionName?: 'createQuestion' }
    : UseContractWriteConfig<
        typeof votingContractABI,
        'createQuestion',
        TMode
      > & {
        abi?: never
        functionName?: 'createQuestion'
      } = {} as any,
) {
  return useContractWrite<typeof votingContractABI, 'createQuestion', TMode>({
    abi: votingContractABI,
    functionName: 'createQuestion',
    ...config,
  } as any)
}

/**
 * Wraps __{@link useContractWrite}__ with `abi` set to __{@link votingContractABI}__ and `functionName` set to `"vote"`.
 */
export function useVotingContractVote<
  TMode extends WriteContractMode = undefined,
>(
  config: TMode extends 'prepared'
    ? UseContractWriteConfig<
        PrepareWriteContractResult<
          typeof votingContractABI,
          'vote'
        >['request']['abi'],
        'vote',
        TMode
      > & { functionName?: 'vote' }
    : UseContractWriteConfig<typeof votingContractABI, 'vote', TMode> & {
        abi?: never
        functionName?: 'vote'
      } = {} as any,
) {
  return useContractWrite<typeof votingContractABI, 'vote', TMode>({
    abi: votingContractABI,
    functionName: 'vote',
    ...config,
  } as any)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link votingContractABI}__.
 */
export function usePrepareVotingContractWrite<TFunctionName extends string>(
  config: Omit<
    UsePrepareContractWriteConfig<typeof votingContractABI, TFunctionName>,
    'abi'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: votingContractABI,
    ...config,
  } as UsePrepareContractWriteConfig<typeof votingContractABI, TFunctionName>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link votingContractABI}__ and `functionName` set to `"addAnswerToQuestion"`.
 */
export function usePrepareVotingContractAddAnswerToQuestion(
  config: Omit<
    UsePrepareContractWriteConfig<
      typeof votingContractABI,
      'addAnswerToQuestion'
    >,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: votingContractABI,
    functionName: 'addAnswerToQuestion',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof votingContractABI,
    'addAnswerToQuestion'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link votingContractABI}__ and `functionName` set to `"closeQuestion"`.
 */
export function usePrepareVotingContractCloseQuestion(
  config: Omit<
    UsePrepareContractWriteConfig<typeof votingContractABI, 'closeQuestion'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: votingContractABI,
    functionName: 'closeQuestion',
    ...config,
  } as UsePrepareContractWriteConfig<typeof votingContractABI, 'closeQuestion'>)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link votingContractABI}__ and `functionName` set to `"createQuestion"`.
 */
export function usePrepareVotingContractCreateQuestion(
  config: Omit<
    UsePrepareContractWriteConfig<typeof votingContractABI, 'createQuestion'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: votingContractABI,
    functionName: 'createQuestion',
    ...config,
  } as UsePrepareContractWriteConfig<
    typeof votingContractABI,
    'createQuestion'
  >)
}

/**
 * Wraps __{@link usePrepareContractWrite}__ with `abi` set to __{@link votingContractABI}__ and `functionName` set to `"vote"`.
 */
export function usePrepareVotingContractVote(
  config: Omit<
    UsePrepareContractWriteConfig<typeof votingContractABI, 'vote'>,
    'abi' | 'functionName'
  > = {} as any,
) {
  return usePrepareContractWrite({
    abi: votingContractABI,
    functionName: 'vote',
    ...config,
  } as UsePrepareContractWriteConfig<typeof votingContractABI, 'vote'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link votingContractABI}__.
 */
export function useVotingContractEvent<TEventName extends string>(
  config: Omit<
    UseContractEventConfig<typeof votingContractABI, TEventName>,
    'abi'
  > = {} as any,
) {
  return useContractEvent({
    abi: votingContractABI,
    ...config,
  } as UseContractEventConfig<typeof votingContractABI, TEventName>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link votingContractABI}__ and `eventName` set to `"AnswerAdded"`.
 */
export function useVotingContractAnswerAddedEvent(
  config: Omit<
    UseContractEventConfig<typeof votingContractABI, 'AnswerAdded'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: votingContractABI,
    eventName: 'AnswerAdded',
    ...config,
  } as UseContractEventConfig<typeof votingContractABI, 'AnswerAdded'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link votingContractABI}__ and `eventName` set to `"QuestionClosed"`.
 */
export function useVotingContractQuestionClosedEvent(
  config: Omit<
    UseContractEventConfig<typeof votingContractABI, 'QuestionClosed'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: votingContractABI,
    eventName: 'QuestionClosed',
    ...config,
  } as UseContractEventConfig<typeof votingContractABI, 'QuestionClosed'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link votingContractABI}__ and `eventName` set to `"QuestionCreated"`.
 */
export function useVotingContractQuestionCreatedEvent(
  config: Omit<
    UseContractEventConfig<typeof votingContractABI, 'QuestionCreated'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: votingContractABI,
    eventName: 'QuestionCreated',
    ...config,
  } as UseContractEventConfig<typeof votingContractABI, 'QuestionCreated'>)
}

/**
 * Wraps __{@link useContractEvent}__ with `abi` set to __{@link votingContractABI}__ and `eventName` set to `"Voted"`.
 */
export function useVotingContractVotedEvent(
  config: Omit<
    UseContractEventConfig<typeof votingContractABI, 'Voted'>,
    'abi' | 'eventName'
  > = {} as any,
) {
  return useContractEvent({
    abi: votingContractABI,
    eventName: 'Voted',
    ...config,
  } as UseContractEventConfig<typeof votingContractABI, 'Voted'>)
}
