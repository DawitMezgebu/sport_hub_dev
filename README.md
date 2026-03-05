# Tech Stack

- React
- TypeScript
- Vite
- TailwindCSS
- Lucide Icons
- React Router
- Animate.css

---

# Installation

Clone the repository:

```bash
git clone https://github.com/DawitMezgebu/sport_hub_dev.git
cd sport_hub_dev
```

Install dependencies:

```bash
pnpm install
```

If `pnpm` is not installed on your machine:

```bash
npm install -g pnpm
```

---

# Running the Project

Start the development server:

```bash
pnpm run dev
```

The project will run on:

```
http://localhost:5173
```

---

# Project Structure

```
src
├─ api
│  ├─ client.ts
│  └─ endpoints.ts
│
├─ assets
│
├─ components
│  ├─ match
│  ├─ fixtures
│  └─ TopNav.tsx
│
├─ hooks
│  ├─ useMatchDetails.ts
│  └─ useFixtures.ts
│
├─ mock
│  ├─ fixtures.sample.ts
│  └─ config
│     └─ env.ts
│
├─ pages
│  ├─ FixturesPage.tsx
│  └─ MatchPage.tsx
│
├─ routes
│
├─ styles
│  └─ globals.css
│
├─ utils
│
├─ NotFound.tsx
├─ UnderConstruction.tsx
├─ App.tsx
└─ main.tsx
```

---

# Data Source Configuration

The project supports **two data sources**: mock data and live API.

## Use Mock Data (Recommended for Development)

Edit the following file:

```
src/mock/config/env.ts
```

Set:

```ts
export const USE_MOCK_FIXTURES = true;
```

This will load local fixture sample data.

---

## Use Live API

Set the flag to:

```ts
export const USE_MOCK_FIXTURES = false;
```

The application will then request data from:

```
https://www.thesportsdb.com/api/v1/json/3/eventsnext.php?id=${leagueId}
```

---

# Global Styling

Global theme variables are defined in:

```
src/styles/globals.css
```

Example:

```css
:root {
  --bg: #141824;
  --card: #1d1e2b;
  --accent: #00ffa5;
  --danger: #ff4d4d;
  --yellow: #ffd400;
  --textColor: #0b0f17;
  --navbarbg: #6d00ff;
}
```

These variables ensure consistent colors and UI styling across the application.

---

# Build for Production

Create a production build:

```bash
pnpm run build
```

---
# Deployment

The project can be deployed easily using **Netlify**.

---

## Automatic Deployment (CI/CD)

This repository is connected to **Netlify Continuous Deployment**.

Whenever code is pushed to the repository, Netlify will automatically:

1. Install dependencies
2. Build the project
3. Deploy the latest version

### Deployment Workflow

```
Developer Push → GitHub Repository → Netlify Build → Live Website
```

No manual steps are required once Netlify is connected.

---

## Manual Deployment (Alternative)

If CI/CD is not configured, you can deploy manually.

Build the project:

```bash
pnpm run build
```

This generates the production build in the **dist/** folder.

Upload the `dist/` folder to Netlify.

---

## Live Preview

Once deployed, Netlify will provide a live URL such as:

```
https://sport-hub-dev.netlify.app/
```

# Author

**Dawit Mezgebu**
