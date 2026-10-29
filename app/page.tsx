import Navbar from "./components/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7FEE7]">
        <section className="mx-auto flex max-w-7xl flex-col items-center px-12 pt-8 text-center">

          <h1 className="text-5xl font-bold leading-tight tracking-tight text-[#052E16] sm:text-5xl">
            Get things done.
          </h1>

          <h2 className="mt-8 text-5xl font-bold leading-tight tracking-tight text-[#22C55E] sm:text-5xl">
            One task at a time.
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-8 text-[#171717] sm:max-w-none sm:whitespace-nowrap sm:text-xl">
            Organise your tasks, stay focused and make progress every day with Taskly.
          </p>

          <Link
            href="/signup"
            className="mt-10 rounded-xl bg-[#22C55E] px-7 py-3.5 text-base font-semibold text-[#052E16] transition hover:bg-[#16A34A]"
          >
            Start Organising
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </section>
      </main>
    </>
  );
}
