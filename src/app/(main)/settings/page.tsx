"use client";

import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  User,
  Bell,
  Shield,
  Palette,
  Save,
  Check,
} from "lucide-react";

const tabs = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
  },
  {
    id: "preferences",
    label: "Preferences",
    icon: Palette,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "privacy",
    label: "Privacy",
    icon: Shield,
  },
];

export default function SettingsPage() {

  const [activeTab, setActiveTab] =
    useState("profile");

  const [saved, setSaved] =
    useState(false);

  /* ---------------- PROFILE ---------------- */

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  /* ---------------- PREFERENCES ---------------- */

  const [aiSuggestions, setAiSuggestions] =
    useState(true);

  const [autoSave, setAutoSave] =
    useState(true);

  /* ---------------- NOTIFICATIONS ---------------- */

  const [quizReminders, setQuizReminders] =
    useState(true);

  const [roadmapUpdates, setRoadmapUpdates] =
    useState(true);

  const [weeklyEmails, setWeeklyEmails] =
    useState(false);

  /* ---------------- LOAD LOCAL STORAGE ---------------- */

  useEffect(() => {

    const storedName =
      localStorage.getItem("userName");

    const storedEmail =
      localStorage.getItem("userGmail");

    if (storedName) {
      setName(storedName);
    }

    if (storedEmail) {
      setEmail(storedEmail);
    }

    const settings =
      localStorage.getItem("settings");

    if (settings) {

      const parsed =
        JSON.parse(settings);

      setAiSuggestions(
        parsed.aiSuggestions
      );

      setAutoSave(
        parsed.autoSave
      );

      setQuizReminders(
        parsed.quizReminders
      );

      setRoadmapUpdates(
        parsed.roadmapUpdates
      );

      setWeeklyEmails(
        parsed.weeklyEmails
      );
    }

  }, []);

  /* ---------------- SAVE SETTINGS ---------------- */

  const saveSettings = () => {

    /* PROFILE */
    localStorage.setItem(
      "userName",
      name
    );

    localStorage.setItem(
      "userGmail",
      email
    );

    /* SETTINGS */
    localStorage.setItem(
      "settings",

      JSON.stringify({
        aiSuggestions,
        autoSave,
        quizReminders,
        roadmapUpdates,
        weeklyEmails,
      })
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2000);
  };

  /* ---------------- TOGGLE COMPONENT ---------------- */

  const Toggle = ({
    enabled,
    setEnabled,
  }: any) => (
    <button
      onClick={() =>
        setEnabled(!enabled)
      }
      className={`

      relative w-14 h-8 rounded-full
      transition-all duration-300

      ${
        enabled
          ? "bg-purple-600"
          : "bg-white/10"
      }
      `}
    >

      <div
        className={`

        absolute top-1
        w-6 h-6 rounded-full bg-white
        transition-all duration-300

        ${
          enabled
            ? "left-7"
            : "left-1"
        }
        `}
      />

    </button>
  );

  return (
    <div className="min-h-screen bg-[#070A12] text-white flex overflow-hidden">

      {/* ================= SIDEBAR ================= */}

      <div
        className="

        w-72
        border-r border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        p-6

        relative
        z-20
      "
      >

        <h1 className="text-2xl font-bold mb-10">
          Settings
        </h1>

        <div className="space-y-3">

          {tabs.map((tab) => {

            const Icon =
              tab.icon;

            const active =
              activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveTab(
                    tab.id
                  )
                }
                className={`

                w-full
                flex items-center gap-3
                px-4 py-4
                rounded-2xl
                transition-all duration-300

                ${
                  active
                    ? "bg-purple-500/20 border border-purple-500/30 text-purple-300"
                    : "hover:bg-white/[0.05] text-white/70"
                }
                `}
              >

                <Icon size={18} />

                {tab.label}

              </button>
            );
          })}

        </div>

      </div>

      {/* ================= CONTENT ================= */}

      <div
        className="

        flex-1
        p-10
        relative
        overflow-y-auto

        z-10
      "
      >

        {/* BACKGROUND */}

        <div
          className="

          absolute inset-0
          pointer-events-none

          bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.20),transparent_60%)]
          "
        />

        {/* SAVE BUTTON */}

        <div className="relative flex justify-end mb-8">

          <button
            onClick={saveSettings}
            className="

            flex items-center gap-2

            px-6 py-3
            rounded-2xl

            bg-gradient-to-r
            from-purple-600
            to-cyan-500

            hover:scale-[1.02]
            transition-all duration-300

            shadow-[0_0_30px_rgba(168,85,247,0.25)]
            "
          >

            {saved ? (
              <>
                <Check size={18} />
                Saved
              </>
            ) : (
              <>
                <Save size={18} />
                Save Changes
              </>
            )}

          </button>

        </div>

        {/* ================= PROFILE ================= */}

        {activeTab === "profile" && (

  <motion.div
    initial={{
      opacity: 0,
      y: 20,
    }}
    animate={{
      opacity: 1,
      y: 0,
    }}
    className="relative"
  >

    <h2 className="text-4xl font-bold mb-8">
      Profile Settings
    </h2>

    <div
      className="

      rounded-3xl
      border border-white/10
      bg-white/[0.03]
      backdrop-blur-xl

      p-8
      space-y-8
      "
    >

      {/* PROFILE CARD */}
      <div className="flex items-center gap-6">

        <div
          className="

          w-24 h-24 rounded-3xl

          bg-gradient-to-br
          from-purple-600
          to-cyan-500

          flex items-center justify-center

          text-4xl font-black
          "
        >

          {name?.charAt(0) || "U"}

        </div>

        <div>

          <h3 className="text-3xl font-bold">
            {name || "User"}
          </h3>

          <p className="text-white/50 mt-2">
            {email || "user@email.com"}
          </p>

        </div>

      </div>

      {/* DETAILS */}
      <div className="grid md:grid-cols-2 gap-6">

        <div
          className="

          rounded-2xl
          border border-white/10
          bg-black/20

          p-6
          "
        >

          <p className="text-white/50 text-sm">
            Full Name
          </p>

          <h4 className="text-xl font-semibold mt-2">
            {name || "Not Available"}
          </h4>

        </div>

        <div
          className="

          rounded-2xl
          border border-white/10
          bg-black/20

          p-6
          "
        >

          <p className="text-white/50 text-sm">
            Email Address
          </p>

          <h4 className="text-xl font-semibold mt-2">
            {email || "Not Available"}
          </h4>

        </div>

      </div>

      {/* ACCOUNT STATUS */}
      <div
        className="

        flex items-center justify-between

        rounded-2xl
        border border-green-500/20
        bg-green-500/10

        p-6
        "
      >

        <div>

          <p className="text-green-300 font-semibold">
            Account Status
          </p>

          <p className="text-white/60 mt-1">
            Your profile is active and verified.
          </p>

        </div>

        <div
          className="

          px-4 py-2
          rounded-xl

          bg-green-500/20
          text-green-300
          font-semibold
          "
        >

          Active

        </div>

      </div>

    </div>

  </motion.div>
)}

        {/* ================= PREFERENCES ================= */}

        {activeTab === "preferences" && (

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >

            <h2 className="text-4xl font-bold mb-8">
              Preferences
            </h2>

            <div
              className="

              rounded-3xl
              border border-white/10
              bg-white/[0.03]

              p-8
              space-y-8
              "
            >

              <div className="flex justify-between items-center">

                <div>

                  <p className="font-semibold text-lg">
                    AI Suggestions
                  </p>

                  <p className="text-white/50">
                    Personalized learning recommendations
                  </p>

                </div>

                <Toggle
                  enabled={aiSuggestions}
                  setEnabled={setAiSuggestions}
                />

              </div>

              <div className="flex justify-between items-center">

                <div>

                  <p className="font-semibold text-lg">
                    Auto Save Progress
                  </p>

                  <p className="text-white/50">
                    Automatically save quiz and roadmap progress
                  </p>

                </div>

                <Toggle
                  enabled={autoSave}
                  setEnabled={setAutoSave}
                />

              </div>

            </div>

          </motion.div>
        )}

        {/* ================= NOTIFICATIONS ================= */}

        {activeTab === "notifications" && (

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >

            <h2 className="text-4xl font-bold mb-8">
              Notifications
            </h2>

            <div
              className="

              rounded-3xl
              border border-white/10
              bg-white/[0.03]

              p-8
              space-y-8
              "
            >

              <div className="flex justify-between items-center">

                <div>

                  <p className="font-semibold text-lg">
                    Quiz Reminders
                  </p>

                  <p className="text-white/50">
                    Receive reminders for pending quizzes
                  </p>

                </div>

                <Toggle
                  enabled={quizReminders}
                  setEnabled={setQuizReminders}
                />

              </div>

              <div className="flex justify-between items-center">

                <div>

                  <p className="font-semibold text-lg">
                    Roadmap Updates
                  </p>

                  <p className="text-white/50">
                    Get notified about completed milestones
                  </p>

                </div>

                <Toggle
                  enabled={roadmapUpdates}
                  setEnabled={setRoadmapUpdates}
                />

              </div>

              <div className="flex justify-between items-center">

                <div>

                  <p className="font-semibold text-lg">
                    Weekly Summary Emails
                  </p>

                  <p className="text-white/50">
                    Weekly productivity and learning reports
                  </p>

                </div>

                <Toggle
                  enabled={weeklyEmails}
                  setEnabled={setWeeklyEmails}
                />

              </div>

            </div>

          </motion.div>
        )}

        {/* ================= PRIVACY ================= */}

        {activeTab === "privacy" && (

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >

            <h2 className="text-4xl font-bold mb-8">
              Privacy & Security
            </h2>

            <div
              className="

              rounded-3xl
              border border-white/10
              bg-white/[0.03]

              p-8
              space-y-8
              "
            >

              <div>

                <h3 className="text-xl font-semibold">
                  Account Security
                </h3>

                <p className="text-white/50 mt-2">
                  Your account activity and learning progress are securely stored.
                </p>

              </div>

              <div>

                <h3 className="text-xl font-semibold">
                  Data Protection
                </h3>

                <p className="text-white/50 mt-2">
                  Personal information is encrypted and never shared with third parties.
                </p>

              </div>

              <div>

                <h3 className="text-xl font-semibold">
                  Learning Analytics
                </h3>

                <p className="text-white/50 mt-2">
                  Quiz performance and roadmap analytics are used to improve recommendations.
                </p>

              </div>

            </div>

          </motion.div>
        )}

      </div>

    </div>
  );
}