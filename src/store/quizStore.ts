import { create } from "zustand";

type AnswerType = {
  question: string;
  selected: string;
  correct: string;
  options: string[];
  explanation: string;
};

type QuizStore = {
  subject: string;

  questions: any[];

  answers: AnswerType[];

  currentIndex: number;

  duration: number;

  startTime: number;

  setSubject: (subject: string) => void;

  setQuestions: (questions: any[]) => void;

  setAnswers: (answers: AnswerType[]) => void;

  addAnswer: (answer: AnswerType) => void;

  nextQuestion: () => void;

  setDuration: (duration: number) => void;

  setStartTime: (time: number) => void;

  resetQuiz: () => void;
};

export const useQuizStore = create<QuizStore>((set) => ({

  subject: "",

  questions: [],

  answers: [],

  currentIndex: 0,

  duration: 10,

  startTime: Date.now(),

  setSubject: (subject) =>
    set({ subject }),

  setQuestions: (questions) =>
    set({
      questions,
      currentIndex: 0,
      answers: [],
    }),

  setAnswers: (answers) =>
    set({ answers }),

  addAnswer: (answer) =>
    set((state) => ({
      answers: [...state.answers, answer],
    })),

  nextQuestion: () =>
    set((state) => ({
      currentIndex:
        state.currentIndex + 1,
    })),

  setDuration: (duration) =>
    set({ duration }),

  setStartTime: (time) =>
    set({ startTime: time }),

  resetQuiz: () =>
    set({
      subject: "",
      questions: [],
      answers: [],
      currentIndex: 0,
      duration: 10,
      startTime: Date.now(),
    }),

}));