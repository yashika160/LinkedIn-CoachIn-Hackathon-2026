import {
  Code2,
  Brain,
  BarChart3,
} from "lucide-react"

export const roles = [
  {
    id: "software-engineer",

    title: "Software Engineer",

    description:
      "Build scalable applications and systems.",

    icon: Code2,

    gradient:
      "from-purple-500 to-pink-500",

    skills: [
      {
        name: "Frontend",
        level: 85,
      },
      {
        name: "Backend",
        level: 80,
      },
      {
        name: "DSA",
        level: 75,
      },
      {
        name: "Databases",
        level: 70,
      },
      {
        name: "System Design",
        level: 60,
      },
    ],
  },

  {
    id: "ai-ml-engineer",

    title: "AI/ML Engineer",

    description:
      "Develop machine learning and AI systems.",

    icon: Brain,

    gradient:
      "from-cyan-500 to-blue-500",

    skills: [
      {
        name: "Python",
        level: 90,
      },
      {
        name: "Machine Learning",
        level: 85,
      },
      {
        name: "Deep Learning",
        level: 75,
      },
      {
        name: "LLMs",
        level: 70,
      },
      {
        name: "Deployment",
        level: 60,
      },
    ],
  },

  {
    id: "data-analyst",

    title: "Data Analyst",

    description:
      "Analyze and visualize business data.",

    icon: BarChart3,

    gradient:
      "from-green-500 to-emerald-500",

    skills: [
      {
        name: "Excel",
        level: 90,
      },
      {
        name: "SQL",
        level: 85,
      },
      {
        name: "Visualization",
        level: 80,
      },
      {
        name: "Statistics",
        level: 75,
      },
      {
        name: "Python",
        level: 70,
      },
    ],
  },
]