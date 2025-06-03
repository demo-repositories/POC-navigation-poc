import { groq } from "next-sanity";

// Define common fields that are used across multiple queries
const imageFields = groq`
  _type,
  asset->{
    _id,
    url,
    metadata {
      dimensions {
        width,
        height
      }
    }
  },
  alt
`;

const slugField = groq`"slug": slug.current`;

const internationalizedStringFields = groq`
  _type,
  value,
  _key
`;

const internationalizedLinkFields = groq`
  coalesce(link[_key == $key][0].value,link[_key == 'en'][0].value){
    type,
    "value": select(
      type == "url" => {
        "url": url,
        "title": title[] 
      },
      type == "reference" => {
        ...reference->{
          "url":slug.current,
          title
        }
      }
    )
  }
`;

const navigationItemFields = groq`
  _key,
  _type,
  visibility,
  "link": ${internationalizedLinkFields}
`;

// Define the header query
export const headerQuery = groq`
  *[_type == "header"][0] {
    _id,
    _type,
    logo {
      ${imageFields}
    },
    logoAlt,
    navigation[] {
      ${navigationItemFields},
      children[] {
        ${navigationItemFields},
        children[] {
          ${navigationItemFields},
          children[] {
            ${navigationItemFields}
          }
        }
      }
    }
  }
`;

// Define category fields with resolved children
const categoryFields = groq`
  _id,
  _type,
  title,
  "featuredProduct": "blah",
  featuredProducts,
  centraId,
  level,
  description,
  content,
  ${slugField},
  isActive
`;

const categoryWithChildrenFields = groq`
  ${categoryFields},
  "children": children[]->{
    ${categoryFields}
  }
`;

// Define the categories query
export const categoriesQuery = groq`
  *[_type == "category" && level == 1 && isActive == true] | order(title asc) {
    ${categoryWithChildrenFields}
  }
`;

// Define the category by slug query
export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug && isActive == true][0] {
    ${categoryWithChildrenFields}
  }
`;

// Define the category children query
export const categoryChildrenQuery = groq`
  *[_type == "category" && references($parentId) && isActive == true] | order(title asc) {
    ${categoryFields}
  }
`;

// Define the category path query
export const categoryPathQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    "path": array::reverse(
      array::append(
        array::append(
          array::append(
            [],
            { ${slugField}, "title": title }
          ),
          ^->parent->{ ${slugField}, "title": title }
        ),
        ^->parent->parent->{ ${slugField}, "title": title }
      )
    )
  }
`;

// Define product fields
const productFields = groq`
  _id,
  name,
  description,
  ${slugField},
  "category": category->{ 
    _id, 
    title, 
    ${slugField} 
  },
  images[]{
    ${imageFields}
  },
  features,
  specifications,
  price,
  isActive
`;

// Define the products query
export const productsQuery = groq`
  *[_type == "product" && isActive == true] | order(_createdAt desc) {
    ${productFields}
  }
`;

// Define the products by category query
export const productsByCategoryQuery = groq`
  *[_type == "product" && isActive == true && category->slug.current == $categorySlug] | order(_createdAt desc) {
    ${productFields}
  }
`;

// Define the product by slug query
export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug && isActive == true][0] {
    ${productFields}
  }
`;

// Define the search products query
export const searchProductsQuery = groq`
  *[_type == "product" && isActive == true && (name match $search || description match $search)] | order(_createdAt desc) {
    ${productFields}
  }
`;
