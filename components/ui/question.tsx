import * as React from "react";

export const Question = ({
  questionPrompt,
  answers,
}: {
  questionPrompt: string;
  answers: string[];
}) => {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div>{questionPrompt}</div>
      <div>
        {answers.map((answer, i) => (
          <div key={i}>{answer}</div>
        ))}
      </div>
    </div>
  );
};
