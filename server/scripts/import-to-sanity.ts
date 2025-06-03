import { createClient } from "@sanity/client";
import axios from "axios";
import { randomUUID } from "crypto";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

console.log(process.env.SANITY_PROJECT_ID);
console.log(process.env.SANITY_DATASET);
console.log(process.env.SANITY_TOKEN);

// Sanity client configuration
const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2024-03-19", // Use today's date or your preferred version
  token: process.env.SANITY_TOKEN, // Token with write access
  useCdn: false,
});

interface FlatCategory {
  id: string;
  name: string;
  description: string;
  level: number;
  path: string[];
  fullPath: string;
}

// Helper function to group categories by their parent
const groupCategoriesByParent = (categories: FlatCategory[]) => {
  const grouped: { [key: string]: FlatCategory[] } = {};

  categories.forEach((category) => {
    const parentPath = category.path.slice(0, -1);
    const parentId =
      parentPath.length > 0 ? parentPath[parentPath.length - 1] : "root";

    if (!grouped[parentId]) {
      grouped[parentId] = [];
    }
    grouped[parentId].push(category);
  });

  return grouped;
};

// Transform flat category to Sanity document
const transformToSanityDocument = (
  category: FlatCategory,
  children: FlatCategory[] = []
) => ({
  _type: "category",
  _id: category.id,
  centraId: category.id,
  title: category.name,
  description: category.description,
  level: category.level,
  // path: category.path,
  slug: {
    current: category.fullPath,
  },
  // Add references to child categories
  children:
    children.length > 0
      ? children.map((child) => ({
          _key: randomUUID(),
          _type: "reference",
          _ref: child.id,
        }))
      : undefined,
});

async function importCategories() {
  try {
    // Fetch categories from mock server
    const response = await axios.get<FlatCategory[]>(
      "http://localhost:3001/api/categories/flat"
    );
    const categories = response.data;

    console.log(`Found ${categories.length} categories to import`);

    // Group categories by their parent
    const groupedCategories = groupCategoriesByParent(categories);

    // Create a transaction for all operations
    const transaction = sanityClient.transaction();

    // Process categories in order of their level to ensure parents exist before children
    const sortedCategories = categories.sort((a, b) => a.level - b.level);

    // Add all categories to the transaction
    sortedCategories.forEach((category) => {
      const children = groupedCategories[category.id] || [];
      const sanityDoc = transformToSanityDocument(category, children);
      transaction.createIfNotExists(sanityDoc);
    });

    // Commit the transaction
    const result = await transaction.commit();
    console.log("Successfully imported categories to Sanity");
    console.log("Transaction ID:", result.transactionId);
  } catch (error) {
    console.error("Error importing categories:", error);
    process.exit(1);
  }
}

// Run the import
importCategories();
