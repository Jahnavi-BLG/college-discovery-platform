import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "CollegeFinder — Discover Your Dream College",
  description: "Search, compare and explore top engineering colleges across India.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-white border-b sticky top-0 z-50" style={{ borderColor: "var(--card-border)" }}>
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-display text-2xl font-bold" style={{ color: "var(--accent)" }}>
              College<span style={{ color: "var(--accent2)" }}>Finder</span>
            </Link>
            <div className="flex gap-8">
              {[
                { href: "/", label: "Home" },
                { href: "/colleges", label: "Browse" },
                { href: "/compare", label: "Compare" },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm font-medium transition-colors hover:text-[--accent]"
                  style={{ color: "var(--ink2)" }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        {children}

        <footer className="border-t py-8 text-center text-sm" style={{ borderColor: "var(--card-border)", color: "var(--ink3)" }}>
          Built with Next.js · Prisma · PostgreSQL
        </footer>
      </body>
    </html>
  );
}
