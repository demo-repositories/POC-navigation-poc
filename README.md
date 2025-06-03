# POC Nav

A proof-of-concept navigation project demonstrating a modern e-commerce product catalog system built with Next.js, Express.js, and Sanity CMS.

## Overview

POC Nav is a monorepo showcasing a full-stack product catalog application with three main components:

- **Frontend**: Next.js 15 application with React 19 and Tailwind CSS
- **Server**: Express.js mock API server with TypeScript
- **Studio**: Sanity Content Management Studio

## Architecture

```
poc-nav/
├── frontend/          # Next.js application
├── server/           # Express.js API server
├── studio/           # Sanity CMS studio
├── package.json      # Root package.json with workspaces
└── turbo.json        # Turbo monorepo configuration
```

## Features

### Frontend Application

- **Product Catalog**: Grid layout displaying featured products
- **API Integration**: Connects to both mock server and Sanity CMS

### API Server

- **Hierarchical Categories**: Structured product categories (Cycling, Snow, Archive)
- **RESTful API**: Comprehensive endpoints for products and categories
- **Search & Filter**: Product search and category filtering
- **Mock Data**: Rich product data with images, features, and specifications

### Content Management

- **Sanity Studio**: Real-time content editing interface
- **Structured Content**: Product and category schema management

## Prerequisites

- **Node.js**: Latest LTS version (18.x or higher)
- **Yarn**: Package manager (v1.22.x)

## Getting Started

### 1. Install Dependencies

```bash
yarn install
```

This will install dependencies for all workspaces in the monorepo.

### 2. Start Development Servers

```bash
yarn dev
```

This command uses Turbo to start all three applications concurrently:

- **Frontend**: http://localhost:3000 (or next available port)
- **API Server**: http://localhost:3001
- **Sanity Studio**: http://localhost:3333 (or next available port)

### 3. Individual Development

You can also start each application individually:

```bash
# Frontend only
cd frontend && yarn dev

# Server only
cd server && yarn dev

# Studio only
cd studio && yarn dev
```

## API Endpoints

The mock server provides comprehensive REST endpoints:

### Categories

- `GET /api/categories` - All top-level categories
- `GET /api/categories/flat` - Flat list with hierarchy info
- `GET /api/categories/*` - Category by path
- `GET /api/categories/*/subcategories` - Category subcategories
- `GET /api/categories/*/products` - Products in category

### Products

- `GET /api/products` - All products
- `GET /api/products?category=path` - Filter by category
- `GET /api/products?search=term` - Search products
- `GET /api/products/:id` - Specific product

### Health Check

- `GET /health` - Server health status

## Environment Configuration

The project uses environment variables for configuration:

### Frontend (.env.local)

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

### Server (.env)

```bash
PORT=3001
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_TOKEN=your_write_token
```

### Studio (.env.local)

```bash
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

## Available Scripts

### Root Level

- `yarn dev` - Start all applications in development mode
- `yarn build` - Build all applications for production
- `yarn lint` - Run linting across all workspaces
- `yarn format` - Format code with Prettier

### Frontend

- `yarn dev` - Start Next.js development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn lint` - Run ESLint

### Server

- `yarn dev` - Start development server with hot reload
- `yarn build` - Compile TypeScript to JavaScript
- `yarn start` - Start production server
- `yarn import-to-sanity` - Import mock data to Sanity

### Studio

- `yarn dev` - Start Sanity Studio development server
- `yarn build` - Build studio for production
- `yarn deploy` - Deploy studio to Sanity

## Technology Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **next-intl** - Internationalization
- **Sanity Client** - Content management integration

### Server

- **Express.js** - Web application framework
- **TypeScript** - Type-safe backend development
- **CORS** - Cross-origin resource sharing
- **ts-node-dev** - Development server with hot reload

### Studio

- **Sanity** - Headless CMS platform
- **React** - UI framework for studio
- **Styled Components** - CSS-in-JS styling

### Development Tools

- **Turbo** - Monorepo build system
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Yarn Workspaces** - Package management

## Project Structure

```
frontend/
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # Reusable React components
│   └── lib/          # Utilities and API clients
├── public/           # Static assets
└── package.json      # Frontend dependencies

server/
├── src/
│   ├── data/         # Mock data and categories
│   ├── routes/       # API route handlers
│   └── index.ts      # Server entry point
├── scripts/          # Utility scripts
└── package.json      # Server dependencies

studio/
├── components/       # Custom studio components
├── schemaTypes/      # Content schemas
├── sanity.config.ts  # Studio configuration
└── package.json      # Studio dependencies
```

## Development Workflow

1. **Start Development**: Run `yarn dev` to start all services
2. **Frontend Development**: Edit files in `frontend/src/` - changes auto-reload
3. **API Development**: Edit files in `server/src/` - server auto-restarts
4. **Content Management**: Use Sanity Studio for content editing
5. **Build for Production**: Run `yarn build` to build all applications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is private and unlicensed.
