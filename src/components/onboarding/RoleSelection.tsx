"use client"

import { motion } from "framer-motion"

import { roles } from "@/data/roles"

type Props = {
  selectedRole: string
  setSelectedRole: (role: string) => void
}

export default function RoleSelection({
  selectedRole,
  setSelectedRole,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {roles.map((role) => {
        const Icon = role.icon

        const isSelected =
          selectedRole === role.id

        return (
          <motion.button
            key={role.id}
            whileHover={{
              y: -5,
              scale: 1.02,
            }}
            whileTap={{
              scale: 0.98,
            }}
            onClick={() =>
              setSelectedRole(role.id)
            }
            className={`
              relative overflow-hidden
              rounded-3xl border
              p-6 text-left
              transition-all duration-300
              backdrop-blur-xl

              ${
                isSelected
                  ? "border-purple-500 bg-purple-500/10 shadow-[0_0_40px_rgba(168,85,247,0.3)]"
                  : "border-border bg-black/5 dark:bg-black/5 dark:bg-white/5 hover:border-purple-400/50"
              }
            `}
          >
            {/* GLOW */}

            <div
              className={`
                absolute inset-0 opacity-10 blur-3xl
                bg-gradient-to-r ${role.gradient}
              `}
            />

            {/* CONTENT */}

            <div className="relative z-10">
              <div
                className={`
                  mb-4 inline-flex rounded-2xl p-4
                  bg-gradient-to-r ${role.gradient}
                `}
              >
                <Icon className="h-7 w-7 text-foreground" />
              </div>

              <h3 className="mb-2 text-xl font-bold text-foreground">
                {role.title}
              </h3>

              <p className="text-sm text-gray-300">
                {role.description}
              </p>
            </div>
          </motion.button>
        )
      })}
    </div>
  )
}