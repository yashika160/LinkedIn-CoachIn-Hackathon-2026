"use client";

import { useEffect, useState } from "react";

import {
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Lock,
  PlayCircle,
  Sparkles,
} from "lucide-react";

const roadmapData: any = {
  "software engineer": [
    {
      title: "DSA",
      lessons: [
        "Arrays",
        "Linked Lists",
        "Stacks",
        "Queues",
        "Trees",
      ],
    },

    {
      title: "Git & GitHub",
      lessons: [
        "Git Basics",
        "Branches",
        "GitHub Workflow",
      ],
    },

    {
      title: "HTML/CSS/JS",
      lessons: [
        "HTML Basics",
        "CSS Flexbox",
        "JavaScript DOM",
      ],
    },

    {
      title: "React + Tailwind",
      lessons: [
        "React Basics",
        "Hooks",
        "Tailwind UI",
      ],
    },

    {
      title: "Node.js",
      lessons: [
        "Express",
        "APIs",
        "Authentication",
      ],
    },

    {
      title: "Databases",
      lessons: [
        "SQL",
        "MongoDB",
      ],
    },

    {
      title: "Docker",
      lessons: [
        "Containers",
        "Docker Compose",
      ],
    },

    {
      title: "System Design",
      lessons: [
        "Scalability",
        "Caching",
        "Load Balancing",
      ],
    },
  ],

  "ai/ml engineer": [
    {
      title: "Python",
      lessons: [
        "Basics",
        "Functions",
        "OOP",
      ],
    },

    {
      title: "Mathematics",
      lessons: [
        "Linear Algebra",
        "Probability",
      ],
    },

    {
      title: "Advanced Python",
      lessons: [
        "Decorators",
        "Generators",
      ],
    },

    {
      title: "Machine Learning",
      lessons: [
        "Regression",
        "Classification",
      ],
    },

    {
      title: "Deep Learning",
      lessons: [
        "CNN",
        "RNN",
        "TensorFlow",
      ],
    },

    {
      title: "Generative AI & LLMs",
      lessons: [
        "Transformers",
        "Prompt Engineering",
      ],
    },
  ],

  "data analyst": [
    {
      title: "Excel & Statistics",
      lessons: [
        "Excel Basics",
        "Pivot Tables",
      ],
    },

    {
      title: "SQL",
      lessons: [
        "Queries",
        "Joins",
      ],
    },

    {
      title: "Visualization",
      lessons: [
        "PowerBI",
        "Tableau",
      ],
    },

    {
      title: "Python for Data Analysis",
      lessons: [
        "Pandas",
        "NumPy",
      ],
    },
  ],
};

