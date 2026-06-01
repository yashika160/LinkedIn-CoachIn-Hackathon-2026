const aiQuestions = {
  beginner: {
    technical: [
      "What is artificial intelligence?",
      "Difference between AI and ML?",
      "What are LLMs?",
    ],

    scenario: [
      "AI chatbot gives wrong answers. What will you do?",
      "How would you improve AI response quality?",
    ],
  },

  intermediate: {
    technical: [
      "Explain transformers.",
      "What is fine-tuning?",
      "Explain embeddings.",
    ],

    scenario: [
      "How would you build an AI assistant?",
      "Explain vector database use cases.",
    ],
  },

  advanced: {
    technical: [
      "Explain RAG systems.",
      "Optimize token usage.",
    ],

    scenario: [
      "Prevent hallucinations in LLMs.",
      "Build an AI chatbot architecture.",
      "Design a scalable AI assistant.",
    ],
  },
};

export default aiQuestions;