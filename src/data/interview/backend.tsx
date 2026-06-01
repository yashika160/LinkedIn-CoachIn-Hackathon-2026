const backendQuestions = {
  beginner: {
    technical: [
      "What is an API?",
      "Difference between GET and POST?",
      "What is Node.js?",
    ],

    scenario: [
      "A route is returning 404. How will you debug it?",
      "Database connection failed. What will you do?",
    ],
  },

  intermediate: {
    technical: [
      "SQL vs NoSQL?",
      "Explain JWT authentication.",
      "What are microservices?",
    ],

    scenario: [
      "How would you secure API endpoints?",
      "How would you improve backend performance?",
    ],
  },

  advanced: {
    technical: [
      "Explain database indexing.",
      "Explain caching.",
    ],

    scenario: [
      "API response time suddenly increased. What will you do?",
      "How would you scale a backend system?",
      "Preventing race conditions in backend systems.",
    ],
  },
};

export default backendQuestions;