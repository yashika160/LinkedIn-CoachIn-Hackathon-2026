"use client";

type Props = {
  score: number;
  label: string;
};

export default function ScoreRing({
  score,
  label,
}: Props) {
  return (
    <div className="flex flex-col items-center">

      <div className="relative h-32 w-32">

        {/* BG */}

        <div
          className="
            absolute inset-0
            rounded-full
            border-[10px]
            border-border
          "
        />

        {/* PROGRESS */}

        <svg
          className="
            absolute
            inset-0
            -rotate-90
          "
          viewBox="0 0 120 120"
        >

          <circle
            cx="60"
            cy="60"
            r="50"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={314}
            strokeDashoffset={
              314 - (314 * score) / 100
            }
          />

          <defs>

            <linearGradient
              id="gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >

              <stop
                offset="0%"
                stopColor="#8B5CF6"
              />

              <stop
                offset="100%"
                stopColor="#22D3EE"
              />

            </linearGradient>

          </defs>

        </svg>

        {/* TEXT */}

        <div
          className="
            absolute inset-0
            flex
            items-center
            justify-center
            text-3xl
            font-black
          "
        >

          {score}%

        </div>

      </div>

      <p className="mt-4 text-gray-400">
        {label}
      </p>

    </div>
  );
}