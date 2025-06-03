"use client";

import { Suspense, useEffect, useState } from "react";
import { getHeader } from "@/lib/sanity/client";
import type { SanityHeader } from "@/lib/sanity/types";
import { MainNavigation } from "../navigation";

interface HeaderContentProps {
  locale: string;
}

function HeaderContent({ locale }: HeaderContentProps) {
  const [header, setHeader] = useState<SanityHeader | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadHeader() {
      try {
        const data = await getHeader({ locale });
        console.log({ data });
        setHeader(data);
      } catch (error) {
        console.error("Failed to load header:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadHeader();
  }, []);

  if (isLoading || !header) {
    return <div className="h-16 animate-pulse bg-gray-100" />;
  }

  return (
    <div className="relative">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        {/* <div className="flex-shrink-0">
          {header.logo && (
            <img
              src={header.logo.asset.url}
              alt={header.logoAlt || "Logo"}
              className="h-8 w-auto"
            />
          )}
        </div> */}

        {/* Navigation */}
        <MainNavigation navigationData={header.navigation} />
      </div>
    </div>
  );
}

interface HeaderProps {
  locale: string;
}

export function Header({ locale }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <HeaderContent locale={locale} />
    </header>
  );
}
