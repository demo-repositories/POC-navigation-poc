# Mock Server

A simple Express.js server with TypeScript that provides a hierarchical category structure and product data for POC products.

## Setup

1. Install dependencies:

```bash
cd server
yarn install
```

2. Start the development server:

```bash
yarn dev
```

The server will start on http://localhost:3001

## Category Structure

The server provides a hierarchical category structure for POC products with the following main categories:

- Cycling
- Snow
- Archive

Each category (except Archive) has its own subcategories for different product types (Helmets, Eyewear, Apparel, etc.), and many of these have further subcategories for gender-specific items (Women, Men) or age groups (Youth, Junior).

## Available Endpoints

### Health Check

- `GET /health` - Health check endpoint

### Categories

- `GET /api/categories` - Get all top-level categories
- `GET /api/categories/flat` - Get a flat list of all categories with level and path information
- `GET /api/categories/*` - Get a category by path (e.g., `/api/categories/cycling/road/road-helmets`)
- `GET /api/categories/*/subcategories` - Get subcategories of a category
- `GET /api/categories/*/path` - Get the full path to a category

### Products

- `GET /api/products` - Get all products
  - Query parameters:
    - `category`: Filter products by category path (e.g., `?category=cycling/road`)
    - `search`: Search in product names and descriptions (e.g., `?search=helmet`)
- `GET /api/products/:id` - Get a specific product by ID
- `GET /api/categories/*/products` - Get all products in a specific category

### Example Requests

```bash
# Get all top-level categories
curl http://localhost:3001/api/categories

# Get flat list of all categories
curl http://localhost:3001/api/categories/flat

# Get a specific category path
curl http://localhost:3001/api/categories/cycling/road/road-helmets

# Get subcategories of a category
curl http://localhost:3001/api/categories/cycling/road/subcategories

# Get the full path to a category
curl http://localhost:3001/api/categories/cycling/road/road-apparel/road-apparel-women/path

# Get all products
curl http://localhost:3001/api/products

# Get products in a specific category
curl http://localhost:3001/api/products?category=cycling/road

# Search for products
curl http://localhost:3001/api/products?search=helmet

# Get a specific product
curl http://localhost:3001/api/products/ventral-air-spin

# Get products in a category
curl http://localhost:3001/api/categories/cycling/road/road-helmets/products
```

### Example Responses

Flat categories response:

```json
[
  {
    "id": "cycling",
    "name": "Cycling",
    "description": "Cycling equipment and accessories",
    "level": 0,
    "path": ["cycling"],
    "fullPath": "cycling"
  },
  {
    "id": "road",
    "name": "Road",
    "description": "Road cycling equipment",
    "level": 1,
    "path": ["cycling", "road"],
    "fullPath": "cycling/road"
  },
  {
    "id": "road-helmets",
    "name": "Helmets",
    "description": "Road cycling helmets",
    "level": 2,
    "path": ["cycling", "road", "road-helmets"],
    "fullPath": "cycling/road/road-helmets"
  },
  {
    "id": "road-apparel-women",
    "name": "Women",
    "description": "Women's road cycling apparel",
    "level": 3,
    "path": ["cycling", "road", "road-apparel", "road-apparel-women"],
    "fullPath": "cycling/road/road-apparel/road-apparel-women"
  }
]
```

Category path response:

```json
{
  "id": "road-helmets",
  "name": "Helmets",
  "description": "Road cycling helmets"
}
```

Subcategories response:

```json
[
  {
    "id": "road-helmets",
    "name": "Helmets",
    "description": "Road cycling helmets"
  },
  {
    "id": "road-eyewear",
    "name": "Eyewear",
    "description": "Road cycling eyewear"
  }
]
```

Full path response:

```json
[
  {
    "id": "cycling",
    "name": "Cycling",
    "description": "Cycling equipment and accessories"
  },
  {
    "id": "road",
    "name": "Road",
    "description": "Road cycling equipment"
  },
  {
    "id": "road-apparel",
    "name": "Apparel",
    "description": "Road cycling apparel"
  },
  {
    "id": "road-apparel-women",
    "name": "Women",
    "description": "Women's road cycling apparel"
  }
]
```

Product response:

```json
{
  "id": "ventral-air-spin",
  "name": "Ventral Air Spin",
  "description": "The POC Ventral Air Spin is our most ventilated road cycling helmet...",
  "category": "cycling/road/road-helmets",
  "images": {
    "main": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
    "gallery": [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438"
    ]
  },
  "features": [
    "SPIN (Shearing Pad Inside) technology",
    "EPS liner with multi-directional impact protection system",
    "Optimized ventilation with 14 large vents",
    "Adjustable visor",
    "Removable and washable padding"
  ],
  "specifications": {
    "Weight": "290g (size M)",
    "Certification": "CE EN1078, CPSC, AS/NZS",
    "Construction": "In-mold polycarbonate shell with EPS liner"
  },
  "price": {
    "amount": 249.99,
    "currency": "USD"
  }
}
```

## Development

- `yarn dev` - Start the development server with hot reload
- `yarn build` - Build the TypeScript code
- `yarn start` - Start the production server

## Environment Variables

Create a `.env` file in the server directory to configure:

- `PORT` - Server port (default: 3001)
