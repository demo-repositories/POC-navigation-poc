import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/api";
import { cn, formatPrice, getImageUrl } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  console.log(product);
  return (
    <Link
      href={`/products/${product.id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border bg-white transition-all hover:shadow-lg",
        className
      )}
    >
      <div className="aspect-square w-full overflow-hidden bg-gray-100">
        <Image
          src={product.images.main}
          alt={product.name}
          width={500}
          height={500}
          className="h-full w-full object-cover object-center transition-transform group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        {product.price && (
          <p className="text-sm font-medium text-gray-900">
            {formatPrice(product.price.amount, product.price.currency)}
          </p>
        )}
      </div>
    </Link>
  );
}
