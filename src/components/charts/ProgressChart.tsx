"use client";

import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { week: "Mon", progress: 20 },
  { week: "Tue", progress: 35 },
  { week: "Wed", progress: 50 },
  { week: "Thu", progress: 68 },
  { week: "Fri", progress: 82 },
  { week: "Sat", progress: 90 },
];

export default function ProgressChart() {
  return (
    <div className="glass rounded-3xl p-8">

      <h2 className="text-xl font-bold mb-6">
        Learning Momentum
      </h2>

      <div className="h-[280px]">

        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>

            <XAxis dataKey="week" stroke="#9ca3af" />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="progress"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={{ r: 5 }}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
}