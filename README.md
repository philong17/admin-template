# React Admin Template

A modern, production-ready admin dashboard template built with React, TypeScript, Vite, Mantine UI v8, and TailwindCSS v4.

## Features

- **React 19** with TypeScript strict mode
- **Vite** for fast development and optimized builds
- **Mantine UI v8** component library
- **TailwindCSS v4** for utility-first styling
- **TanStack Query** for server state management
- **Zustand** for client state management
- **React Router v7** for routing
- **Zod** for schema validation
- **ESLint + Prettier** for code quality
- **JWT Authentication** with refresh token support
- **Responsive design** with mobile navigation

## Getting Started

### Prerequisites

- Node.js 18+ or Bun 1.0+
- Package manager: bun (recommended) or npm/yarn

### Installation

```bash
# Clone or use as template
npx degit your-username/react-admin-template my-project

# Install dependencies
cd my-project
bun install

# Copy environment file
cp .env.example .env

# Start development server
bun dev
```

### Environment Variables

Create a `.env` file with:

```env
VITE_PORT=3000
VITE_API_BASE_URL=http://localhost:8000/api
```

## Project Structure

```
src/
├── @types/          # TypeScript declarations
├── assets/          # Static assets (images, fonts)
├── config/          # App configuration (axios, dayjs, env)
├── features/        # Feature modules
│   └── login/       # Login feature
├── hooks/           # Custom React hooks
├── layouts/         # Layout components
├── pages/           # Page components
├── providers/       # React context providers
├── routes/          # Route definitions
├── services/        # API services
│   └── auth/        # Authentication service
├── shared/          # Shared components & icons
├── stores/          # Zustand stores
└── utils/           # Utilities, constants, helpers
```

## Available Scripts

```bash
bun dev           # Start development server
bun build         # Production build
bun typecheck     # Type checking
bun lint:fix      # Fix linting issues
bun prettier:fix  # Fix formatting
bun preview       # Preview production build
```

## Adding Features

### 1. Create a new feature

```
src/features/my-feature/
├── components/      # Feature components
├── schemas/         # Zod schemas
├── hooks/           # Feature-specific hooks
└── index.ts         # Barrel export
```

### 2. Add API service

```
src/services/my-feature/
├── my-feature.api.ts        # API functions
├── my-feature.query.ts      # TanStack Query hooks
├── my-feature.request.ts    # Request types
└── my-feature.response.ts   # Response types
```

### 3. Add routes

Edit `src/routes/index.tsx` and `src/utils/constants/route.constant.ts`

### 4. Add to sidebar

Edit `src/utils/constants/sideBar.constant.tsx`

## Code Conventions

- **Components**: PascalCase (`MyComponent.tsx`)
- **Hooks**: camelCase with `use` prefix (`useMyHook.ts`)
- **Types**: PascalCase with `REQ`/`RESP` suffix (`MyTypeREQ`, `MyTypeRESP`)
- **Path alias**: Use `@/` for imports from `src/`

## Before Committing

```bash
bun typecheck     # Must pass
bun lint:fix      # Fix all issues
bun prettier:fix  # Format code
bun build         # Verify production build
```

## Deployment

This template is configured for Cloudflare Pages deployment:

```bash
bun build         # Build for production
bun deploy        # Deploy to Cloudflare Pages
```

## License

MIT
