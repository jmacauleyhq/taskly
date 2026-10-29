import Navbar from "./components/navbar";
import Link from "next/link";

const tasks = [
  { title: "Finish homepage design", category: "Design", color: "bg-emerald-100 text-emerald-800", done: true },
  { title: "Review project requirements", category: "Planning", color: "bg-lime-100 text-lime-800", done: false },
  { title: "Build responsive navbar", category: "Development", color: "bg-green-100 text-green-800", done: false },
];

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-[#F7FEE7] text-[#052E16]">
        {/* Hero */}
        <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-20 sm:px-8 sm:pt-28 lg:grid-cols-2 lg:gap-12 lg:pb-32 lg:pt-24">

          {/* Hero content */}
          <div className="max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/70 px-4 py-2 text-sm font-medium text-[#166534]">
              <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
              A simpler way to stay organised
            </div>

            <h1 className="text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Get things done.
              <span className="mt-2 block text-[#16A34A]">
                One task at a time.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-8 text-[#52665A] sm:text-lg">
              Organise your tasks, stay focused and make progress every day.
              Taskly helps you turn your to-do list into things actually done.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/login"
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#064E3B] px-7 py-4 text-base font-semibold text-white shadow-lg shadow-green-950/10 transition duration-200 hover:-translate-y-0.5 hover:bg-[#052E16]"
              >
                Get Started
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/features"
                className="inline-flex items-center justify-center rounded-full border border-green-200 bg-white/60 px-7 py-4 text-base font-semibold text-[#052E16] transition hover:bg-white"
              >
                Explore features
              </Link>
            </div>

            <div className="mt-9 flex items-center gap-3 text-sm text-[#52665A]">
              <div className="flex -space-x-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#F7FEE7] bg-green-200 text-xs font-bold">✓</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#F7FEE7] bg-lime-200 text-xs font-bold">✓</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#F7FEE7] bg-emerald-200 text-xs font-bold">✓</span>
              </div>
              <span>Less clutter. More progress.</span>
            </div>
          </div>

          {/* Dashboard preview */}
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#DCFCE7] blur-3xl" />
            <div className="absolute -bottom-10 -left-8 h-40 w-40 rounded-full bg-lime-200/60 blur-3xl" />

            <div className="relative rounded-3xl border border-green-100 bg-white p-5 shadow-2xl shadow-green-950/10 sm:p-7">
              {/* Dashboard header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-[#64756B]">
                    YOUR WORKSPACE
                  </p>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight">
                    My tasks
                  </h2>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#DCFCE7] text-xl">
                  ✓
                </div>
              </div>

              {/* Progress */}
              <div className="mt-7 rounded-2xl bg-[#F7FEE7] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">Daily progress</p>
                    <p className="mt-1 text-xs text-[#64756B]">
                      Keep up the momentum
                    </p>
                  </div>
                  <span className="text-lg font-bold text-[#15803D]">
                    2/5
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-green-100">
                  <div className="h-full w-2/5 rounded-full bg-[#22C55E]" />
                </div>
              </div>

              {/* Task list */}
              <div className="mt-7">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-bold">Today</h3>
                  <span className="text-sm text-[#64756B]">5 tasks</span>
                </div>

                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.title}
                      className="flex items-center gap-3 rounded-2xl border border-gray-100 p-4 transition hover:border-green-200 hover:bg-green-50/50"
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${
                          task.done
                            ? "border-[#16A34A] bg-[#16A34A] text-white"
                            : "border-gray-300 bg-white"
                        }`}
                      >
                        {task.done && <span className="text-xs">✓</span>}
                      </span>

                      <div className="min-w-0 flex-1">
                        <p
                          className={`truncate text-sm font-semibold ${
                            task.done
                              ? "text-gray-400 line-through"
                              : "text-[#052E16]"
                          }`}
                        >
                          {task.title}
                        </p>
                        <span
                          className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${task.color}`}
                        >
                          {task.category}
                        </span>
                      </div>

                      <span className="text-lg text-gray-300">···</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add task */}
              <div className="mt-5 flex items-center gap-3 rounded-2xl border border-dashed border-green-200 px-4 py-3 text-sm font-medium text-[#64756B]">
                <span className="text-xl text-[#16A34A]">+</span>
                Add a new task
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-3 hidden items-center gap-3 rounded-2xl border border-green-100 bg-white p-4 shadow-xl shadow-green-950/10 sm:flex">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100 text-lg">
                ✨
              </div>
              <div>
                <p className="text-sm font-bold">You&apos;re making progress!</p>
                <p className="mt-1 text-xs text-[#64756B]">
                  One step at a time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="border-t border-green-100 bg-white/60">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#16A34A]">
                Made for your everyday
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Productivity without the complexity.
              </h2>
              <p className="mt-4 leading-7 text-[#64756B]">
                Everything you need to stay organised, without getting in your way.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: "✓",
                  title: "Stay organised",
                  description: "Keep your tasks in one simple, organised place.",
                },
                {
                  icon: "◎",
                  title: "Focus on what matters",
                  description: "Know what needs doing and take it one step at a time.",
                },
                {
                  icon: "↗",
                  title: "Track your progress",
                  description: "See what you've accomplished and keep moving forward.",
                },
                {
                  icon: "✳",
                  title: "Keep it simple",
                  description: "Spend less time managing lists and more time getting things done.",
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-green-100 bg-white p-6 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-950/5"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#DCFCE7] text-xl font-bold text-[#166534]">
                    {feature.icon}
                  </div>
                  <h3 className="mt-5 font-bold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#64756B]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto flex max-w-7xl flex-col items-center rounded-3xl bg-[#064E3B] px-6 py-14 text-center text-white sm:px-12 sm:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-200">
              Your next step starts here
            </p>
            <h2 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
              A little progress every day adds up.
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-green-100">
              Bring your tasks together, find your focus and make today count.
            </p>
            <Link
              href="/login"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#F7FEE7] px-7 py-4 font-semibold text-[#052E16] transition hover:bg-white"
            >
              Get Started
              <span>→</span>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-green-100">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row sm:px-8">
            <Link href="/" className="text-xl font-bold tracking-tight">
              taskly<span className="text-[#16A34A]">.</span>
            </Link>
            <p className="text-sm text-[#64756B]">
              Make every task count.
            </p>
            <p className="text-sm text-[#64756B]">
              © 2026 taskly
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}