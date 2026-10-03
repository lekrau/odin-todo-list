# Odin Todo List

## Project

Built as part of The Odin Project's JavaScript course:
[Project: Todo List](https://www.theodinproject.com/lessons/node-path-javascript-todo-list).

A basic todo app using JavaScript, allowing the user to organize todos into projects, update their attributes and persist changes in localStorage.

## Preview

[Live preview](https://lekrau.github.io/odin-todo-list/)

## Run locally

```bash
git clone https://github.com/lekrau/odin-todo-list.git
cd odin-todo-list
npm install
npm run dev
```

To build the project:

```bash
npm run build
```

## Deploy

GitHub Pages serves the contents of the remote `gh-pages` branch. The local
`gh-pages` branch is used to build the project and commit the generated `dist`
directory before its contents are pushed to GitHub.

After the finished changes have been merged into `main` and committed, run:

```bash
git switch gh-pages
git merge main --no-edit
npm run build
git add dist -f
git commit -m "Deployment commit"
npm run deploy
git switch main
```

The `-f` option adds `dist` despite it being listed in `.gitignore`. The deploy
script uses `git subtree` to push only the contents of `dist` to the root of the
remote `gh-pages` branch.

## What I practiced

- Structuring an application into separate responsibilities for domain/application
  logic, DOM rendering and persistence
- Applying OOP principles pragmatically with `App`, `Project` and `Todo` classes
  without introducing unnecessary abstractions
- Working with DOM events, including `this`, `bind()`, stable callback references and
  `event.target` vs. `event.currentTarget`
- Modeling DOM state explicitly using IDs and data-* attributes
  instead of coupling logic to CSS classes or DOM structure
- Persisting application state with `localStorage` and JSON and reconstructing
  class-based objects when loading stored data
- Modeling due dates as date-only values to avoid timezone-related bugs
- Installing and learning an external npm package (`date-fns`) from its
  documentation
- Using Webpack for development and production builds
- Managing scope deliberately by prioritizing required functionality and
  high-value refactoring over optional features
- Using AI-assisted code review while critically evaluating recommendations
  against project scope and learning goals

## Scope and limitations

As intended by TOP, the implementation of the app is rather basic. The visual design was intentionally kept simple, as the project's main focus was JavaScript application structure, OOP principles, persistence with localStorage/JSON and working with external npm packages.

## Potential enhancements
* Basic responsiveness
* Adding a "done" marker to todos
* Cross-project lists, e.g., All, Planned, Today, Done
* Reorder todos in list view using drag-and-drop
* Visually highlight overdue and/or today's todos