import type { Metadata } from "next";
import { Inter, Outfit, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: "Free Website Audit — Mutant Technologies",
  description:
    "Your website is costing you business. We rebuild slow, outdated websites into fast, secure, lead-generating machines in 30–45 days. Get your free audit now.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} ${poppins.variable} font-sans antialiased text-[#1a1a1a]`}>
        {children}
      </body>
    </html>
  );
}