export default function RoadmapTimeline() {

  const [role, setRole] = useState("");

  const [expanded, setExpanded] =
    useState<number | null>(0);

  const [completedLessons, setCompletedLessons] =
    useState<any>({});
const [flowKey, setFlowKey] = useState(0);
  useEffect(() => {

    const userRole =
      localStorage.getItem("userRole") ||
      "software engineer";

    setRole(userRole.toLowerCase());

    const saved =
      JSON.parse(
        localStorage.getItem(
          "completedLessons"
        ) || "{}"
      );

    setCompletedLessons(saved);

  }, []);

  const roadmap =
    roadmapData[role] || [];

  const toggleLesson = (
    moduleIndex: number,
    lessonIndex: number
  ) => {

    const key = `${moduleIndex}-${lessonIndex}`;

    const updated = {
      ...completedLessons,
      [key]: true,
    };

    setCompletedLessons(updated);

    localStorage.setItem(
      "completedLessons",
      JSON.stringify(updated)
    );
  };

  const isLessonDone = (
    moduleIndex: number,
    lessonIndex: number
  ) => {
    return completedLessons[
      `${moduleIndex}-${lessonIndex}`
    ];
  };

  const isLessonUnlocked = (
    moduleIndex: number,
    lessonIndex: number
  ) => {

    if (moduleIndex === 0 && lessonIndex === 0)
      return true;

    if (lessonIndex === 0) {

      const prevModule =
        roadmap[moduleIndex - 1];

      return prevModule.lessons.every(
        (_: any, idx: number) =>
          isLessonDone(
            moduleIndex - 1,
            idx
          )
      );
    }

    return isLessonDone(
      moduleIndex,
      lessonIndex - 1
    );
  };

  const completedCount =
    Object.keys(completedLessons).length;

  const totalLessons = roadmap.reduce(
    (acc: number, item: any) =>
      acc + item.lessons.length,
    0
  );

  const progress =
    totalLessons === 0
      ? 0
      : Math.floor(
          (completedCount /
            totalLessons) *
            100
        );

  return (

    <div className="mt-20">

      {/* HEADER */}
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8 mb-12">

        <div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/20 bg-purple-500/10 mb-5">

            <Sparkles
              size={15}
              className="text-purple-600 dark:text-purple-300"
            />

            <span className="text-sm text-purple-700 dark:text-purple-200">
              Interactive Learning System
            </span>

          </div>

          <h2 className="text-5xl font-black">

            Learning Modules

          </h2>

          <p className="mt-5 text-foreground/45 text-lg max-w-2xl">
            Complete lessons sequentially to
            unlock advanced modules and track
            your AI-powered learning progress.
          </p>

        </div>

        {/* PROGRESS RING */}
        <div className="relative w-[180px] h-[180px] shrink-0">

          <svg
            className="w-full h-full -rotate-90"
            viewBox="0 0 120 120"
          >

            <circle
              cx="60"
              cy="60"
              r="52"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="10"
              fill="none"
            />

            <circle
              cx="60"
              cy="60"
              r="52"
              stroke="url(#grad)"
              strokeWidth="10"
              fill="none"
              strokeDasharray={327}
              strokeDashoffset={
                327 -
                (327 * progress) / 100
              }
              strokeLinecap="round"
            />

            <defs>

              <linearGradient
                id="grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >

                <stop
                  offset="0%"
                  stopColor="#a855f7"
                />

                <stop
                  offset="100%"
                  stopColor="#22d3ee"
                />

              </linearGradient>

            </defs>

          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <h2 className="text-4xl font-black">
              {progress}%
            </h2>

            <p className="text-foreground/45 text-sm mt-1">
              Completed
            </p>

          </div>

        </div>

      </div>

      {/* MODULES */}
      <div className="space-y-8">

        {roadmap.map(
          (
            module: any,
            moduleIndex: number
          ) => {

            const moduleDone =
              module.lessons.every(
                (
                  _: any,
                  idx: number
                ) =>
                  isLessonDone(
                    moduleIndex,
                    idx
                  )
              );

            const moduleUnlocked =
              moduleIndex === 0 ||
              roadmap[
                moduleIndex - 1
              ].lessons.every(
                (
                  _: any,
                  idx: number
                ) =>
                  isLessonDone(
                    moduleIndex - 1,
                    idx
                  )
              );

            return (

              <div
                key={moduleIndex}
                className={`
                relative overflow-hidden
                rounded-[34px]
                border
                backdrop-blur-2xl
                transition-all duration-500

                ${
                  moduleDone
                    ? "border-green-500/30 bg-green-500/10"
                    : moduleUnlocked
                    ? "border-purple-500/30 bg-purple-500/10"
                    : "border-border bg-card opacity-60"
                }
              `}
              >

                {/* GLOW */}
                <div
                  className={`
                  absolute top-[-80px] right-[-80px]
                  w-[240px] h-[240px]
                  rounded-full blur-[100px]

                  ${
                    moduleDone
                      ? "bg-green-500/15"
                      : moduleUnlocked
                      ? "bg-purple-500/15"
                      : "bg-black/5 dark:bg-black/5 dark:bg-white/5"
                  }
                `}
                />

                {/* MODULE HEADER */}
                <div className="relative z-10 p-8 flex items-center justify-between">

                  <div className="flex items-center gap-6">

                    <div
                      className={`
                      w-16 h-16 rounded-3xl
                      flex items-center justify-center

                      ${
                        moduleDone
                          ? "bg-green-500/20"
                          : moduleUnlocked
                          ? "bg-purple-500/20"
                          : "bg-black/10 dark:bg-white/10"
                      }
                    `}
                    >

                      {moduleDone ? (
                        <CheckCircle2
                          size={30}
                          className="text-green-600 dark:text-green-400"
                        />
                      ) : moduleUnlocked ? (
                        <PlayCircle
                          size={30}
                          className="text-purple-600 dark:text-purple-300"
                        />
                      ) : (
                        <Lock
                          size={28}
                          className="text-muted-foreground"
                        />
                      )}

                    </div>

                    <div>

                      <h2 className="text-3xl font-black">
                        {module.title}
                      </h2>

                      <p className="mt-2 text-foreground/45">
                        {
                          module.lessons.length
                        } lessons
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      setExpanded(
                        expanded ===
                          moduleIndex
                          ? null
                          : moduleIndex
                      )
                    }
                    className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-black/5 dark:bg-white/5 border border-border flex items-center justify-center"
                  >

                    {expanded ===
                    moduleIndex ? (
                      <ChevronUp />
                    ) : (
                      <ChevronDown />
                    )}

                  </button>

                </div>

                {/* LESSONS */}
                {expanded === moduleIndex && (

                  <div className="relative z-10 px-8 pb-8 space-y-5">

                    {module.lessons.map(
                      (
                        lesson: string,
                        lessonIndex: number
                      ) => {

                        const unlocked =
                          isLessonUnlocked(
                            moduleIndex,
                            lessonIndex
                          );

                        const done =
                          isLessonDone(
                            moduleIndex,
                            lessonIndex
                          );

                        return (

                          <div
                            key={lessonIndex}
                            className={`
                            rounded-3xl border
                            p-6 flex items-center justify-between

                            ${
                              done
                                ? "bg-green-500/10 border-green-500/30"
                                : unlocked
                                ? "bg-purple-500/10 border-purple-500/30"
                                : "bg-card border-border opacity-50"
                            }
                          `}
                          >

                            <div className="flex items-center gap-5">

                              <div
                                className={`
                                w-12 h-12 rounded-2xl
                                flex items-center justify-center

                                ${
                                  done
                                    ? "bg-green-500/20"
                                    : unlocked
                                    ? "bg-purple-500/20"
                                    : "bg-black/10 dark:bg-white/10"
                                }
                              `}
                              >

                                {done ? (
                                  <CheckCircle2
                                    className="text-green-600 dark:text-green-400"
                                  />
                                ) : unlocked ? (
                                  <PlayCircle
                                    className="text-purple-600 dark:text-purple-300"
                                  />
                                ) : (
                                  <Lock
                                    className="text-muted-foreground"
                                  />
                                )}

                              </div>

                              <div>

                                <h3 className="text-xl font-bold">
                                  {lesson}
                                </h3>

                                <p className="text-sm text-muted-foreground mt-1">
                                  Interactive guided lesson
                                </p>

                              </div>

                            </div>

                            <div className="flex gap-4">

                              <button
                                disabled={!unlocked}
                                className="px-6 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/30 disabled:opacity-40"
                              >
                                Start
                              </button>

                              <button
                                disabled={
                                  !unlocked ||
                                  done
                                }
                                onClick={() =>
                                  toggleLesson(
                                    moduleIndex,
                                    lessonIndex
                                  )
                                }
                                className={`
                                px-6 h-12 rounded-2xl

                                ${
                                  done
                                    ? "bg-green-500/20 border border-green-500/30"
                                    : "bg-black/5 dark:bg-black/5 dark:bg-white/5 border border-border"
                                }
                              `}
                              >

                                {done
                                  ? "Completed"
                                  : "Mark as Read"}

                              </button>

                            </div>

                          </div>

                        );
                      }
                    )}

                  </div>

                )}

              </div>

            );
          }
        )}

      </div>

    </div>
  );
}