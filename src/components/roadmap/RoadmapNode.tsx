import { CheckCircle2, PlayCircle, Lock } from "lucide-react";

export default function RoadmapNode({ data }: any) {
  const { title, index, completed, unlocked } = data;

  return (
    <div
      className={`
        w-[260px]
        rounded-[32px]
        border
        p-6
        backdrop-blur-2xl
        shadow-xl
        transition-all duration-300

        ${
          completed
            ? "bg-green-500/10 border-green-500/30"
            : unlocked
            ? "bg-purple-500/10 border-purple-500/30"
            : "bg-card border-border opacity-40"
        }
      `}
    >
      {/* TOP ROW */}
      <div className="flex items-center justify-between">
        <div
          className={`
            w-14 h-14 rounded-2xl flex items-center justify-center

            ${
              completed
                ? "bg-green-500/20"
                : unlocked
                ? "bg-purple-500/20"
                : "bg-black/10 dark:bg-white/10"
            }
          `}
        >
          {completed ? (
            <CheckCircle2 className="text-green-600 dark:text-green-400" />
          ) : unlocked ? (
            <PlayCircle className="text-purple-600 dark:text-purple-300" />
          ) : (
            <Lock className="text-muted-foreground" />
          )}
        </div>

        <div className="text-muted-foreground text-2xl font-black">
          0{index + 1}
        </div>
      </div>

      {/* TITLE */}
      <h3 className="mt-6 text-xl font-bold text-foreground">
        {title}
      </h3>
    </div>
  );
}