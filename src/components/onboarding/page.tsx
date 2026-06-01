"use client"

import { useState } from "react"

import RoleSelection from "@/components/onboarding/RoleSelection"

export default function OnboardingPage() {
  const [selectedRole, setSelectedRole] =
    useState("")

  return (
    <main
      className="
        min-h-screen
        bg-[#020617]
        px-6
        py-20
        text-foreground
      "
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 text-center">
          <h1
            className="
              mb-4 text-5xl font-bold
              bg-gradient-to-r
              from-purple-400
              to-pink-400
              bg-clip-text
              text-transparent
            "
          >
            Choose Your Career Path
          </h1>

          <p className="text-lg text-gray-400">
            Personalized AI roadmap generation
            based on your career goals.
          </p>
        </div>

        <RoleSelection
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
        />

        {selectedRole && (
          <div className="mt-12 flex justify-center">
            <button
              className="
                rounded-2xl
                bg-gradient-to-r
                from-purple-500
                to-pink-500
                px-8 py-4
                text-lg font-semibold
                transition-all duration-300
                hover:scale-105
              "
            >
              Generate AI Roadmap
            </button>
          </div>
        )}
      </div>
    </main>
  )
}