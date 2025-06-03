import { notFound } from "next/navigation";
import {
  getCategory,
  getCategoryProducts,
  getCategorySubcategories,
  getCategories,
  getProduct,
} from "@/lib/api";
import { ProductCard } from "@/components/product-card";
import { CategoryCard } from "@/components/category-card";
import { Breadcrumb } from "@/components/breadcrumb";

interface CategoryPageProps {
  params: {
    locale: string;
    slug: string[];
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = params;
  const categoryPath = slug.join("/");

  try {
    // Fetch category data, subcategories, and products in parallel
    const [category, subcategories, products] = await Promise.all([
      getCategory(categoryPath),
      getCategorySubcategories(categoryPath),
      getCategoryProducts(categoryPath),
    ]);
    console.log(category);
    const featuredProduct = await fetch(
      `http://localhost:3001/api/products/ventral-air-spin`
    ).then((res) => res.json());
    console.log(featuredProduct);

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumb categoryPath={categoryPath} />

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900">
            {category.name}
          </h1>
          {category.description && (
            <p className="text-lg text-gray-600 max-w-3xl mb-6">
              {category.description}
            </p>
          )}
          {category.content && (
            <div className="prose prose-lg max-w-3xl mb-8">
              {category.content?.map((block, index) => {
                switch (block._type) {
                  case 'feature':
                    return <div key={index} className="mb-6">
                      <h3 className="text-xl font-semibold mb-2">{block.title}</h3>
                      <p className="text-gray-600">{block.description}</p>
                    </div>;
                  case 'grid':
                    return <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                      {block.items?.map((item, itemIndex) => (
                        <div key={itemIndex} className="p-4 border rounded">
                          {item.title && <h4 className="font-medium mb-2">{item.title}</h4>}
                          {item.description && <p className="text-gray-600">{item.description}</p>}
                        </div>
                      ))}
                    </div>;
                  case 'textBlock':
                    return <div key={index} className="mb-6">
                      <div className="prose prose-lg">
                        {block.content}
                      </div>
                    </div>;
                  case 'cta':
                    return <div key={index} className="mb-6">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2">{block.title}</h3>
                        <p className="text-gray-600 mb-4">{block.description}</p>
                        {block.buttonText && block.buttonUrl && (
                          <a 
                            href={block.buttonUrl}
                            className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                          >
                            {block.buttonText}
                          </a>
                        )}
                      </div>
                    </div>;
                  case 'imageWithAlt':
                    return <div key={index} className="mb-6">
                      <img 
                        src={block.image.url} 
                        alt={block.alt || ''} 
                        className="w-full rounded-lg"
                      />
                    </div>;
                  case 'video':
                    return <div key={index} className="mb-6">
                      <div className="aspect-w-16 aspect-h-9">
                        <iframe
                          src={block.url}
                          title={block.title || 'Video'}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full rounded-lg"
                        />
                      </div>
                    </div>;
                  default:
                    return null;
                }
              })}
            </div>
          )}
          {featuredProduct && (
            <div className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-900">
                Featured Products
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <ProductCard
                  key={featuredProduct.id}
                  product={featuredProduct}
                />
              </div>
            </div>
          )}
        </div>

        {/* Subcategories Section */}
        {subcategories.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">
              Categories
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {subcategories.map((subcategory) => (
                <CategoryCard key={subcategory.id} category={subcategory} />
              ))}
            </div>
          </section>
        )}

        {/* Products Section */}
        <section>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              {products.length > 0 ? "Products" : "No Products Found"}
            </h2>
            {products.length > 0 && (
              <p className="text-sm text-gray-500">
                {products.length} product{products.length !== 1 ? "s" : ""}{" "}
                found
              </p>
            )}
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 text-6xl text-gray-300">📦</div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                No products in this category
              </h3>
              <p className="text-gray-500">
                Check back later or explore other categories.
              </p>
            </div>
          )}
        </section>
      </div>
    );
  } catch (error) {
    console.error("Error loading category:", error);
    notFound();
  }
}

// Generate static params for known categories (optional, for better performance)
export async function generateStaticParams() {
  try {
    const categories = await getCategories();
    return categories.map((category) => ({
      slug: category.fullPath.split("/"),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}
