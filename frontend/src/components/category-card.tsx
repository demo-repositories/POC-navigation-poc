import Link from "next/link";
import { Category } from "@/lib/api";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface CategoryCardProps {
  category: Category;
  className?: string;
}

export function CategoryCard({ category, className }: CategoryCardProps) {
  return (
    <Link
      href={`/${category.fullPath}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-lg border bg-white p-6 transition-all hover:shadow-lg hover:border-gray-300",
        className
      )}
    >
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            {category.name}
          </h3>
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </div>

        {category.description && (
          <p className="text-sm text-gray-600 line-clamp-3 mb-4">
            {category.description}
          </p>
        )}

        <div className="mt-auto">
          <div className="flex items-center text-xs text-gray-500">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
              Level {category.level}
            </span>
            {category.path.length > 1 && (
              <span className="ml-2 truncate">
                {category.path.slice(0, -1).join(" › ")}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </Link>
  );
}
