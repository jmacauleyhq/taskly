
import Link from "next/link";
import Navbar from "../components/navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F7FEE7] text-[#052E16]">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="px-6 pb-20 pt-20 text-center sm:pb-28 sm:pt-28">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-green-200 bg-white/70 px-4 py-2 text-sm font-medium text-green-800">
              About taskly
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
              Making productivity
              <span className="block text-green-700">
                feel simple.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#52665A] sm:text-lg">
              taskly is built around one simple idea: getting things done
              shouldn&apos;t feel complicated. We want to help you organise
              your tasks, focus on what matters, and make progress one step
              at a time.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/login"
                className="rounded-full bg-[#064E3B] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#052E16]"
              >
                Get started
              </Link>

              <Link
                href="/features"
                className="rounded-full border border-green-200 bg-white/70 px-7 py-3.5 text-sm font-semibold text-[#052E16] transition hover:bg-white"
              >
                Explore features
              </Link>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="border-y border-green-100 bg-white/60 px-6 py-20 sm:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
                Our mission
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Less overwhelm.
                <br />
                More progress.
              </h2>

              <p className="mt-6 leading-8 text-[#52665A]">
                It&apos;s easy to feel overwhelmed when everything needs
                doing at once. Taskly aims to make your workload easier to
                manage by giving your tasks a clear place and helping you
                take things step by step.
              </p>

              <p className="mt-4 leading-8 text-[#52665A]">
                Whether you&apos;re working on a big project or simply
                organising your day, the goal is to make planning feel
                manageable and progress feel achievable.
              </p>
            </div>

            <div className="rounded-3xl border border-green-100 bg-[#F7FEE7] p-6 sm:p-9">
              <div className="rounded-2xl bg-[#064E3B] p-6 text-white sm:p-8">
                <p className="text-sm font-medium text-green-200">
                  The Taskly approach
                </p>

                <h3 className="mt-3 text-2xl font-bold">
                  Small steps lead to big results.
                </h3>

                <p className="mt-4 leading-7 text-green-100">
                  Focus on what&apos;s next, keep track of your progress,
                  and celebrate every task you complete.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-green-100 bg-white p-4">
                  <p className="text-lg font-bold text-green-800">
                    Stay focused
                  </p>
                  <p className="mt-1 text-sm text-[#64756B]">
                    Know what needs doing.
                  </p>
                </div>

                <div className="rounded-2xl border border-green-100 bg-white p-4">
                  <p className="text-lg font-bold text-green-800">
                    Keep moving
                  </p>
                  <p className="mt-1 text-sm text-[#64756B]">
                    Make progress every day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
                What we believe
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Productivity, your way.
              </h2>

              <p className="mt-4 leading-7 text-[#52665A]">
                The best productivity tools help you get on with your work,
                not get in the way of it.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Keep it simple",
                  description:
                    "A clear, straightforward experience that helps you spend less time organising and more time doing.",
                },
                {
                  number: "02",
                  title: "Focus on progress",
                  description:
                    "Every completed task counts. Build momentum by making steady progress towards your goals.",
                },
                {
                  number: "03",
                  title: "Put you first",
                  description:
                    "Your tasks, your priorities, and your workflow. Stay organised in a way that works for you.",
                },
              ].map((value) => (
                <article
                  key={value.number}
                  className="rounded-3xl border border-green-100 bg-white/80 p-7 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-950/5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-100 text-sm font-bold text-green-800">
                    {value.number}
                  </span>

                  <h3 className="mt-6 text-xl font-bold">
                    {value.title}
                  </h3>

                  <p className="mt-3 leading-7 text-[#64756B]">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-20 sm:pb-24">
          <div className="mx-auto max-w-6xl rounded-3xl bg-[#064E3B] px-6 py-14 text-center text-white sm:px-12 sm:py-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to make your day more productive?
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-green-100">
              Start organising your tasks and take the next step towards
              getting things done.
            </p>

            <Link
              href="/login"
              className="mt-8 inline-flex rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-[#064E3B] transition hover:bg-green-50"
            >
              Get started with Taskly
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-green-100 px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-[#64756B] sm:flex-row">
          <p>© 2026 taskly. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/features" className="transition hover:text-green-800">
              Features
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
    </div>
  );
}
