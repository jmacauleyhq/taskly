"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

type Task = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  completed: boolean;
};

const navigation = [
  { name: "Dashboard", icon: "▦" },
  { name: "My Tasks", icon: "☑" },
  { name: "Completed", icon: "✓" },
  { name: "Settings", icon: "⚙" },
];

const categories = ["Development", "Design", "Planning", "Personal"];

export default function DashboardPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [newDescription, setNewDescription] = useState("");

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCategory, setEditCategory] = useState("Development");

  const [tasks, setTasks] = useState<Task[]>([]);
  const [activePage, setActivePage] = useState("Dashboard");
  const [newTask, setNewTask] = useState("");
  const [category, setCategory] = useState("Development");
  const [showForm, setShowForm] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [today, setToday] = useState("");

  // Load this user's tasks from Supabase.
  useEffect(() => {
    let cancelled = false;

    async function loadTasks() {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (cancelled) return;

      if (authError || !user) {
        router.replace("/login");
        return;
      }

      const { data, error } = await supabase
        .from("tasks")
        .select("id, title, description, category, is_completed")
        .order("created_at", { ascending: false });

      if (cancelled) return;

      if (error) {
        setErrorMessage(`Could not load tasks: ${error.message}`);
      } 
      else {
        setTasks(
          (data ?? []).map((task) => ({
            id: task.id,
            title: task.title,
            description: task.description,
            category: task.category,
            completed: task.is_completed,
          }))
        );
      }

      setLoaded(true);
    }

    void loadTasks();

    return () => {
      cancelled = true;
    };
  }, [router, supabase]);

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-GB", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;
  const progress =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  const visibleTasks = tasks.filter((task) => {
    if (activePage === "My Tasks") return !task.completed;
    if (activePage === "Completed") return task.completed;
    return true;
  });

  async function toggleTask(id: string) {
  const task = tasks.find((item) => item.id === id);
  if (!task) return;

  setErrorMessage("");

  const { error } = await supabase
    .from("tasks")
    .update({ is_completed: !task.completed })
    .eq("id", id);

  if (error) {
    setErrorMessage(`Could not update task: ${error.message}`);
    return;
  }

  setTasks((current) =>
    current.map((item) =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    )
  );
}

  async function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const title = newTask.trim();
    if (!title || saving) return;

    setSaving(true);
    setErrorMessage("");

    try {
      const { data, error } = await supabase
        .from("tasks")
        .insert({
          title,
          description: newDescription.trim() || null,
          category,
          is_completed: false,
        })
        .select("id, title, description, category, is_completed")
        .single();
      if (error) {
        setErrorMessage(`Could not create task: ${error.message}`);
        return;
      }

      setTasks((current) => [
        {
          id: data.id,
          title: data.title,
          description: data.description,
          category: data.category,
          completed: data.is_completed,
        },
        ...current,
      ]);

      setNewTask("");
      setNewDescription("");
      setShowForm(false);
      setActivePage("My Tasks");
    } finally {
      setSaving(false);
    }
  }

  async function deleteTask(id: string) {
    setErrorMessage("");

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (error) {
      setErrorMessage(`Could not delete task: ${error.message}`);
      return;
    }

    setTasks((current) => current.filter((task) => task.id !== id));
  }

  async function saveTaskEdit(id: string) {
    const title = editTitle.trim();

    if (!title) {
      setErrorMessage("Task title cannot be empty.");
      return;
    }

    setErrorMessage("");

    const { data, error } = await supabase
      .from("tasks")
      .update({
        title,
        description: editDescription.trim() || null,
        category: editCategory,
      })
      .eq("id", id)
      .select("id, title, description, category, is_completed")
      .single();

    if (error) {
      setErrorMessage(`Could not save changes: ${error.message}`);
      return;
    }

    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              id: data.id,
              title: data.title,
              description: data.description,
              category: data.category,
              completed: data.is_completed,
            }
          : task
      )
    );

    setEditingTaskId(null);
  }

  async function handleLogout() {
    setErrorMessage("");

    const { error } = await supabase.auth.signOut();

    if (error) {
      setErrorMessage(`Could not log out: ${error.message}`);
      return;
    }

    router.replace("/login");
    router.refresh();
  }
  
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
                  ? "bg-[#F7FEE7] text-[#166534]"
                  : "text-[#64756B] hover:bg-[#F7FEE7] hover:text-[#052E16]"
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

        <Link
          href="/"
          className="mt-5 hidden rounded-xl px-4 py-3 text-sm font-medium text-[#64756B] hover:bg-[#064E3B] md:block"
        >
          ← Back to homepage
        </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            <span className="w-5 text-center text-lg" aria-hidden="true">
              ↪
            </span>
            Log out
          </button>
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

        {errorMessage && (
          <div
            role="alert"
            className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            {errorMessage}
          </div>
        )}

        {/* Statistics */}
        {activePage !== "Settings" && (
          <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-green-100 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-[#64756B]">
                  Total tasks
                </p>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl [#064E3B] text-lg">
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
                  You&apos;re making progress. Keep it up!
                </p>
              </div>
              <span className="text-2xl font-bold text-[#064E3B]">
                {progress}%
              </span>
            </div>
            <div
              className="mt-5 h-2.5 overflow-hidden rounded-full [#064E3B]"
              role="progressbar"
              aria-label="Task completion"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className="h-full rounded-full bg-[#064E3B] transition-all duration-300"
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
            <label
              htmlFor="task-description"
              className="mb-2 mt-4 block text-sm font-medium"
            >
              Description (optional)
            </label>

            <textarea
              id="task-description"
              value={newDescription}
              onChange={(event) => setNewDescription(event.target.value)}
              placeholder="Add more details about this task..."
              rows={3}
              className="w-full resize-y rounded-xl border border-green-200 bg-[#FAFFF5] px-4 py-3 text-sm outline-none transition placeholder:text-[#94A399] focus:border-[#16A34A] focus:ring-2 focus:ring-green-100"
            />            
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={saving}
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
                className="rounded-xl px-5 py-3 text-sm font-semibold text-[#64756B] hover:bg-[#064E3B]"
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
              {!loaded && (
                <p className="py-6 text-sm text-[#64756B]">
                  Loading your tasks...
                </p>
              )}              
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
                        ? "border-[#064E3B] bg-[#064E3B] text-white"
                        : "border-green-200 hover:border-[#064E3B]"
                    }`}
                  >
                    {task.completed && <span className="text-sm">✓</span>}
                  </button>     
                  <div className="min-w-0 flex-1">
                    {editingTaskId === task.id ? (
                      <div className="space-y-3">
                        <label className="block text-sm font-medium">
                          Task title
                          <input
                            value={editTitle}
                            onChange={(event) => setEditTitle(event.target.value)}
                            className="mt-1 w-full rounded-lg border border-green-200 px-3 py-2 text-sm outline-none focus:border-green-500"
                            maxLength={200}
                            required
                          />
                        </label>

                        <label className="block text-sm font-medium">
                          Description
                          <textarea
                            value={editDescription}
                            onChange={(event) => setEditDescription(event.target.value)}
                            placeholder="Add task details..."
                            rows={3}
                            className="mt-1 w-full resize-y rounded-lg border border-green-200 px-3 py-2 text-sm outline-none focus:border-green-500"
                          />
                        </label>

                        <label className="block text-sm font-medium">
                          Category
                          <select
                            value={editCategory}
                            onChange={(event) => setEditCategory(event.target.value)}
                            className="mt-1 w-full rounded-lg border border-green-200 bg-white px-3 py-2 text-sm sm:max-w-xs"
                          >
                            {categories.map((item) => (
                              <option key={item} value={item}>
                                {item}
                              </option>
                            ))}
                          </select>
                        </label>

                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => saveTaskEdit(task.id)}
                            className="rounded-lg bg-[#064E3B] px-4 py-2 text-sm font-semibold text-white hover:bg-[#052E16]"
                          >
                            Save changes
                          </button>

                          <button
                            type="button"
                            onClick={() => setEditingTaskId(null)}
                            className="rounded-lg px-4 py-2 text-sm font-semibold text-[#64756B] hover:bg-[#064E3B]"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p
                          className={`break-words text-sm font-semibold sm:text-base ${
                            task.completed
                              ? "text-[#94A399] line-through"
                              : "text-[#052E16]"
                          }`}
                        >
                          {task.title}
                        </p>

                        {task.description && (
                          <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-[#64756B]">
                            {task.description}
                          </p>
                        )}

                        <span className="mt-2 inline-flex rounded-full bg-[#DCFCE7] px-3 py-1 text-xs font-medium text-[#166534]">
                          {task.category}
                        </span>
                      </>
                    )}
                  </div>

                  {editingTaskId !== task.id && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingTaskId(task.id);
                        setEditTitle(task.title);
                        setEditDescription(task.description ?? "");
                        setEditCategory(task.category);
                        setErrorMessage("");
                      }}
                      aria-label={`Edit ${task.title}`}
                      className="rounded-lg px-3 py-2 text-sm font-semibold text-[#94A399] transition hover:text-[#064E3B]"
                    >
                      Edit
                    </button>
                  )}       
                            
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

              {loaded && visibleTasks.length === 0 && (
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
