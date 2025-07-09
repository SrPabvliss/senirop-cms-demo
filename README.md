# 🏛️ Local Newspaper CMS

A demo Content Management System for article management with CRUD operations, search, and publishing controls.

## Live Demo

**[Try the Live Demo →](https://srpabvliss.github.io/senirop-cms-demo/)**

## Table of Contents

- [Quick Start](#-quick-start)
- [Architecture & Design Decisions](#️-architecture--design-decisions)
- [Development Guide](#-development-guide)
- [Testing Strategy](#-testing-strategy)
- [Deployment Guide](#-deployment-guide)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm

### Installation & Development

```bash
npm install
npm run dev        # Development mode
npm run dev:test   # Test environment
npm run build      # Production build
npm run preview
```

### Available Scripts

```bash
# Development
npm run dev                # Start development server
npm run dev:test           # Development with test environment data
npm run dev:production     # Development with production data
npm run dev:github-pages   # Development for GitHub Pages deployment

# Building
npm run build              # Build for production
npm run build:github-pages # Build for GitHub Pages deployment

# Preview
npm run preview            # Preview production build
npm run preview:github-pages # Preview GitHub Pages build

# Testing
npm run test               # Run unit tests (watch mode)
npm run test:run           # Run unit tests once
npm run test:ui            # Run tests with UI interface
npm run e2e                # Run E2E tests
npm run e2e:headed         # Run E2E tests with browser UI
npm run e2e:ui             # Run E2E tests with Playwright UI

# Code Quality
npm run lint               # Code linting
npm run lint:fix           # Fix linting issues automatically
npm run format             # Format code with Prettier
npm run format:check       # Check code formatting
```

## 🏗️ Architecture & Design Decisions

### Framework Selection: React + Vite

**Chosen over Next.js because:**

- No backend requirements
- Single-page application structure
- Lighter bundle size
- Faster development server
- No SSR/SEO needs

### Language Selection: TypeScript

**Chosen over JavaScript because:**

- **Static typing**: Catches errors at development time before execution
- **Enhanced IDE support**: Superior autocompletion and refactoring capabilities
- **Long-term maintainability**: Type safety reduces bugs and improves code evolution
- **Zero runtime overhead**: Compiles to JavaScript with minimal bundle impact
- **Team productivity**: Self-documenting code through type definitions

### React 19 Implementation

> **⚠️ Important Note**: This project uses **React 19** with the new compiler and runtime optimizations.

**Key implications:**

- **No manual optimization hooks needed**: React 19's compiler automatically optimizes components
- **Automatic memoization**: `useMemo`, `useCallback`, and `memo` are largely unnecessary
- **Built-in performance**: The new compiler handles re-rendering optimizations
- **Cleaner code**: Focus on business logic instead of performance micro-optimizations

**Why no `useMemo`/`useCallback`:**
React 19's compiler automatically identifies and optimizes expensive computations and callback functions, making manual memoization redundant in most cases.

### Architectural Patterns

- **Feature-Sliced Design**: Vertical slicing by business features
- **Screaming Architecture**: Entity-based names to easily find files
- **Implicit Atomic Design**: Component organization (atoms → molecules → organisms), the project doesn't implement explicit folder structure, but follows the development philosophy of atomic design

### State Management

- **Zustand + Persist**: Lightweight state management with localStorage
- **React Hook Form + Zod**: Form validation and handling
- **Environment-based data**: Different datasets per environment

### Key Dependencies

- **@mui/material**: Design system for consistent UI components and theming
- **zustand**: Lightweight state management (chosen over Redux for simplicity and performance)
- **react-hook-form + zod**: Best-in-class form handling with type-safe validation
- **@playwright/test**: Reliable E2E testing framework for user journey validation
- **vite**: Fast build tool with excellent development experience
- **uuid**: Reliable ID generation for client-side entity creation

## 💻 Development Guide

### Code Organization

```
src/
├── app/           # Application entry & routing
├── core/          # Infrastructure & configuration
├── features/      # Business features (vertical slicing)
└── shared/        # Reusable components & utilities
```

### Key Patterns

- **Container/Presenter**: Logic separation in features
- **Custom hooks**: Reusable business logic
- **Type-first**: TypeScript interfaces drive development

### Non-obvious Logic

- **Multi-environment imports**: Automatic data source switching
- **Dynamic base path**: GitHub Pages compatibility
- **Store persistence**: Environment-scoped localStorage
- **Form state management**: Dirty detection for save button

## 🧪 Testing Strategy

### Philosophy

- **Focus on business logic**: Store, hooks, services
- **Skip UI noise**: Component rendering tests avoided
- **E2E for user flows**: Complete user journeys tested

### Running Tests

```bash
npm run test          # Unit tests (watch mode)
npm run test:run      # Unit tests (single run)
npm run e2e           # E2E tests with Playwright
```

### Test Coverage

- **Unit Tests**: Store operations, filters, validation schemas
- **E2E Tests**: CRUD flows, search/filter, form validation
- **Skip**: Component snapshots, simple UI components

## 🚀 Deployment Guide

### Local Development

```bash
npm install
npm run dev           # Development with full dataset
npm run dev:test      # Test environment with test data
```

### Production Build

```bash
npm run build         # Creates dist/ folder
npm run preview       # Preview production build locally
```

### GitHub Pages (Automatic)

1. Push to `main` branch
2. GitHub Actions builds and deploys automatically
3. Available at: `https://srpabvliss.github.io/senirop-cms-demo/`

## 📁 Project Structure

### Core Architecture

```
src/
├── app/
│   ├── routes/              # React Router configuration
│   └── layout/              # Sidebar, navigation
├── core/
│   ├── config/              # Environment configuration
│   ├── helpers/             # Import utilities
│   ├── mock/                # JSON data files
│   └── theme/               # MUI theme configuration
├── features/
│   └── articles/
│       ├── data/            # Types, services, schemas
│       ├── presentation/    # Components, hooks, views
│       └── store/           # Zustand store
└── shared/
    ├── ui/                  # Reusable components
    ├── hooks/               # Generic hooks
    └── types/               # Shared types
```

### Data Flow

```
JSON File → ImportHelper → ArticleService → Store → Hook → Component
                                            ↓
                                       localStorage
```

## 🔧 Configuration

### Environment Modes

- **Development**: Full dataset (6 articles)
- **Test**: Test dataset (5 articles)
- **Production**: Minimal dataset (3 articles)

### Environment Variables

```bash
VITE_DEPLOY_TARGET=github-pages  # For GitHub Pages deployment
NODE_ENV=production              # For production builds
```

> **⚠️ Important Note**: No need to add an .env file, package json scripts handle environments as the scope of the project does not require that much configuration
