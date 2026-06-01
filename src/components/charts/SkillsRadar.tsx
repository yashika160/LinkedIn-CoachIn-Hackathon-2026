"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const data = [
  { skill: "Frontend", value: 85 },
  { skill: "Backend", value: 60 },
  { skill: "DSA", value: 78 },
  { skill: "System Design", value: 45 },
  { skill: "Communication", value: 88 },
];

export default function SkillsRadar() {
  return (
    <div className="glass rounded-3xl p-8">

      <h2 className="mb-8 text-2xl font-bold">
        Skill Analytics
      </h2>

      <div className="h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <RadarChart data={data}>

            <PolarGrid stroke="#374151" />

            <PolarAngleAxis
              dataKey="skill"
              tick={{ fill: "#d1d5db" }}
            />

            <Radar
              dataKey="value"
              stroke="#a855f7"
              fill="#a855f7"
              fillOpacity={0.5}
            />

          </RadarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}