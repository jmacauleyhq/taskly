import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#F7FEE7]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/taskly-logo.svg"
            alt="Taskly logo"
            width={40}
            height={40}
            priority
          />
          <span className="text-2xl font-bold tracking-tight text-[#052E16]">
            Taskly
          </span>
        </Link>

        {/* Navigation links */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">
          <Link
            href="/"
            className="relative py-2 text-sm font-medium text-[#052E16] transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-[#052E16]"
          >
            Home
          </Link>

          <Link
            href="/features"
            className="py-2 text-sm font-medium text-[#365347] transition-colors hover:text-[#052E16]"
          >
            Features
          </Link>

          <Link
            href="/pricing"
            className="py-2 text-sm font-medium text-[#365347] transition-colors hover:text-[#052E16]"
          >
            Pricing
          </Link>

          <Link
            href="/about"
            className="py-2 text-sm font-medium text-[#365347] transition-colors hover:text-[#052E16]"
          >
            About
          </Link>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-6">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-[#365347] transition-colors hover:text-[#052E16] sm:inline-flex"
          >
            Log in
          </Link>

          <Link
            href="/signup"
            className="rounded-full bg-[#064E3B] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#052E16] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#064E3B]"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
}