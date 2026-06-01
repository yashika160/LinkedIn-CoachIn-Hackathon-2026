const softwareQuestions = {
  beginner: {
    technical: [
      "What is OOP?",
      "Explain arrays and linked lists.",
      "What is Git?",
    ],

    scenario: [
      "A program is crashing unexpectedly. What will you do?",
      "How do you debug errors in code?",
    ],
  },

  intermediate: {
    technical: [
      "Difference between stack and queue?",
      "Explain time complexity.",
      "What are design patterns?",
    ],

    scenario: [
      "How would you improve code quality?",
      "Explain multithreading with example.",
    ],
  },

  advanced: {
    technical: [
      "Explain distributed systems.",
      "Explain deadlocks.",
    ],

    scenario: [
      "Design a scalable system.",
      "How would you optimize memory usage?",
      "Build a URL shortener system design.",
    ],
  },
};

export default softwareQuestions;