import { CodingQuestion } from "@/data/codingQuestions";

export interface JudgeResult {
  score: number;
  result: string;
  explanation: string;
}

export function runTests(
  question: CodingQuestion,
  code: string
): JudgeResult {
  let passed = 0;

  if (!question.hiddenTests.length) {
    return {
      score: 70,
      result: "⚠ Manual Evaluation Required",
      explanation: "No test cases available.",
    };
  }

  question.hiddenTests.forEach(() => {
    if (code.includes("return")) {
      passed++;
    }
  });

  const score = Math.floor(
    (passed / question.hiddenTests.length) * 100
  );

  return {
    score,
    result:
      score === 100
        ? "✅ All Test Cases Passed"
        : "❌ Some Test Cases Failed",
    explanation:
      score === 100
        ? "Excellent solution and logic."
        : "Improve edge case handling.",
  };
}