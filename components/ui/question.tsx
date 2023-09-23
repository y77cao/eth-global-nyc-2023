import * as React from "react";

export const Question = ({
  questionPrompt,
  answers,
}: {
  questionPrompt: string;
  answers: string[];
}) => {
  return (
    <div className="justify-center flex-row">
      <div className="text-center">{questionPrompt}</div>
      <div className="flex-column p-10">
        {answers.map((answer, i) => (
          <div
            className="m-5 max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            key={i}
          >
            {answer}
          </div>
        ))}
      </div>
    </div>
  );
};
