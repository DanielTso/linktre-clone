import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Daniel Tso | Professional Showcase",
  description: "Construction PM, AI Engineering learner, and Linux enthusiast",
};

function ThemeBackground() {
  return (
    <>
      {/* Light theme gradient */}
      <div className="pointer-events-none fixed inset-0 bg-gradient-light dark:hidden" />
      {/* Dark theme radial gradient */}
      <div className="pointer-events-none fixed inset-0 hidden bg-dark-900 dark:block">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(20,184,166,0.08)_0%,_transparent_60%)]" />
      </div>
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased text-theme-primary">
        <ThemeProvider>
          <ThemeBackground />
          <ThemeToggle />
          <div className="relative">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
