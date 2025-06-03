"use client";

import { Fragment, useState, useRef, useEffect, MutableRefObject } from "react";
import Link from "next/link";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type {
  SanityNavigationItem,
  SanityLink,
  SanitySlug,
} from "@/lib/sanity/types";

interface NavItemProps {
  item: SanityNavigationItem;
  className?: string;
  locale?: string;
}

// Type guard for reference links with expanded reference
interface ExpandedReference {
  _type: "reference";
  _ref: string;
  _weak?: boolean;
  slug: SanitySlug;
}

// Type guard for reference links
function isReferenceLink(
  link: SanityLink | undefined
): link is SanityLink & { reference: ExpandedReference } {
  return (
    !!link &&
    link.type === "reference" &&
    !!link.reference &&
    "slug" in link.reference
  );
}

// Type guard for URL links
function isUrlLink(
  link: SanityLink | undefined
): link is SanityLink & { url: string } {
  return !!link && link.type === "url" && typeof link.url === "string";
}

// Add a hook to handle menu positioning
function useMenuPosition(
  level: number,
  parentRef?: MutableRefObject<HTMLDivElement | null>
) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<"right" | "left">("right");

  useEffect(() => {
    const updatePosition = () => {
      if (!menuRef.current) return;

      const menuRect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const menuWidth = 224; // w-56 = 14rem = 224px

      // Calculate available space on both sides
      let spaceOnRight = viewportWidth - menuRect.left;
      let spaceOnLeft = menuRect.left;

      // If we have a parent menu, adjust the calculations
      if (parentRef?.current) {
        const parentRect = parentRef.current.getBoundingClientRect();
        if (level > 0) {
          // For nested menus, consider the parent's position
          spaceOnRight = viewportWidth - parentRect.right;
          spaceOnLeft = parentRect.left;
        }
      }

      // Add some padding to prevent menus from touching the viewport edge
      const padding = 16; // 1rem
      spaceOnRight -= padding;
      spaceOnLeft -= padding;

      // Calculate total width needed for nested menus
      const nestedMenuWidth = level < 2 ? menuWidth * (3 - level) : menuWidth;

      // Position the menu based on available space
      if (spaceOnRight < nestedMenuWidth && spaceOnLeft > spaceOnRight) {
        setPosition("left");
      } else {
        setPosition("right");
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [level, parentRef]);

  return { menuRef, position };
}

// New mega menu component
function MegaMenu({
  items,
  locale,
}: {
  items: NonNullable<SanityNavigationItem["children"]>;
  locale: string;
}) {
  // Organize items into sections
  const sections = items.reduce<{
    featured: SanityNavigationItem[];
    main: SanityNavigationItem[];
  }>(
    (acc, item) => {
      // First 2 items are featured
      if (acc.featured.length < 2) {
        acc.featured.push(item);
      } else {
        acc.main.push(item);
      }
      return acc;
    },
    { featured: [], main: [] }
  );

  return (
    <div className="w-full bg-white">
      {/* Top featured bar */}
      {sections.featured.length > 0 && (
        <div className="border-b border-gray-100 bg-[#f8f9fa]">
          <div className="mx-auto max-w-[1400px] px-4">
            <div className="grid grid-cols-2 gap-8 py-4">
              {sections.featured.map((item, index) => {
                const title =
                  item.title.find((t) => t.language === locale)?.value ||
                  item.title[0]?.value;
                const link =
                  item.link?.find((l) => l.language === locale)?.value ||
                  item.link?.[0]?.value;

                let href = "#";
                if (isReferenceLink(link)) {
                  href = `/${locale}/${link.reference.slug.current}`;
                } else if (isUrlLink(link)) {
                  href = link.url;
                }

                return (
                  <div key={index} className="flex items-center">
                    <Link
                      href={href}
                      className="group flex items-center text-[15px] font-medium text-[#1a1a1a] hover:text-[#0066cc]"
                    >
                      {title}
                      {item.children && item.children.length > 0 && (
                        <span className="ml-2 text-[#666] group-hover:text-[#0066cc]">
                          →
                        </span>
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main navigation grid */}
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="grid grid-cols-4 gap-8 py-8">
          {sections.main.map((item, index) => {
            const title =
              item.title.find((t) => t.language === locale)?.value ||
              item.title[0]?.value;
            const link =
              item.link?.find((l) => l.language === locale)?.value ||
              item.link?.[0]?.value;

            let href = "#";
            if (isReferenceLink(link)) {
              href = `/${locale}/${link.reference.slug.current}`;
            } else if (isUrlLink(link)) {
              href = link.url;
            }

            return (
              <div key={index} className="space-y-4">
                <Link
                  href={href}
                  className="block text-[15px] font-semibold text-[#1a1a1a] hover:text-[#0066cc]"
                >
                  {title}
                </Link>
                {item.children && item.children.length > 0 && (
                  <div className="space-y-3">
                    {item.children.map((child, childIndex) => {
                      const childTitle =
                        child.title.find((t) => t.language === locale)?.value ||
                        child.title[0]?.value;
                      const childLink =
                        child.link?.find((l) => l.language === locale)?.value ||
                        child.link?.[0]?.value;

                      let childHref = "#";
                      if (isReferenceLink(childLink)) {
                        childHref = `/${locale}/${childLink.reference.slug.current}`;
                      } else if (isUrlLink(childLink)) {
                        childHref = childLink.url;
                      }

                      return (
                        <div key={childIndex}>
                          <Link
                            href={childHref}
                            className="block text-[14px] text-[#666] hover:text-[#0066cc]"
                          >
                            {childTitle}
                          </Link>
                          {child.children && child.children.length > 0 && (
                            <div className="mt-2 space-y-1 pl-4">
                              {child.children.map(
                                (grandChild, grandChildIndex) => {
                                  const grandChildTitle =
                                    grandChild.title.find(
                                      (t) => t.language === locale
                                    )?.value || grandChild.title[0]?.value;
                                  const grandChildLink =
                                    grandChild.link?.find(
                                      (l) => l.language === locale
                                    )?.value || grandChild.link?.[0]?.value;

                                  let grandChildHref = "#";
                                  if (isReferenceLink(grandChildLink)) {
                                    grandChildHref = `/${locale}/${grandChildLink.reference.slug.current}`;
                                  } else if (isUrlLink(grandChildLink)) {
                                    grandChildHref = grandChildLink.url;
                                  }

                                  return (
                                    <Link
                                      key={grandChildIndex}
                                      href={grandChildHref}
                                      className="block text-[13px] text-[#666] hover:text-[#0066cc]"
                                    >
                                      {grandChildTitle}
                                    </Link>
                                  );
                                }
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function NavItem({ item, className, locale = "en" }: NavItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Get the localized title for the current language
  const title =
    item.title.find((t) => t.language === locale)?.value ||
    item.title[0]?.value;

  // Get the localized link for the current language
  const link =
    item.link?.find((l) => l.language === locale)?.value ||
    item.link?.[0]?.value;

  // If there's no link or children, render a simple span
  if (!link && !item.children?.length) {
    return (
      <span className={cn("text-[15px] font-medium text-[#1a1a1a]", className)}>
        {title}
      </span>
    );
  }

  // If there are no children, render a simple link
  if (!item.children?.length) {
    let href = "#";
    if (isReferenceLink(link)) {
      href = `/${locale}/${link.reference.slug.current}`;
    } else if (isUrlLink(link)) {
      href = link.url;
    }

    return (
      <Link
        href={href}
        className={cn(
          "text-[15px] font-medium text-[#1a1a1a] hover:text-[#0066cc]",
          className
        )}
      >
        {title}
      </Link>
    );
  }

  // If there are children, render the mega menu
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center">
        <Link
          href={
            isReferenceLink(link)
              ? `/${locale}/${link.reference.slug.current}`
              : isUrlLink(link)
              ? link.url
              : "#"
          }
          className={cn(
            "inline-flex items-center gap-1 text-[15px] font-medium text-[#1a1a1a] hover:text-[#0066cc]",
            isHovered && "text-[#0066cc]",
            className
          )}
        >
          {title}
        </Link>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200 text-[#666]",
            isHovered && "rotate-180 text-[#0066cc]"
          )}
          aria-hidden="true"
        />
      </div>

      {isHovered && (
        <div className="absolute left-0 right-0 z-50 mt-0">
          <div className="overflow-hidden border-t border-gray-100 bg-white shadow-lg">
            {item.children && (
              <MegaMenu
                items={
                  item.children as NonNullable<SanityNavigationItem["children"]>
                }
                locale={locale}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
