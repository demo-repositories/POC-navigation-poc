import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return [
    { locale: "en-gb" },
    { locale: "en-us" },
    { locale: "fr" },
    { locale: "de" },
  ];
}

export default function Layout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validate locale
  const validLocales = ["en-gb", "en-us", "fr", "de"];
  if (!validLocales.includes(locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <div className="min-h-screen bg-gray-50">
          <Header locale={locale} />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
