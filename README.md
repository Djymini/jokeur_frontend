# Jokeur — Frontend

![CI Angular](https://github.com/Djymini/jokeur_frontend/actions/workflows/ci-angular.yml/badge.svg)

Web application for pet health tracking. Built as a team of 4 as part of a CDA certification (Application Designer Developer) at GRETA.

🌐 [jokeur.ashleydev.fr](https://jokeur.ashleydev.fr)

---

## Tech Stack

| Category | Tool |
|---|---|
| Framework | Angular 21 |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS 4.1 + shadcn |
| Charts | Chart.js 4.5 |
| Unit & Integration Tests | Jest 30 + jest-preset-angular |
| E2E Tests | Cypress 15.9 |
| Rendering | Angular SSR + Express |
| Code Quality | ESLint + Prettier + Husky |

## Features

- Authentication (sign up, login, forgot password)
- Dashboard with upcoming vaccine, treatment and appointment reminders
- Pet health record management (create, edit, delete)
- Vital signs tracking: weight, heart rate, respiratory rate, temperature
- Vaccines, treatments and symptoms logging over date ranges
- Reminder system for vaccines and treatments
- Vet appointment calendar
- RSS feed with domestic animal news
- Data export in PDF and Excel
- Account settings: password change, account deletion

## Requirements

- Node.js 20+
- npm

## Getting Started

```bash
git clone https://github.com/Djymini/jokeur_frontend.git
cd jokeur_frontend
npm install
ng serve
```

The app will be available at `http://localhost:4200`.

## Running Tests

```bash
# Unit tests
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests (requires the server to be running)
npm run cypress:ci
```

## Documentation

Component documentation is generated with Compodoc and Swagger.

```bash
npm run compodoc
```

---

## Contributors

Project built as a team of 4 as part of the CDA certification with Mawele, Yolain, Sarah and Ashley.


## Architecture

```

jokeur_frontend
├─ .husky/
├─ cypress/
├─ docker/
│  ├─ Dockerfile.production
│  └─ Dockerfile.staging
├─ nginx/
│  └─ nginx.conf
├─ scripts/
│  └─ husky-scripts/
├─ src/
│  ├─ app/
│  │  ├─ core/
│  │  │  ├─ interceptors/
│  │  │  ├─ layout/
│  │  │  ├─ models/
│  │  │  └─ services/
│  │  ├─ features/
│  │  │  ├─ appointment/
│  │  │  ├─ auth/
│  │  │  ├─ calendar/
│  │  │  ├─ dashboard/
│  │  │  ├─ health-record-export/
│  │  │  ├─ health-records/
│  │  │  ├─ landing-page/
│  │  │  ├─ measures/
│  │  │  ├─ reminders/
│  │  │  ├─ settings/
│  │  │  ├─ treatments/
│  │  │  └─ vaccines/
│  │  ├─ internal-shared/
│  │  ├─ router/
│  │  │  ├─ guards/
│  │  │  └─ resolvers/
│  │  └─ shared/
│  │     ├─ components/
│  │     └─ services/
│  ├─ environments/
│  │  ├─ environment.ts
│  │  ├─ environment.development.ts
│  │  ├─ environment.staging.ts
│  │  └─ environment.production.ts
│  └─ tests/
│     ├─ e2e/
│     ├─ integration/
│     └─ unit/
├─ angular.json
├─ package.json
└─ tsconfig.json

```
