import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Linktre Clone",
  description: "A Linktree-style link-in-bio page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 antialiased">
        {children}
      </body>
    </html>
  );
}
