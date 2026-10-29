
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = useMemo(() => createClient(), []);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setErrorMessage("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim(),
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

      if (error) {
        setErrorMessage(error.message);
        return;
      }

      setSubmitted(true);
      setMessage(
        "If an account exists for that email, you will receive a password reset link. Check your inbox and spam folder."
      );
    } catch {
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7FEE7] px-5 py-12 text-[#052E16]">
      <div className="w-full max-w-md rounded-3xl border border-[#BBF7D0] bg-white p-7 shadow-sm sm:p-10">
        <Link
          href="/"
          className="mb-8 flex items-center justify-center gap-3"
        >
          <Image
            src="/taskly-logo.svg"
            alt="Taskly logo"
            width={40}
            height={40}
            priority
          />
          <span className="text-2xl font-bold tracking-tight">
            Taskly<span className="text-[#16A34A]">.</span>
          </span>
        </Link>

        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#DCFCE7] text-2xl">
            🔐
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight">
            Forgot your password?
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#64756B]">
            No worries. Enter the email address associated with your
            account and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-8">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-[#86EFAC] bg-white px-4 py-3 text-sm outline-none transition placeholder:text-[#94A399] focus:border-[#16A34A] focus:ring-2 focus:ring-green-100"
            />

            {errorMessage && (
              <p
                role="alert"
                className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700"
              >
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-5 w-full rounded-xl bg-[#064E3B] px-5 py-3 font-semibold text-white transition hover:bg-[#052E16] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending link..." : "Send reset link"}
            </button>
          </form>
        ) : (
          <div
            role="status"
            className="mt-8 rounded-xl border border-[#BBF7D0] bg-[#DCFCE7] p-4 text-sm leading-6 text-[#166534]"
          >
            {message}
          </div>
        )}

        <p className="mt-7 text-center text-sm text-[#64756B]">
          Remember your password?{" "}
          <Link
            href="/login"
            className="font-semibold text-[#15803D] hover:underline"
          >
            Back to login
          </Link>
        </p>
      </div>
    </main>
  );
}
