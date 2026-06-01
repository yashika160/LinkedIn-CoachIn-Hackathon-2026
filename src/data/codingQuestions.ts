export type Difficulty = "Easy" | "Medium" | "Hard";

export interface TestCase {
  input: any;
  output: any;
}

export interface CodingQuestion {
  id: string;
  title: string;
  difficulty: Difficulty;
  problem: string;
  input: string;
  output: string;
  starter: string;
  hiddenTests: TestCase[];
}

export type Mode = "dsa" | "realworld" | "ai";

export const codingQuestions: Record<Mode, CodingQuestion[]> = {
  dsa: [
    {
      id: "two-sum",
      title: "Two Sum",
      difficulty: "Easy",
      problem:
        "Given an array of integers, return indices of two numbers such that they add up to target.",
      input: "nums = [2,7,11,15], target = 9",
      output: "[0,1]",
      starter: `function twoSum(nums: number[], target: number): number[] {
  // write code
}`,
      hiddenTests: [
        { input: [2, 7, 11, 15], output: "[0,1]" },
        { input: [3, 2, 4], output: "[1,2]" },
      ],
    },
  ],

  realworld: [
    {
      id: "debounce",
      title: "Debounce Function",
      difficulty: "Medium",
      problem:
        "Implement debounce function used in frontend optimization.",
      input: "fn(), delay",
      output: "debounced function",
      starter: `function debounce(fn: Function, delay: number) {
  // implement
}`,
      hiddenTests: [],
    },
  ],

  ai: [
    {
      id: "spam",
      title: "Spam Detector",
      difficulty: "Hard",
      problem: "Detect spam messages using keyword logic.",
      input: "win money now",
      output: "true",
      starter: `function isSpam(msg: string): boolean {
  // AI logic
}`,
      hiddenTests: [
        { input: "win money now", output: true },
        { input: "hello friend", output: false },
      ],
    },
  ],
};