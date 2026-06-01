const frontendQuestions = {
  beginner: {
    technical: [
      "What is React?",
      "Difference between HTML and CSS?",
      "What are React hooks?",
    ],

    scenario: [
      "Your website is not responsive on mobile. What will you do?",
      "A button click is not working. How will you debug it?",
    ],
  },

  intermediate: {
    technical: [
      "Explain component lifecycle.",
      "Difference between Redux and Context API?",
      "How does virtual DOM work?",
    ],

    scenario: [
      "API data is loading slowly. How would you improve UX?",
      "How would you structure a scalable React project?",
    ],
  },

  advanced: {
    technical: [
      "Explain SSR vs CSR.",
      "How would you handle authentication in frontend?",
    ],

    scenario: [
      "How would you optimize a slow frontend app?",
      "Debugging memory leaks in React apps.",
      "Design a scalable frontend architecture.",
    ],
  },
};

export default frontendQuestions;