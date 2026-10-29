
import Navbar from "./components/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F7FEE7]">
        <section className="mx-auto flex max-w-7xl flex-col items-center px-6 pt-8 text-center">

          <h1 className="text-5xl font-bold leading-tight tracking-tight text-[#052E16] sm:text-5xl">
            Get things done.
          </h1>

          <h2 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-[#22C55E] sm:text-5xl">
            One task at a time.
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-[#171717] sm:text-xl">
            Organise your tasks and stay focused with Taskly.
          </p>

          <Link
            href="/signup"
            className="mt-8 rounded-xl bg-[#22C55E] px-7 py-3.5 text-base font-semibold text-[#052E16] transition hover:bg-[#16A34A]"
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
