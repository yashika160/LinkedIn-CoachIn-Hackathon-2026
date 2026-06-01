"use client";

import React, { useMemo } from "react";
import ReactFlow, { Background, MarkerType } from "reactflow";
import RoadmapNode from "@/components/roadmap/RoadmapNode";

const nodeTypes = {
  roadmap: RoadmapNode,
};

export default function RoadmapFlow({
  roadmap,
  completedLessons,
  isLessonDone,
}: any) {
  const nodes = useMemo(() => {
    return roadmap.map((item: any, index: number) => {
      return {
        id: index.toString(),
        position: {
          x: index * 320,
          y: index % 2 === 0 ? 50 : 240,
        },
        data: {
          label: item.title,
        },
      };
    });
  }, [roadmap, completedLessons]);

  const edges = useMemo(() => {
    return roadmap.slice(0, -1).map((_: any, index: number) => ({
      id: `e${index}`,
      source: index.toString(),
      target: (index + 1).toString(),
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
      style: {
        stroke: "#a855f7",
        strokeWidth: 3,
      },
    }));
  }, [roadmap]);

  return (
    <div className="h-[460px] rounded-[40px] overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-2xl">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#ffffff10" gap={24} />
      </ReactFlow>
    </div>
  );
}