import Navbar from "../components/navbar";
import Link from "next/link";

const features = [
  {
    number: "01",
    icon: "✓",
    title: "Manage your tasks",
    description:
      "Create and organise your tasks in one place. Keep track of what needs doing and stay in control of your workload.",
    tag: "Stay organised",
  },
  {
    number: "02",
    icon: "◎",
    title: "Prioritise what matters",
    description:
      "Keep your attention on the important things. Organise your workload and tackle your tasks one step at a time.",
    tag: "Find your focus",
  },
  {
    number: "03",
    icon: "↗",
    title: "Track your progress",
    description:
      "See the progress you're making as you complete tasks and move closer to your daily goals.",
    tag: "Keep progressing",
  },
  {
    number: "04",
    icon: "◷",
    title: "Stay on schedule",
    description:
      "Keep deadlines in mind and plan your work so you can make the most of your day.",
    tag: "Make time count",
  },
  {
    number: "05",
    icon: "▦",
    title: "Your personal dashboard",
    description:
      "Get a clear overview of your tasks and progress without jumping between different lists.",
    tag: "Everything in one place",
  },
  {
    number: "06",
    icon: "✳",
    title: "Simple by design",
    description:
      "Enjoy a clean, straightforward workspace that keeps distractions to a minimum and productivity at the centre.",
    tag: "Less clutter",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-[#F7FEE7] text-[#052E16]">
        {/* Page heading */}
        <section className="px-6 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white/70 px-4 py-2 text-sm font-medium text-[#166534]">
                <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
                Everything you need to get things done
              </div>

              <h1 className="text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
                Meet your new way
                <span className="mt-2 block text-[#16A34A]">
                  to stay organised.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-[#52665A] sm:text-lg">
                Discover the tools that help you manage your tasks, focus on
                what matters and make progress every day. All in one simple
                workspace.
              </p>
            </div>
          </div>
        </section>

        {/* Features grid */}
        <section className="border-y border-green-100 bg-white/60">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20">
            <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#16A34A]">
                  Built for everyday productivity
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                  Everything working together.
                </h2>
              </div>

              <p className="max-w-md leading-7 text-[#64756B]">
                No unnecessary complexity. Just a simpler way to get things
                done.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.number}
                  className="group flex flex-col rounded-3xl border border-green-100 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-green-300 hover:shadow-xl hover:shadow-green-950/5 sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DCFCE7] text-xl font-bold text-[#166534] transition duration-200 group-hover:bg-[#064E3B] group-hover:text-white">
                      {feature.icon}
                    </div>

                    <span className="text-sm font-semibold tracking-widest text-green-200">
                      {feature.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="mt-3 flex-1 text-sm leading-7 text-[#64756B]">
                    {feature.description}
                  </p>

                  <div className="mt-7 border-t border-green-50 pt-5">
                    <span className="inline-flex items-center gap-2 rounded-full bg-[#F7FEE7] px-3 py-1.5 text-xs font-semibold text-[#166534]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                      {feature.tag}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Simple closing section */}
        <section className="px-6 py-20 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="relative overflow-hidden rounded-3xl bg-[#064E3B] px-6 py-14 text-center text-white sm:px-12 sm:py-20">
              <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-green-400/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-lime-300/10 blur-3xl" />

              <div className="relative mx-auto max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-200">
                  Make every task count
                </p>

                <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-5xl">
                  Ready to find your focus?
                </h2>

                <p className="mt-5 leading-7 text-green-100">
                  Start organising your tasks and take the next step towards a
                  more productive day.
                </p>

                <Link
                  href="/login"
                  className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#F7FEE7] px-7 py-4 font-semibold text-[#052E16] transition hover:-translate-y-0.5 hover:bg-white"
                >
                  Get Started
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-green-100 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-[#64756B] sm:flex-row">
          <p>© 2026 taskly. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/about" className="transition hover:text-green-800">
              About
            </Link>
            <Link href="/pricing" className="transition hover:text-green-800">
              Pricing
            </Link>
            <Link href="/login" className="transition hover:text-green-800">
              Log in
            </Link>
          </div>
        </div>
      </footer>
      </main>
    </>
  );
}