# Taskly

**Get things done.**

Taskly is a productivity web application designed to help users organise tasks, manage their time, and stay focused on what matters.

## Overview

Taskly aims to provide a clean, intuitive interface for managing everyday tasks and building better productivity habits.

## Features

- **Task Management** — Organise and track everyday tasks.
- **Simple Interface** — A clean, distraction-free user experience.
- **Responsive Design** — Designed to work across desktop, tablet, and mobile devices.
- **Productivity Focused** — Help users prioritise tasks and manage their time effectively.

*Features are planned and subject to implementation.*

## Tech Stack

- [Next.js](https://nextjs.org/) — React framework
- [React](https://react.dev/) — User interface library
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Tailwind CSS](https://tailwindcss.com/) — Styling

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (LTS recommended)
- npm
- Git (optional, for version control)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate into the project directory:

   ```bash
   cd taskly
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```text
taskly/
├── public/              # Static assets
├── src/
│   └── app/             # Application routes and pages
│       ├── components/  # Reusable UI components
│       ├── globals.css  # Global styles
│       ├── layout.tsx   # Root layout
│       └── page.tsx     # Homepage
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

*The structure above is an example and should be adjusted to match the actual repository.*

## Development

Run the local development server:

```bash
npm run dev
```

Build the application for production:

```bash
npm run build
```

Run the production server:

```bash
npm run start
```

Run linting if the corresponding script is configured:

```bash
npm run lint
```

## Design Principles

Taskly follows these core design principles:

- **Clarity** — Keep interfaces easy to understand.
- **Simplicity** — Avoid unnecessary visual clutter.
- **Consistency** — Use reusable components and consistent styling.
- **Accessibility** — Make the application usable by as many people as possible.
- **Responsiveness** — Provide a consistent experience across screen sizes.

### Colour Palette

| Role | Hex |
|---|---|
| Primary text | `#052E16` |
| Primary background | `#F7FEE7` |
| Primary actions | `#064E3B` |
| Accent | `#DCFCE7` |
| Secondary text | `#64756B` |

## Contributing

Contributions and suggestions are welcome.

1. Create a branch for your changes.
2. Keep changes focused and maintain consistent coding conventions.
3. Test your changes locally.
4. Submit a pull request describing your changes.

## Licence

No licence has been specified yet. Add a `LICENSE` file before distributing the project under an open-source licence.

## Status

**Development in progress.**

Taskly is currently being developed, with the initial focus on the landing page, reusable UI components, and responsive design.
