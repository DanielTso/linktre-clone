import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daniel Tso | Professional Showcase",
  description: "Construction PM, AI Engineering learner, and Linux enthusiast",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-dark-900 text-gray-100 antialiased">
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(20,184,166,0.08)_0%,_transparent_60%)]" />
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}
