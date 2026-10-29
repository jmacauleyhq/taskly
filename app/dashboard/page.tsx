"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Task = {
  id: number;
  title: string;
  category: string;
  completed: boolean;
};

const initialTasks: Task[] = [
  { id: 1, title: "Finish homepage design", category: "Design", completed: true },
  { id: 2, title: "Review project requirements", category: "Planning", completed: false },
  { id: 3, title: "Build responsive navbar", category: "Development", completed: false },
  { id: 4, title: "Plan the next sprint", category: "Planning", completed: false },
];

const navigation = [
  { name: "Dashboard", icon: "▦" },
  { name: "My Tasks", icon: "☑" },
  { name: "Completed", icon: "✓" },
  { name: "Settings", icon: "⚙" },
];

const categories = ["Development", "Design", "Planning", "Personal"];

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activePage, setActivePage] = useState("Dashboard");
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("Development");
  const [showForm, setShowForm] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Load saved tasks from the browser.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("taskly-tasks");

      if (saved) {
        const parsed: unknown = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setTasks(parsed as Task[]);
        }
      }
    } catch {
      // Keep the starter tasks if saved data cannot be read.
    }

    setLoaded(true);
  }, []);

  // Save changes after the initial load.
  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem("taskly-tasks", JSON.stringify(tasks));
    } catch {
      // The dashboard still works if browser storage is unavailable.
    }
  }, [tasks, loaded]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;
  const progress =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const visibleTasks = tasks.filter((task) => {
    if (activePage === "My Tasks") return !task.completed;
    if (activePage === "Completed") return task.completed;
    return true;
  });

  function toggleTask(id: number) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = newTask.trim();
    if (!title) return;

    setTasks((current) => [
      ...current,
      {
        id: Date.now(),
        title,
        category,
        completed: false,
      },
    ]);

    setNewTask("");
    setShowForm(false);
    setActivePage("My Tasks");
  }

  function deleteTask(id: number) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#F7FEE7] text-[#052E16] md:flex">
      {/* Sidebar */}
      <aside className="flex w-full shrink-0 flex-col border-b border-green-100 bg-white p-5 md:min-h-screen md:w-64 md:border-b-0 md:border-r md:p-6">
        <Link href="/" className="flex items-center gap-3">
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

        <p className="mb-3 mt-9 text-xs font-bold uppercase tracking-[0.16em] text-[#819087]">
          Workspace
        </p>

        <nav className="flex gap-2 overflow-x-auto md:flex-col">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => setActivePage(item.name)}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                activePage === item.name
                  ? "bg-[#DCFCE7] text-[#166534]"
                  : "text-[#64756B] hover:bg-green-50 hover:text-[#052E16]"
              }`}
            >
              <span className="w-5 text-center text-lg">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="mt-auto hidden rounded-2xl bg-[#F7FEE7] p-4 md:mt-10 md:block">
          <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-lg">
            ✨
          </div>
          <p className="text-sm font-bold">Keep going!</p>
          <p className="mt-1 text-xs leading-5 text-[#64756B]">
            Every completed task is a step forward.
          </p>
        </div>

        <a
          href="/"
          className="mt-5 hidden rounded-xl px-4 py-3 text-sm font-medium text-[#64756B] hover:bg-green-50 md:block"
        >
          ← Back to homepage
        </a>
      </aside>

      {/* Main content */}
      <section className="min-w-0 flex-1 px-5 py-7 sm:px-8 sm:py-9 lg:px-12">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[#64756B]">{today}</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {activePage === "Dashboard"
                ? "Your dashboard"
                : activePage}
            </h1>
            <p className="mt-2 text-sm text-[#64756B] sm:text-base">
              {activePage === "Completed"
                ? "Look at everything you've accomplished."
                : activePage === "Settings"
                  ? "Your workspace preferences."
                  : "A little progress goes a long way."}
            </p>
          </div>

          {activePage !== "Settings" && (
            <button
              onClick={() => setShowForm((current) => !current)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#064E3B] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#052E16]"
            >
              <span className="text-lg">+</span>
              Add task
            </button>
          )}
        </header>

        {/* Statistics */}
        {activePage !== "Settings" && (
          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-green-100 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-[#64756B]">
                  Total tasks
                </p>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-lg">
                  ☷
                </span>
              </div>
              <p className="mt-4 text-3xl font-bold">{totalCount}</p>
              <p className="mt-1 text-xs text-[#819087]">In your workspace</p>
            </div>

            <div className="rounded-2xl border border-green-100 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-[#64756B]">
                  Remaining
                </p>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-50 text-lg">
                  ◷
                </span>
              </div>
              <p className="mt-4 text-3xl font-bold">
                {totalCount - completedCount}
              </p>
              <p className="mt-1 text-xs text-[#819087]">Tasks to work on</p>
            </div>

            <div className="rounded-2xl border border-green-100 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-[#64756B]">
                  Completed
                </p>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#DCFCE7] text-lg text-green-800">
                  ✓
                </span>
              </div>
              <p className="mt-4 text-3xl font-bold">{completedCount}</p>
              <p className="mt-1 text-xs text-[#819087]">Tasks finished</p>
            </div>
          </div>
        )}

        {/* Progress */}
        {activePage !== "Settings" && (
          <div className="mt-5 rounded-2xl border border-green-100 bg-white p-5 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="font-bold">Your progress</h2>
                <p className="mt-1 text-sm text-[#64756B]">
                  You're making progress. Keep it up!
                </p>
              </div>
              <span className="text-2xl font-bold text-[#15803D]">
                {progress}%
              </span>
            </div>
            <div
              className="mt-5 h-2.5 overflow-hidden rounded-full bg-green-50"
              role="progressbar"
              aria-label="Task completion"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className="h-full rounded-full bg-[#22C55E] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Add task form */}
        {showForm && activePage !== "Settings" && (
          <form
            onSubmit={addTask}
            className="mt-5 rounded-2xl border border-green-200 bg-white p-5 sm:p-6"
          >
            <h2 className="font-bold">Create a task</h2>

            <label
              htmlFor="task-title"
              className="mb-2 mt-4 block text-sm font-medium"
            >
              Task name
            </label>
            <input
              id="task-title"
              autoFocus
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
              placeholder="What do you need to get done?"
              className="w-full rounded-xl border border-green-200 bg-[#FAFFF5] px-4 py-3 text-sm outline-none transition placeholder:text-[#94A399] focus:border-[#16A34A] focus:ring-2 focus:ring-green-100"
            />

            <label
              htmlFor="task-category"
              className="mb-2 mt-4 block text-sm font-medium"
            >
              Category
            </label>
            <select
              id="task-category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="w-full rounded-xl border border-green-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#16A34A] sm:max-w-xs"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-xl bg-[#064E3B] px-5 py-3 text-sm font-semibold text-white hover:bg-[#052E16]"
              >
                Create task
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setNewTask("");
                }}
                className="rounded-xl px-5 py-3 text-sm font-semibold text-[#64756B] hover:bg-green-50"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Task list */}
        {activePage !== "Settings" && (
          <div className="mt-9">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">
                  {activePage === "Completed"
                    ? "Completed tasks"
                    : activePage === "My Tasks"
                      ? "Tasks to do"
                      : "All tasks"}
                </h2>
                <p className="mt-1 text-sm text-[#64756B]">
                  {visibleTasks.length}{" "}
                  {visibleTasks.length === 1 ? "task" : "tasks"}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {visibleTasks.map((task) => (
                <article
                  key={task.id}
                  className="flex items-center gap-3 rounded-2xl border border-green-100 bg-white p-4 transition hover:border-green-200 sm:gap-4 sm:p-5"
                >
                  <button
                    type="button"
                    onClick={() => toggleTask(task.id)}
                    aria-label={
                      task.completed
                        ? `Mark ${task.title} incomplete`
                        : `Complete ${task.title}`
                    }
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border-2 transition ${
                      task.completed
                        ? "border-[#16A34A] bg-[#16A34A] text-white"
                        : "border-green-200 hover:border-[#16A34A]"
                    }`}
                  >
                    {task.completed && <span className="text-sm">✓</span>}
                  </button>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`break-words text-sm font-semibold sm:text-base ${
                        task.completed
                          ? "text-[#94A399] line-through"
                          : "text-[#052E16]"
                      }`}
                    >
                      {task.title}
                    </p>
                    <span className="mt-2 inline-flex rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-medium text-[#166534]">
                      {task.category}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    aria-label={`Delete ${task.title}`}
                    className="rounded-lg px-3 py-2 text-lg text-[#94A399] transition hover:bg-red-50 hover:text-red-600"
                  >
                    ×
                  </button>
                </article>
              ))}

              {visibleTasks.length === 0 && (
                <div className="rounded-2xl border border-dashed border-green-200 bg-white/60 px-5 py-12 text-center">
                  <div className="text-3xl">✓</div>
                  <h3 className="mt-3 font-bold">Nothing here just yet</h3>
                  <p className="mt-2 text-sm text-[#64756B]">
                    {activePage === "Completed"
                      ? "Complete a task and it will show up here."
                      : "Add a task to get started."}
                  </p>
                  {activePage !== "Completed" && (
                    <button
                      onClick={() => setShowForm(true)}
                      className="mt-4 text-sm font-semibold text-[#15803D] hover:underline"
                    >
                      + Add your first task
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings placeholder */}
        {activePage === "Settings" && (
          <div className="mt-9 rounded-2xl border border-green-100 bg-white p-6">
            <h2 className="text-lg font-bold">Workspace settings</h2>
            <p className="mt-2 text-sm leading-6 text-[#64756B]">
              This is your first prototype. Account settings, themes and
              profile options can be added when we build authentication.
            </p>
            <div className="mt-5 rounded-xl bg-[#F7FEE7] p-4 text-sm text-[#52665A]">
              Your tasks are currently saved in this browser only.
            </div>
          </div>
        )}

        <footer className="mt-12 border-t border-green-100 py-6 text-center text-xs text-[#819087]">
          Taskly · Make every task count.
        </footer>
      </section>
    </main>
  );
}
