"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ];

  return (
    <nav className="w-full bg-[#F7FEE7]">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/taskly-logo.svg"
            alt="taskly logo"
            width={40}
            height={40}
            priority
          />
          <span className="text-2xl font-bold tracking-tight text-[#052E16]">
            taskly
          </span>
        </Link>

        {/* Navigation links */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative py-2 text-sm font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-left after:bg-[#052E16] after:transition-transform after:duration-200 ${
                  isActive
                    ? "text-[#052E16] after:scale-x-100"
                    : "text-[#365347] after:scale-x-0 hover:text-[#052E16] hover:after:scale-x-100"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
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
            href="/login"
            className="rounded-full bg-[#064E3B] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#052E16] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#064E3B]"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}