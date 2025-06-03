import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbProps {
  categoryPath: string;
  className?: string;
}

export function Breadcrumb({ categoryPath, className }: BreadcrumbProps) {
  const pathSegments = categoryPath.split("/").filter(Boolean);

  // Build breadcrumb items
  const breadcrumbItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
    },
    ...pathSegments.map((segment, index) => {
      const href = "/" + pathSegments.slice(0, index + 1).join("/");
      // Convert kebab-case to title case for display
      const name = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return {
        name,
        href,
      };
    }),
  ];

  return (
    <nav className={cn("mb-6", className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const Icon = item.icon;

          return (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
              )}

              {isLast ? (
                <span className="font-medium text-gray-900 flex items-center">
                  {Icon && <Icon className="h-4 w-4 mr-1" />}
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-500 hover:text-gray-700 transition-colors flex items-center"
                >
                  {Icon && <Icon className="h-4 w-4 mr-1" />}
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
