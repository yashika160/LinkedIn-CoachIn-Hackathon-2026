export function evaluateInterview(answers: string[]) {
  const total = answers.length;

  const avgLength =
    answers.reduce((acc, a) => acc + a.split(" ").length, 0) / total;

  const clarityScore = Math.min(100, Math.round(avgLength * 2));

  const technicalScore = Math.floor(Math.random() * 30 + 70);
  const confidenceScore = Math.floor(Math.random() * 30 + 65);

  return {
    totalScore: Math.round((clarityScore + technicalScore + confidenceScore) / 3),
    clarityScore,
    technicalScore,
    confidenceScore,
    feedback: [
      "Improve structured answering (use STAR method)",
      "Add more technical depth",
      "Good communication flow",
    ],
  };
}