const promptQuestions = {
  beginner: {
    technical: [
      "What is prompt engineering?",
      "What is a system prompt?",
      "Explain zero-shot prompting.",
    ],

    scenario: [
      "AI is hallucinating. What will you do?",
      "How would you improve AI responses?",
    ],
  },

  intermediate: {
    technical: [
      "Explain few-shot prompting.",
      "What is context window?",
      "Explain prompt injection attacks.",
    ],

    scenario: [
      "How do you improve prompt quality?",
      "Role prompting vs instruction prompting?",
    ],
  },

  advanced: {
    technical: [
      "Create multi-agent prompting workflow.",
      "Optimize prompts for token efficiency.",
    ],

    scenario: [
      "Reduce hallucinations using prompts.",
      "Build enterprise-safe prompting systems.",
      "Design prompts for customer support AI.",
    ],
  },
};

export default promptQuestions;