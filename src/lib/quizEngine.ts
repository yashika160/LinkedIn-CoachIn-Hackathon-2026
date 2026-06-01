import { QuizQuestion } from "@/data/quizData"

export const shuffleAndPick = (
  questions: QuizQuestion[],
  count: number = 10
) => {
  return [...questions]
    .sort(() => Math.random() - 0.5)
    .slice(0, count)
}

export const calculateScore = (
  questions: QuizQuestion[],
  answers: Record<number, string>
) => {
  let score = 0

  questions.forEach((q, i) => {
    if (answers[i] === q.correctAnswer) score++
  })

  return score
}