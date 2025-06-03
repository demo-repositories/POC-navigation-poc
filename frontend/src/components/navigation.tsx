"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  item: any;
  level: number;
  isLast?: boolean;
}

export function MainNavigation({ navigationData }: { navigationData: any }) {
  console.log(navigationData);
  return (
    <nav className="flex gap-1">
      {navigationData.map((item) => (
        <NavItem key={item._key} item={item} level={1} />
      ))}
    </nav>
  );
}

const NavItem: React.FC<NavItemProps> = ({ item, level, isLast }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState<any>(null);
  const hasChildren = item.children && item.children.length > 0;
  const isActive = pathname === item.link.value.url;
  const navRef = React.useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    } else if (e.key === "ArrowDown" && hasChildren) {
      e.preventDefault();
      setIsOpen(true);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Level 1 (Top level navigation)
  if (level === 1) {
    return (
      <div
        ref={navRef}
        className="relative"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onKeyDown={handleKeyDown}
      >
        {item.link.value.url ? (
          // <Button
          //   variant={isActive ? "default" : "ghost"}
          //   className={cn("flex items-center gap-1 px-4 py-2")}
          //   asChild
          // >
          <Link href={item.link.value.url}>
            {item.link.value.title}
            {hasChildren && (
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            )}
          </Link>
        ) : (
          // </Button>
          <Button
            variant={isActive ? "default" : "ghost"}
            className={cn("flex items-center gap-1 px-4 py-2")}
            aria-expanded={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          >
            {item.link.value.title}
            {hasChildren && (
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  isOpen && "rotate-180"
                )}
              />
            )}
          </Button>
        )}

        {isOpen && hasChildren && (
          <div className="absolute left-0 top-full z-50 mt-0 w-64 animate-in fade-in-10 slide-in-from-top-5 rounded-md border bg-background shadow-md">
            <div className="p-2">
              {item.children.map((subItem: any, index: number) => (
                <NavItem
                  key={subItem._key}
                  item={subItem}
                  level={2}
                  isLast={index === item.children.length - 1}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Level 2, 3, and 4 (Dropdown items)
  const handleMouseEnter = () => {
    setActiveItem(item);
  };

  const handleMouseLeave = () => {
    setActiveItem(null);
  };

  return (
    <div
      className={cn("relative", !isLast && level === 2 && "mb-1")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {item.link.value.url ? (
        <Link
          href={item.link.value.url}
          className={cn(
            "flex items-center justify-between rounded-md px-3 py-2 text-sm",
            isActive
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground",
            level > 2 && "pl-5",
            level > 3 && "pl-7"
          )}
        >
          <span>{item.link.value.title}</span>
          {hasChildren && <ChevronDown className="h-4 w-4 -rotate-90" />}
        </Link>
      ) : (
        <div
          className={cn(
            "flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm",
            activeItem === item
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground",
            level > 2 && "pl-5",
            level > 3 && "pl-7"
          )}
        >
          <span>{item.link.value.title}</span>
          {hasChildren && <ChevronDown className="h-4 w-4 -rotate-90" />}
        </div>
      )}

      {activeItem === item && hasChildren && (
        <div className="absolute left-full top-0 z-50 w-64 animate-in fade-in-10 slide-in-from-left-5 rounded-md border bg-background shadow-md">
          <div className="p-2">
            {item.children.map((subItem: any, index: number) => (
              <NavItem
                key={subItem._key}
                item={subItem}
                level={level + 1}
                isLast={index === item.children.length - 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
