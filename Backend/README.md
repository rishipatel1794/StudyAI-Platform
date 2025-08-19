# AI Learning App Backend

Backend service for the AI Learning App (ReactJS frontend). Provides user management, course content APIs, progress tracking, and AI assistant endpoints (planned).

## Tech Stack
- Node.js (>= 18)
- Express.js
- Database: MongoDB (or configure alternative)
- Authentication: JWT (planned)
- Tooling: TypeScript (if applicable), ESLint, Prettier, Nodemon
- Testing: Jest / Supertest (scaffold)

## Project Structure (proposed)
```
backend/
├─ src/
│  ├─ config/        # env, db connection
│  ├─ models/        # Mongoose (or ORM) schemas
│  ├─ routes/        # Express routers
│  ├─ controllers/   # Request handlers
│  ├─ services/      # Business logic
│  ├─ middleware/    # Auth, error handling
│  ├─ utils/         # Helpers
│  └─ app.js / server.js
├─ tests/
├─ .env.example
├─ package.json
└─ README.md
```

## Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Running MongoDB instance (local or cloud)

### Install
```
npm install
```

### Environment Variables (.env)
Copy `.env.example` to `.env` and fill:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ai_learning
JWT_SECRET=replace_with_strong_secret
LOG_LEVEL=info
```

### Development
```
npm run dev
```

### Production build (if TypeScript / build step)
```
npm run build
npm start
```

### Scripts (sample)
```
npm run dev      # Start with auto-reload
npm test         # Run tests
npm run lint     # Lint code
npm run format   # Prettier format
```

## API (initial plan)
| Domain        | Endpoints (planned)                 | Status |
|---------------|-------------------------------------|--------|
| Health        | GET /api/health                     | ✅     |
| Auth          | POST /api/auth/register, /login     | ⏳     |
| Users         | GET /api/users/me                   | ⏳     |
| Courses       | CRUD /api/courses                   | ⏳     |
| Progress      | GET /api/progress/:userId           | ⏳     |
| AI Assistant  | POST /api/ai/chat                   | ⏳     |

Legend: ✅ implemented, ⏳ pending

## Error Handling
Centralized error middleware returning JSON:
```
{
    "success": false,
    "message": "Resource not found"
}
```

## Logging
Use minimal console logging in dev. Consider winston/pino for prod.

## Testing (scaffold)
```
npm test
```
Add tests under `tests/` mirroring `src/` structure.

## Coding Standards
- ESLint + Prettier enforced on commit (configure husky + lint-staged if desired).
- Conventional Commits recommended:
    - feat:, fix:, docs:, refactor:, test:, chore:

## Deployment
1. Build (if needed)
2. Set environment variables
3. Run with process manager (PM2 / Docker)
4. Monitor logs & health endpoint

### Docker (optional skeleton)
```
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "dist/server.js"]
```

## Roadmap (next)
- Implement auth & refresh tokens
- Add rate limiting & CORS config
- Integrate AI inference service
- Add course content ingestion pipeline
- Add swagger / OpenAPI spec

## Contributing
PRs welcome. Open an issue first for significant changes.

## License
Add license (MIT or other) and replace this section.

---
Update this README as features are implemented to keep parity with code.