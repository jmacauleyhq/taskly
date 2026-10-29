
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/taskly-logo.svg"
            alt="Taskly logo"
            width={40}
            height={40}
          />
          <span className="text-xl font-bold tracking-tight text-[#22C55E]">
            taskly
          </span>
        </Link>

        {/* Navigation links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 transition hover:text-[#16A34A]"
          >
            Home
          </Link>
          <Link
            href="/About"
            className="text-sm font-medium text-gray-700 transition hover:text-[#16A34A]"
          >
            About
          </Link>
          <Link
            href="/Pricing"
            className="text-sm font-medium text-gray-700 transition hover:text-[#16A34A]"
          >
            Pricing
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <Link
            href="/Login"
            className="text-sm font-medium text-gray-700 transition hover:text-[#16A34A]"
          >
            Log in
          </Link>

          <Link
            href="/Signup"
            className="rounded-xl bg-[#22C55E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#16A34A]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
