const mlQuestions = {
  beginner: {
    technical: [
      "What is machine learning?",
      "Difference between supervised and unsupervised learning?",
      "Explain overfitting.",
    ],

    scenario: [
      "Your model is giving poor accuracy. What will you do?",
      "Training data is noisy. How would you handle it?",
    ],
  },

  intermediate: {
    technical: [
      "Explain cross-validation.",
      "Difference between classification and regression?",
      "Explain gradient descent.",
    ],

    scenario: [
      "How would you improve model performance?",
      "How do you evaluate ML models?",
    ],
  },

  advanced: {
    technical: [
      "Explain bias vs variance tradeoff.",
      "What is model deployment?",
    ],

    scenario: [
      "Model accuracy suddenly dropped. Why?",
      "Optimize inference latency.",
      "Design an ML pipeline.",
    ],
  },
};

export default mlQuestions;