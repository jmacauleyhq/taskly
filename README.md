# Taskly – Get things done.

A modern, full-stack task management application designed to help users organise their workload, manage everyday tasks and stay productive.

![Taskly](public/taskly-logo.svg)

## Overview

Taskly is a productivity web application built with Next.js, React, TypeScript and Supabase.

The application provides users with a clean, intuitive dashboard where they can create, organise, update and complete tasks. It combines a minimal interface with secure user authentication and database integration to deliver a straightforward task management experience.

The project focuses on simplicity, usability and a consistent user experience across devices.

## Features

### Authentication
- User registration and login.
- Email and password authentication.
- Confirm password during registration.
- Forgot password functionality.
- Session management using Supabase.
- Protected dashboard access.

### Task Management
- Create new tasks.
- Edit existing tasks.
- Delete tasks.
- Mark tasks as completed.
- Organise tasks by category.
- Add task descriptions.
- View outstanding and completed tasks.

### Dashboard
- Overview of total tasks.
- Remaining task counter.
- Completed task counter.
- Task completion progress indicator.
- Dedicated views for all tasks and completed tasks.
- Personalised dashboard experience.

### User Experience
- Clean and minimal interface.
- Consistent green and lime colour palette.
- Responsive layout.
- Intuitive navigation.
- Empty states and user feedback.
- Reusable interface components.

## Screenshots

Add screenshots of your application here to showcase its interface.

Suggested screenshots:
- Landing page
- Login and registration
- Main dashboard
- Task creation interface
- Completed tasks

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16 | Full-stack React framework |
| React 19 | User interface |
| TypeScript | Static type checking |
| Tailwind CSS 4 | Styling |
| Supabase | Authentication and database |
| @supabase/ssr | Server-side authentication and session handling |
| ESLint | Code quality and linting |
| GitHub Actions | Automated CI workflow |

## Getting Started

Follow these instructions to run Taskly locally.

### Prerequisites

Make sure you have installed:

- Node.js 22 or later
- npm
- Git
- A Supabase account

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/taskly.git
```

### 2. Navigate into the project

```bash
cd taskly
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the root directory.

Add your Supabase project credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

You can find these values in your Supabase project dashboard.

**Important:** Never commit your `.env.local` file or expose secret service-role keys in your frontend code.

### 5. Configure Supabase

Taskly uses Supabase for authentication and persistent task storage.

You will need to:

1. Create a Supabase project.
2. Configure email authentication.
3. Create the `tasks` database table.
4. Configure Row Level Security (RLS).
5. Ensure users can only access and modify their own tasks.
6. Configure the appropriate authentication redirect URLs.

The tasks table should support the following fields:

| Column | Purpose |
|---|---|
| id | Unique task identifier |
| user_id | Owner of the task |
| title | Task title |
| description | Optional task description |
| category | Task category |
| is_completed | Completion status |
| created_at | Creation timestamp |

Make sure the database column types and policies match the application queries.

### 6. Start the development server

```bash
npm run dev
```

Open your browser and navigate to:

http://localhost:3000

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project Structure

```text
taskly/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── app/
│   ├── about/
│   │   └── page.tsx
│   │
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts
│   │
│   ├── components/
│   │   └── navbar.tsx
│   │
│   ├── dashboard/
│   │   └── page.tsx
│   │
│   ├── features/
│   │   └── page.tsx
│   │
│   ├── forgot-password/
│   │   └── page.tsx
│   │
│   ├── login/
│   │   └── page.tsx
│   │
│   ├── pricing/
│   │   └── page.tsx
│   │
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── lib/
│   └── supabase/
│       ├── client.ts
│       └── server.ts
│
├── public/
│   └── taskly-logo.svg
│
├── .gitignore
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── package-lock.json
├── proxy.ts
└── tsconfig.json
```

## Design Principles

Taskly is designed around five core principles.

- **Simplicity:** Keep the interface intuitive and easy to navigate.
- **Clarity:** Present important information without unnecessary clutter.
- **Consistency:** Maintain consistent styling, spacing and reusable components.
- **Accessibility:** Aim to make the application accessible and usable.
- **Responsiveness:** Provide a consistent experience across different screen sizes.

### Colour Palette

| Role | Colour |
|---|---|
| Primary text | `#052E16` |
| Primary background | `#F7FEE7` |
| Primary actions | `#064E3B` |
| Accent | `#DCFCE7` |
| Secondary text | `#64756B` |

## Continuous Integration

Taskly includes a GitHub Actions workflow that automatically checks changes pushed to the `main` branch and pull requests targeting it.

The workflow:

1. Checks out the repository.
2. Sets up Node.js 22.
3. Installs dependencies using `npm ci`.
4. Runs ESLint.
5. Creates a production build.

Supabase environment variables are supplied through GitHub Actions repository secrets.

## Future Improvements

Potential features and improvements include:

- Calendar and scheduling views.
- Task deadlines and reminders.
- Task priority levels.
- Advanced search and filtering.
- Productivity analytics.
- Improved mobile navigation.
- User profile customisation.
- Additional productivity tools.

## What I Learned

Building Taskly has helped me develop practical experience with:

- Building full-stack applications using Next.js.
- Creating reusable React components.
- Working with TypeScript.
- Implementing user authentication with Supabase.
- Connecting frontend applications to a database.
- Managing application state.
- Building responsive user interfaces.
- Using Git and GitHub for version control.
- Automating build and lint checks with GitHub Actions.

## Development Status

**Active development**

Taskly is an independently developed project. It was created to explore modern full-stack web development and build a practical productivity application.

## Contributing

Suggestions, feedback and improvements are welcome.

If you would like to contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Make your changes.
4. Test your changes locally.
5. Submit a pull request.

## Licence

Taskly is licensed under the [MIT Licence](LICENSE).

You are free to use, copy, modify, merge, publish, distribute, sublicense
and sell copies of the software, subject to the licence conditions.

## Author

GitHub: https://github.com/jmacauleyhq

---

*Built with Next.js, TypeScript and Supabase.*

**Taskly – Make every task count.**