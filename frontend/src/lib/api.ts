import {
  getCategories as getSanityCategories,
  getCategoryBySlug,
  getCategoryChildren,
  getProducts as getSanityProducts,
  getProductBySlug,
  getProductsByCategory,
} from "@/lib/sanity/client";
import type { SanityCategoryWithChildren } from "@/lib/sanity/types";

// Updated interfaces to match Sanity data structure
export interface Category {
  id: string;
  name: string;
  description?: string;
  level: number;
  path: string[];
  fullPath: string;
  featuredProducts?: string;
  slug: string;
  children?: Category[];
  isActive: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  slug: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  images: {
    main: string;
    gallery?: string[];
  };
  features?: string[];
  specifications?: {
    [key: string]: string;
  };
  price?: {
    amount: number;
    currency: string;
  };
}

// Helper function to transform Sanity category to our Category interface
function transformSanityCategory(
  sanityCategory: SanityCategoryWithChildren,
  parentPath: string[] = []
): Category {
  const slug = sanityCategory.slug.current;
  const path = [...parentPath, slug];

  return {
    id: sanityCategory._id,
    name: sanityCategory.title,
    description: sanityCategory.description,
    level: sanityCategory.level,
    path,
    fullPath: path.join("/"),
    slug,
    content: sanityCategory.content,
    featuredProducts: sanityCategory.featuredProducts,
    children: sanityCategory.children?.map((child) =>
      transformSanityCategory(child, path)
    ),
    isActive: sanityCategory.isActive,
  };
}

// Helper function to transform Sanity product to our Product interface
function transformSanityProduct(sanityProduct: any): Product {
  return {
    id: sanityProduct._id,
    name: sanityProduct.name,
    description: sanityProduct.description,
    slug: sanityProduct.slug,
    category: sanityProduct.category
      ? {
          id: sanityProduct.category._id,
          name: sanityProduct.category.name || sanityProduct.category.title,
          slug: sanityProduct.category.slug,
        }
      : undefined,
    images: {
      main: sanityProduct.images?.[0]?.url || "",
      gallery: sanityProduct.images?.map((img: any) => img.url) || [],
    },
    features: sanityProduct.features,
    specifications: sanityProduct.specifications,
    price: sanityProduct.price,
  };
}

// Get all categories (flat structure for navigation)
export const getCategories = async (): Promise<Category[]> => {
  const sanityCategories = await getSanityCategories();

  // Flatten the hierarchical structure
  const flattenCategories = (
    categories: SanityCategoryWithChildren[],
    parentPath: string[] = []
  ): Category[] => {
    const result: Category[] = [];

    for (const category of categories) {
      const transformedCategory = transformSanityCategory(category, parentPath);
      result.push(transformedCategory);

      if (category.children) {
        result.push(
          ...flattenCategories(category.children, transformedCategory.path)
        );
      }
    }

    return result;
  };

  return flattenCategories(sanityCategories);
};

// Get a specific category by path
export const getCategory = async (path: string): Promise<Category> => {
  const slug = path;
  console.log(slug);
  const sanityCategory = await getCategoryBySlug(slug);

  if (!sanityCategory) {
    throw new Error(`Category not found: ${path}`);
  }

  // Build the path by traversing up the hierarchy
  const pathSegments = path.split("/");
  const parentPath = pathSegments.slice(0, -1);

  return transformSanityCategory(sanityCategory, parentPath);
};

// Get subcategories for a specific category
export const getCategorySubcategories = async (
  path: string
): Promise<Category[]> => {
  const slug = path.split("/").pop() || path;
  const sanityCategory = await getCategoryBySlug(slug);

  if (!sanityCategory || !sanityCategory.children) {
    return [];
  }

  const pathSegments = path.split("/");

  return sanityCategory.children.map((child) =>
    transformSanityCategory(child, pathSegments)
  );
};

// Get products for a specific category
export const getCategoryProducts = async (path: string): Promise<Product[]> => {
  const slug = path.split("/").pop() || path;
  const sanityProducts = await getProductsByCategory(slug);

  return sanityProducts.map(transformSanityProduct);
};

// Get all products with optional filters
export const getProducts = async (params?: {
  category?: string;
  search?: string;
}): Promise<Product[]> => {
  const sanityProducts = await getSanityProducts(params);
  return sanityProducts.map(transformSanityProduct);
};

// Get a specific product by ID or slug
export const getProduct = async (id: string): Promise<Product> => {
  const sanityProduct = await getProductBySlug(id);

  if (!sanityProduct) {
    throw new Error(`Product not found: ${id}`);
  }

  return transformSanityProduct(sanityProduct);
};



