
import Link from "next/link";
import Navbar from "../components/navbar";

const plans = [
  {
    name: "Free",
    description: "Everything you need to get started.",
    price: "£0",
    period: "forever",
    features: [
      "Create and manage tasks",
      "Basic task prioritisation",
      "Track your daily progress",
      "Personal dashboard",
    ],
    button: "Get started for free",
    popular: false,
  },
  {
    name: "Pro",
    description: "For people who want to do more.",
    price: "£4.99",
    period: "per month",
    features: [
      "Everything in Free",
      "Unlimited projects",
      "Advanced task organisation",
      "Detailed progress tracking",
      "Custom themes and preferences",
    ],
    button: "Try Pro",
    popular: true,
  },
  {
    name: "Team",
    description: "For teams that get things done together.",
    price: "£9.99",
    period: "per user / month",
    features: [
      "Everything in Pro",
      "Shared team projects",
      "Team task management",
      "Collaborative planning",
      "Priority support",
    ],
    button: "Get started",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#F7FEE7] text-[#052E16]">
      <Navbar />

      <main>
        {/* Hero */}
        <section className="px-6 pb-12 pt-16 text-center sm:pt-20">
          <span className="inline-flex rounded-full border border-green-200 bg-white/70 px-4 py-2 text-sm font-medium text-green-800">
            Simple, transparent pricing
          </span>

          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            The right plan for
            <span className="block text-green-700">your productivity.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl leading-8 text-[#52665A] sm:text-lg">
            Start for free and find the plan that fits the way you work.
            No complicated pricing, just more ways to get things done.
          </p>

          <p className="mt-4 text-xs text-[#64756B]">
            Mock prices for demonstration purposes.
          </p>
        </section>

        {/* Pricing cards */}
        <section className="px-6 pb-20 pt-8 sm:pb-28">
          <div className="mx-auto grid max-w-6xl items-stretch gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.name}
                className={`relative flex flex-col rounded-3xl border p-7 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-950/5 sm:p-8 ${
                  plan.popular
                    ? "border-[#064E3B] bg-[#064E3B] text-white lg:scale-105"
                    : "border-green-100 bg-white/80"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-lime-300 px-4 py-1.5 text-xs font-bold text-green-950">
                    MOST POPULAR
                  </span>
                )}

                <h2 className="text-xl font-bold">{plan.name}</h2>

                <p
                  className={`mt-2 min-h-12 text-sm leading-6 ${
                    plan.popular ? "text-green-100" : "text-[#64756B]"
                  }`}
                >
                  {plan.description}
                </p>

                <div className="mt-7 flex items-baseline gap-2">
                  <span className="text-4xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ${
                      plan.popular ? "text-green-100" : "text-[#64756B]"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>

                <Link
                  href="/login"
                  className={`mt-8 flex min-h-12 items-center justify-center rounded-full px-5 py-3 text-center text-sm font-semibold transition ${
                    plan.popular
                      ? "bg-white text-[#064E3B] hover:bg-green-50"
                      : "bg-[#064E3B] text-white hover:bg-[#052E16]"
                  }`}
                >
                  {plan.button}
                </Link>

                <div
                  className={`my-8 border-t ${
                    plan.popular ? "border-green-700" : "border-green-100"
                  }`}
                />

                <p className="text-sm font-semibold">What&apos;s included</p>

                <ul className="mt-5 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <span
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                          plan.popular
                            ? "bg-green-700 text-green-100"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        ✓
                      </span>

                      <span
                        className={`text-sm leading-6 ${
                          plan.popular ? "text-green-50" : "text-[#52665A]"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="border-t border-green-100 bg-white/50 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-700">
                Questions?
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight">
                Good to know.
              </h2>
            </div>

            <div className="mt-10 space-y-4">
              {[
                {
                  question: "Can I use taskly for free?",
                  answer:
                    "Yes! The Free plan is designed to help you get started with organising your tasks at no cost.",
                },
                {
                  question: "Can I change my plan later?",
                  answer:
                    "These are demonstration plans. When real subscriptions are added, you can choose how upgrades and downgrades work.",
                },
                {
                  question: "Are these prices final?",
                  answer:
                    "No. All prices and plan features on this page are mock examples and are not connected to payments.",
                },
              ].map((item) => (
                <article
                  key={item.question}
                  className="rounded-2xl border border-green-100 bg-white p-6"
                >
                  <h3 className="font-semibold">{item.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#64756B]">
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 py-16 text-center sm:py-20">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Start small. Achieve more.
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-[#52665A]">
            Give taskly a try and build a more organised day, one task at a time.
          </p>

          <Link
            href="/login"
            className="mt-7 inline-flex rounded-full bg-[#064E3B] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#052E16]"
          >
            Get started for free
          </Link>
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
            <Link href="/about" className="transition hover:text-green-800">
              About
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
