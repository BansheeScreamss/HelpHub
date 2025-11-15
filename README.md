# HelpHub — Frontend Documentation

This document describes the frontend only (no backend details). The frontend is a React app built with Vite and contains UI, routing, styles, and small client-side behaviors.

## Quick start

- Open a terminal in the Frontend folder:
  - npm install
  - npm run dev
- Build for production:
  - npm run build
  - npm run preview

## Project entry points

- Vite config: Frontend/vite.config.js
- Host page: Frontend/index.html
- React bootstrap: Frontend/src/main.jsx → renders App (Frontend/src/App.jsx)
- Global styles: Frontend/src/index.css and Frontend/src/App.css

## Folder structure (frontend-only)

- Frontend/
  - package.json — scripts and dependencies
  - vite.config.js
  - index.html
  - src/
    - main.jsx
    - App.jsx
    - index.css, App.css
    - assets/ — images and static assets
    - Pages/ — page-level components and features
      - Admin/ (Dashboard, Department UI)
      - Auth/ (Login/Signup)
      - Requester/ (Requester UI)
      - Ticket/ (Create ticket UI)

## Routing

Routes are configured in App.jsx. Common routes:

- / → Admin dashboard shell
- /auth → Authentication (login/signup)
- /create-ticket → Create ticket form
- /department → Department management

## Major components and responsibilities

- Dashboard shell: manages layout, sidebar toggle; composes Header, Sidebar, Home.
- Header / RequesterHeader: top bar with search and action icons.
- Sidebar: navigation and ticket menu.
- Home: dashboard cards and charts (uses recharts).
- Department: client-side CRUD UI and staff chips.
- Auth: login/signup toggle UI and static assets.
- CreateTicket: controlled form with local state and submit handler.

## Styling

- Component-scoped CSS files co-located with components (e.g., AdminDashboard.css, Department.css, Auth.css, Ticket.css).
- Global styles in index.css and App.css.
- Follow the existing pattern when adding new components: add a CSS file next to the component and import it from that component.

## Tooling & linting

- ESLint config in Frontend/eslint.config.js
- Lint script: npm run lint (see Frontend/package.json)
- Dev server and build via Vite scripts in package.json

## Notable dependencies

- react, react-dom
- react-router-dom (routing)
- react-icons (icons)
- recharts (charts)

## Development notes & best practices

- Start the dev server from the Frontend folder: npm run dev
- Keep component state local; introduce a service layer or hooks for API calls.
- Reuse shared styles and components for consistent UI.
- Add unit tests and Storybook if components require isolated visual testing.
- Consider migrating to TypeScript for stronger type-safety before production.

## How to extend

- Add new route: update App.jsx and create corresponding page under src/Pages/.
- Add shared UI: create a components/ folder under src/ and import across pages.
- Integrate API: create src/services/api.js (or hooks) and call from pages/components.

## Where to look first

- Frontend/src/main.jsx — app bootstrap
- Frontend/src/App.jsx — routing and layout
- Frontend/src/Pages/ — page implementations
- Frontend/src/index.css & App.css — global styles
