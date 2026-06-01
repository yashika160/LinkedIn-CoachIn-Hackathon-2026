const fullStackQuestions = {
  beginner: {
    technical: [
      "What is full stack development?",
      "Explain client-server architecture.",
      "Explain REST API.",
    ],

    scenario: [
      "Frontend cannot fetch backend API. What will you check?",
      "MongoDB connection failed. How will you debug it?",
    ],
  },

  intermediate: {
    technical: [
      "Explain authentication flow.",
      "What is deployment?",
      "Explain CRUD operations.",
    ],

    scenario: [
      "How do you manage state in large apps?",
      "How would you deploy a MERN app?",
    ],
  },

  advanced: {
    technical: [
      "Explain CI/CD pipeline.",
      "How would you secure a full stack app?",
    ],

    scenario: [
      "Build architecture for an e-commerce platform.",
      "Optimize full stack application performance.",
      "Debugging production crashes.",
    ],
  },
};

export default fullStackQuestions;