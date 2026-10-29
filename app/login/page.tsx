
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    if (isSignup && password !== confirmPassword) {
      setMessage("Passwords do not match. Please try again.");
      return;
    }

    setLoading(true);

    const supabase = createClient();

    try {
      if (isSignup) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
          },
        });

        if (error) throw error;

        setMessage(
          data.session
            ? "Account created! You can now continue to your dashboard."
            : "Account created! Check your email to confirm your account."
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        router.push("/dashboard");
        return;
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const eyeIcon = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );

  const eyeOffIcon = (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path
        d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 5.2A10.8 10.8 0 0112 5c6.5 0 10 7 10 7a11.8 11.8 0 01-3.2 4.4M6.2 6.2C4.1 7.4 2.7 9.5 2 12c1.5 3 5 7 10 7 1 0 2-.2 2.9-.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7FEE7] px-5 py-12">
      {/* Decorative background shapes */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#D9F99D]/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-96 w-96 rounded-full bg-[#BBF7D0]/60 blur-3xl" />

      <div className="relative w-full max-w-[440px]">
        {/* Logo and brand */}
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-2.5"
        >
          <Image
            src="/taskly-logo.svg"
            alt="taskly logo"
            width={40}
            height={40}
            priority
          />
          <span className="text-2xl font-bold tracking-tight text-[#052E16]">
            taskly<span className="text-[#65A30D]">.</span>
          </span>
        </Link>

        {/* Login card */}
        <div className="rounded-3xl border border-white/80 bg-white/95 p-7 shadow-[0_20px_70px_-25px_rgba(6,78,59,0.22)] sm:p-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#064E3B]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                d="M19 12H5M12 19L5 12L12 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to home
          </Link>

          <div className="mt-8">
            <div className="mb-4 inline-flex items-center rounded-full border border-[#D9F99D] bg-[#F7FEE7] px-3 py-1 text-xs font-semibold tracking-wide text-[#3F6212]">
              YOUR DAY, ORGANISED
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[#052E16] sm:text-4xl">
              {isSignup ? "Create your account." : "Welcome back."}
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              {isSignup
                ? "Start organising your tasks and make every day count."
                : "Your tasks are waiting. Sign in and get things done."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-[#052E16]"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3.5 text-sm text-[#052E16] outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-[#65A30D] focus:bg-white focus:ring-4 focus:ring-lime-100"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-[#052E16]"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={
                    isSignup ? "new-password" : "current-password"
                  }
                  minLength={6}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3.5 pr-12 text-sm text-[#052E16] outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-[#65A30D] focus:bg-white focus:ring-4 focus:ring-lime-100"
                  placeholder="Enter your password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 transition hover:text-[#064E3B] focus:outline-none focus:text-[#064E3B]"
                >
                  {showPassword ? eyeOffIcon : eyeIcon}
                </button>
              </div>

              {isSignup && (
                <p className="mt-2 text-xs text-gray-400">
                  Use at least 6 characters.
                </p>
              )}
            </div>

            {/* Forgot password */}
            {!isSignup && (
              <div className="-mt-2 flex justify-end">
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-[#3F6212] transition hover:text-[#052E16] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            {/* Confirm password */}
            {isSignup && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-[#052E16]"
                >
                  Confirm password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    minLength={6}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3.5 pr-12 text-sm text-[#052E16] outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-[#65A30D] focus:bg-white focus:ring-4 focus:ring-lime-100"
                    placeholder="Re-enter your password"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    aria-pressed={showConfirmPassword}
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 transition hover:text-[#064E3B] focus:outline-none focus:text-[#064E3B]"
                  >
                    {showConfirmPassword ? eyeOffIcon : eyeIcon}
                  </button>
                </div>
              </div>
            )}

            {/* Status message */}
            {message && (
              <p
                role="status"
                aria-live="polite"
                className={`rounded-xl border p-3 text-sm leading-5 ${
                  message.includes("created!")
                    ? "border-green-200 bg-green-50 text-green-800"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {message}
              </p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#064E3B] px-4 py-3.5 text-sm font-semibold text-white shadow-md shadow-green-900/10 transition duration-200 hover:-translate-y-0.5 hover:bg-[#052E16] hover:shadow-lg hover:shadow-green-900/15 focus:outline-none focus:ring-4 focus:ring-green-200 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading
                ? "Please wait..."
                : isSignup
                  ? "Create account"
                  : "Log in to Taskly"}

              {!loading && (
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12H19M12 5L19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </form>

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-100" />
            <span className="text-xs font-medium text-gray-400">
              {isSignup ? "GET STARTED" : "NEW TO TASKLY?"}
            </span>
            <div className="h-px flex-1 bg-gray-100" />
          </div>

          <p className="text-center text-sm text-gray-500">
            {isSignup
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsSignup(!isSignup);
                setMessage("");
                setConfirmPassword("");
                setShowPassword(false);
                setShowConfirmPassword(false);
              }}
              className="font-semibold text-[#3F6212] transition hover:text-[#052E16] hover:underline"
            >
              {isSignup ? "Log in" : "Sign up for free"}
            </button>
          </p>
        </div>

        <p className="mt-6 text-center text-xs text-[#52705D]">
          Less clutter. More progress. All with Taskly.
        </p>
      </div>
    </main>
  );
}
