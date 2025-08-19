# AI Learning App (ReactJS)

A React-based web application for interactive AI / ML learning modules.

## Current Status (Work Done So Far)
- Project initialized (React tooling configured: create-react-app or Vite)
- Base folder structure organized (src/components, pages, hooks, context, assets)
- Global styling system added (CSS Modules / Tailwind / Styled Components)  
- Routing configured (react-router-dom)
- Layout components (Navbar, Sidebar, Footer, MainContainer)
- Placeholder pages (Home, Courses, Lesson, Dashboard, NotFound)
- State management baseline (Context API / Redux Toolkit placeholder)
- API service layer scaffolded (axios/fetch wrapper)
- Environment variable loading (.env)
- Basic authentication flow scaffold (login form + token storage)
- Reusable UI components started (Button, Card, Loader, Modal)
- Error & loading boundaries added
- Linting & formatting (ESLint + Prettier)
- Git repository initialized with .gitignore
- Initial README and license scaffolding (this file)

(Adjust the list above to reflect the exact steps you actually completed.)

## Tech Stack
- React 18+
- React Router
- State: Context / Redux (choose one)
- HTTP: axios / fetch
- Styling: Tailwind / CSS Modules / Styled Components
- Tooling: Node.js, npm / yarn
- Optional: TypeScript (if enabled)

## Project Structure (Excerpt)
```
frontend/
    src/
        components/
        pages/
        hooks/
        context/
        services/
        assets/
        styles/
        App.jsx
        main.jsx
    public/
    package.json
```

## Getting Started
1. Clone repo  
2. Install dependencies: npm install  
3. Copy environment template: cp .env.example .env  
4. Start dev server: npm run dev (or npm start)  
5. Open: http://localhost:5173 or http://localhost:3000

## Available Scripts
- dev / start: Run development server
- build: Production build
- preview / serve: Preview build
- lint: Run ESLint
- format: Prettier formatting (if configured)
- test: Run tests (if added)

## Environment Variables (.env)
(Example – adjust to actual usage)
```
VITE_API_BASE_URL=https://api.example.com
VITE_AUTH_PROVIDER=local
```
Never commit real secrets.

## API Layer
- /src/services/http.js (axios instance)
- /src/services/endpoints.js (central route constants)
- Each feature: /src/services/{feature}Service.js

## State Management
- /src/context or /src/store
- Action naming: feature/actionName
- Keep derived data in selectors/hooks.

## Authentication (If Implemented)
- Login form posts credentials
- Stores token in memory or secure storage
- Attach token via interceptor
- Logout clears state + token

## Styling Guidelines
- One pattern only (avoid mixing)
- Components keep local styles
- Use design tokens (colors, spacing, typography)

## Testing (Planned / Partial)
- Unit: React Testing Library + Vitest / Jest
- Add tests under __tests__/ or *.test.jsx

## Code Quality
- ESLint extends recommended + react hooks
- Prettier for formatting
- Commit messages: type(scope): subject (Conventional Commits)

## Roadmap (Next Steps)
- Complete auth + protected routes
- Integrate real API
- Course / lesson data models
- Progress tracking & persistence
- Accessibility review
- Unit & integration tests
- Deployment pipeline

## Contributing
1. Fork & branch: feat/short-name
2. Run lint & tests before PR
3. Open PR with concise description

## License
Add LICENSE file (MIT or chosen license).

## Changelog
Maintain CHANGELOG.md once first release is cut.

## Notes
Replace placeholders with concrete details as the project evolves.

---
Feel free to request a tailored version if you provide exact steps already completed.