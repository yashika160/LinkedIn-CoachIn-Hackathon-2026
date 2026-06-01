const dataEngineerQuestions = {
  beginner: {
    technical: [
      "What is ETL?",
      "Explain data pipelines.",
      "What is a data warehouse?",
    ],

    scenario: [
      "Pipeline failed during execution. What will you do?",
      "How would you handle missing data?",
    ],
  },

  intermediate: {
    technical: [
      "Explain batch vs stream processing.",
      "What is Hadoop?",
      "Explain schema design.",
    ],

    scenario: [
      "How would you optimize ETL jobs?",
      "Explain distributed data systems.",
    ],
  },

  advanced: {
    technical: [
      "Explain distributed storage systems.",
      "Explain data partitioning.",
    ],

    scenario: [
      "Design scalable data architecture.",
      "Optimize large-scale data processing.",
      "Real-time analytics pipeline design.",
    ],
  },
};

export default dataEngineerQuestions;