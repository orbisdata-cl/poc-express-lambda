# poc-express-lambda

POC: Express API deployed on AWS Lambda with automated AI code review via n8n.

## Setup

```bash
cp .env.example .env
npm install
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Run in production |
| `npm run dev` | Run with hot-reload (nodemon) |
| `npm test` | Run test suite |
| `npm run lint` | Run ESLint |

## Branching strategy

- `main` — production-ready code
- `develop` — integration branch
- `feature/us-XXX-*` — feature branches, PR to `develop`

## CI

Every PR to `develop` or `main` triggers:
1. Lint + tests via GitHub Actions
2. AI code review via n8n webhook
