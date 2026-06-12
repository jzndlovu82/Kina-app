import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Kina — Where Stories Live",
  description:
    "Kina is a home for powerful stories — fiction, poetry, personal essays, folklore, and more. Read, discover, and submit your work.",
  openGraph: {
    title: "Kina — Where Stories Live",
    description: "A home for powerful stories from Africa and beyond.",
    siteName: "Kina",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-kina-parchment">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
