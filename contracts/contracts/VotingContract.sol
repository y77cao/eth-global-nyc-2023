// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingContract {
    address public owner;
    uint256 public totalVoters;
    uint256 public totalQuestions;

    struct Question {
        string text;
        string[10] choices; // Maximum of 10 choices per question
        uint256 choiceCount; // Actual count of choices
        mapping(string => uint256) votes;
        bool isOpen;
    }

    struct Voter {
        bool hasVoted;
        mapping(uint256 => bool) hasVotedForQuestion;
    }

    mapping(uint256 => Question) public questions;
    mapping(address => Voter) public voters;

    event QuestionCreated(
        uint256 indexed questionId,
        string text,
        string[] choices
    );
    event QuestionClosed(uint256 indexed questionId);
    event AnswerAdded(uint256 indexed questionId, string choice);
    event Voted(
        address indexed voter,
        uint256 indexed questionId,
        string choice
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "Only the owner can perform this operation"
        );
        _;
    }

    function createQuestion(
        string memory text,
        string[] memory initialChoices
    ) public onlyOwner {
        totalQuestions++;
        Question storage newQuestion = questions[totalQuestions];
        newQuestion.text = text;
        newQuestion.isOpen = true;

        for (uint256 i = 0; i < initialChoices.length; i++) {
            require(
                newQuestion.choiceCount < 10,
                "Exceeded maximum number of choices"
            );
            newQuestion.choices[newQuestion.choiceCount] = initialChoices[i];
            newQuestion.choiceCount++;
        }

        emit QuestionCreated(totalQuestions, text, initialChoices);
    }

    function getQuestion(
        uint256 questionId
    ) public view returns (string memory, string[10] memory, uint256, bool) {
        require(questionId <= totalQuestions, "Invalid question ID");
        Question storage question = questions[questionId];
        return (
            question.text,
            question.choices,
            question.choiceCount,
            question.isOpen
        );
    }

    function getVotesForQuestion(
        uint256 questionId
    )
        public
        view
        returns (string[10] memory choices, uint256[10] memory voteCounts)
    {
        require(questionId <= totalQuestions, "Invalid question ID");
        Question storage question = questions[questionId];

        for (uint256 i = 0; i < question.choiceCount; i++) {
            choices[i] = question.choices[i];
            voteCounts[i] = question.votes[question.choices[i]];
        }
    }

    function closeQuestion(uint256 questionId) public onlyOwner {
        require(questionId <= totalQuestions, "Invalid question ID");
        questions[questionId].isOpen = false;
        emit QuestionClosed(questionId);
    }

    function addAnswerToQuestion(
        uint256 questionId,
        string memory choice
    ) public onlyOwner {
        require(questionId <= totalQuestions, "Invalid question ID");
        Question storage question = questions[questionId];
        require(question.isOpen, "This question is closed");
        require(
            question.choiceCount < 10,
            "Exceeded maximum number of choices"
        );

        question.choices[question.choiceCount] = choice;
        question.choiceCount++;

        emit AnswerAdded(questionId, choice);
    }

    function vote(uint256 questionId, string memory choice) public {
        require(questionId <= totalQuestions, "Invalid question ID");
        Question storage question = questions[questionId];
        require(question.isOpen, "This question is closed");
        require(
            !voters[msg.sender].hasVotedForQuestion[questionId],
            "You have already voted for this question"
        );

        bool validChoice = false;
        for (uint256 i = 0; i < question.choiceCount; i++) {
            if (
                keccak256(abi.encodePacked(question.choices[i])) ==
                keccak256(abi.encodePacked(choice))
            ) {
                validChoice = true;
                question.votes[choice]++;
                break;
            }
        }
        require(validChoice, "Invalid choice for this question");

        voters[msg.sender].hasVoted = true;
        voters[msg.sender].hasVotedForQuestion[questionId] = true;

        emit Voted(msg.sender, questionId, choice);
    }

    function getVoteCount(
        uint256 questionId,
        string memory choice
    ) public view returns (uint256) {
        require(questionId <= totalQuestions, "Invalid question ID");
        return questions[questionId].votes[choice];
    }

    function isQuestionOpen(uint256 questionId) public view returns (bool) {
        require(questionId <= totalQuestions, "Invalid question ID");
        return questions[questionId].isOpen;
    }
}
