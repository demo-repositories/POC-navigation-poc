import express, { Request } from "express";
import cors from "cors";
import { mockData, Category } from "./mock/data";
import { mockProducts, Product } from "./mock/products";

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Custom interface for wildcard parameters
interface WildcardParams {
  [key: string]: string;
  "0": string;
}

// Interface for flat category list
interface FlatCategory {
  id: string;
  name: string;
  description: string;
  level: number;
  path: string[];
  fullPath: string;
}

// Helper function to find category by path
const findCategoryByPath = (path: string[]): Category | null => {
  let current: Category | undefined = mockData.categories.find(
    (cat) => cat.id === path[0]
  );

  for (let i = 1; i < path.length && current; i++) {
    current = current.subcategories?.find((cat) => cat.id === path[i]);
  }

  return current || null;
};

// Helper function to flatten categories
const flattenCategories = (
  categories: Category[],
  level: number = 1,
  parentPath: string[] = []
): FlatCategory[] => {
  let result: FlatCategory[] = [];

  categories.forEach((category) => {
    const currentPath = [...parentPath, category.id];
    result.push({
      id: category.id,
      name: category.name,
      description: category.description,
      level,
      path: currentPath,
      fullPath: currentPath.join("/"),
    });

    if (category.subcategories) {
      result = result.concat(
        flattenCategories(category.subcategories, level + 1, currentPath)
      );
    }
  });

  return result;
};

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Get all categories as a flat list with level and path information
app.get("/api/categories/flat", (req, res) => {
  const flatCategories = flattenCategories(mockData.categories);
  res.json(flatCategories);
});

// Get all top-level categories
app.get("/api/categories", (req, res) => {
  const categories = mockData.categories.map(({ id, name, description }) => ({
    id,
    name,
    description,
  }));
  res.json(categories);
});

// Get category by path
app.get("/api/categories/*", (req: Request<WildcardParams>, res) => {
  const path = req.params[0].split("/");
  const category = findCategoryByPath(path);

  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }

  res.json(category);
});

// Get subcategories of a category
app.get(
  "/api/categories/*/subcategories",
  (req: Request<WildcardParams>, res) => {
    const path = req.params[0].split("/");
    const category = findCategoryByPath(path);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    if (!category.subcategories) {
      return res.json([]);
    }

    const subcategories = category.subcategories.map(
      ({ id, name, description }) => ({
        id,
        name,
        description,
      })
    );

    res.json(subcategories);
  }
);

// Get full category path
app.get("/api/categories/*/path", (req: Request<WildcardParams>, res) => {
  const path = req.params[0].split("/");
  const fullPath: Category[] = [];
  let current: Category | undefined = mockData.categories.find(
    (cat) => cat.id === path[0]
  );

  if (!current) {
    return res.status(404).json({ error: "Category not found" });
  }

  fullPath.push({
    id: current.id,
    name: current.name,
    description: current.description,
  });

  for (let i = 1; i < path.length; i++) {
    current = current.subcategories?.find((cat) => cat.id === path[i]);
    if (!current) {
      return res.status(404).json({ error: "Category not found" });
    }
    fullPath.push({
      id: current.id,
      name: current.name,
      description: current.description,
    });
  }

  res.json(fullPath);
});

// Get all products
app.get("/api/products", (req, res) => {
  const { category, search } = req.query;

  let products = [...mockProducts];

  // Filter by category if provided
  if (typeof category === "string") {
    products = products.filter((product) =>
      product.category.startsWith(category)
    );
  }

  // Search in name and description if search term provided
  if (typeof search === "string") {
    const searchLower = search.toLowerCase();
    products = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower)
    );
  }

  res.json(products);
});

// Get product by ID
app.get("/api/products/:id", (req: Request<{ id: string }>, res) => {
  const product = mockProducts.find((p) => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(product);
});

// Get products by category
app.get("/api/categories/*/products", (req: Request<WildcardParams>, res) => {
  const categoryPath = req.params[0];
  const products = mockProducts.filter(
    (product) => product.category === categoryPath
  );

  res.json(products);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
