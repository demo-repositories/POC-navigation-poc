import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { sanityConfig } from "./config";
import type {
  SanityHeader,
  SanityCategory,
  SanityCategoryWithChildren,
} from "./types";
import {
  headerQuery,
  categoriesQuery,
  categoryBySlugQuery,
  categoryChildrenQuery,
  categoryPathQuery,
  productsQuery,
  productsByCategoryQuery,
  productBySlugQuery,
  searchProductsQuery,
} from "./queries";

// Create a Sanity client
export const client = createClient(sanityConfig);

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

// Helper function to generate image URLs
export function urlFor(source: any) {
  return builder.image(source);
}

// Header query
export async function getHeader({
  locale,
}: {
  locale: string;
}): Promise<SanityHeader> {
  return client.fetch(headerQuery, { key: locale });
}

// Category queries
export async function getCategories(): Promise<SanityCategoryWithChildren[]> {
  return client.fetch(categoriesQuery);
}

export async function getCategoryBySlug(
  slug: string
): Promise<SanityCategoryWithChildren> {
  return client.fetch(categoryBySlugQuery, { slug });
}

export async function getCategoryChildren(
  parentId: string
): Promise<SanityCategoryWithChildren[]> {
  return client.fetch(categoryChildrenQuery, { parentId });
}

// Product queries
export async function getProducts(params?: {
  category?: string;
  search?: string;
  limit?: number;
  offset?: number;
}) {
  const { category, search } = params || {};

  if (search) {
    return client.fetch(searchProductsQuery, {
      search: `*${search}*`,
    });
  }

  if (category) {
    return client.fetch(productsByCategoryQuery, {
      categorySlug: category,
    });
  }

  return client.fetch(productsQuery);
}

export async function getProductBySlug(slug: string) {
  return client.fetch(productBySlugQuery, { slug });
}

export async function getProductsByCategory(
  categorySlug: string,
  params?: {
    limit?: number;
    offset?: number;
  }
) {
  return client.fetch(productsByCategoryQuery, { categorySlug });
}

// Search products
export async function searchProducts(
  searchTerm: string,
  params?: {
    limit?: number;
    offset?: number;
  }
) {
  return client.fetch(searchProductsQuery, {
    search: `*${searchTerm}*`,
  });
}

// Get category path
export async function getCategoryPath(slug: string) {
  return client.fetch(categoryPathQuery, { slug });
}
