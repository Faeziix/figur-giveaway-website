import type { Metadata } from "next";
import { fraunces, jakarta, caveat } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Figur — A Gift From Figur",
  description: "Enter the Figur giveaway. Journey through the Solar Fig universe and claim your prize.",
  openGraph: {
    title: "Figur — A Gift From Figur",
    description: "Enter the Figur giveaway. Journey through the Solar Fig universe and claim your prize.",
    siteName: "Figur",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${jakarta.variable} ${caveat.variable} h-full`}
    >
      <body className="min-h-dvh flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
