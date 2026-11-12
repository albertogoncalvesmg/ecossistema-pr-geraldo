import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pastor Geraldo Afonso | Ecossistema Digital",
  description: "Portal Oficial e Central Ministerial do Pastor Geraldo Afonso.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased bg-ga-ivory text-ga-navy min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}