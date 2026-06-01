const chats = [
  "Frontend Developer Path",
  "Mock Interview Prep",
  "Resume Improvement",
  "System Design Guidance",
];

export default function MentorSidebar() {
  return (
    <aside className="glass hidden w-[280px] border-r border-border p-6 lg:block">

      <h1 className="gradient-text mb-10 text-3xl font-bold">
        AI Mentor
      </h1>

      <button className="mb-8 w-full rounded-2xl bg-purple-600 px-5 py-4 font-semibold transition hover:bg-purple-500">
        + New Conversation
      </button>

      <div className="space-y-4">

        {chats.map((chat, index) => (
          <div
            key={index}
            className="cursor-pointer rounded-2xl bg-black/5 dark:bg-black/5 dark:bg-white/5 p-4 transition hover:bg-black/10 dark:bg-white/10"
          >
            {chat}
          </div>
        ))}

      </div>

    </aside>
  );
}