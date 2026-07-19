import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Michi",
  description: "The path. A Japanese learning app built on real learning science.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-neutral-900 antialiased">
        {children}
      </body>
    </html>
  );
}
