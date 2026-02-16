import type { Metadata } from "next";
import { Inter, Outfit, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const poppins = Poppins({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800", "900"], variable: "--font-poppins" });

export const metadata: Metadata = {
  title: "Mutant Technologies | Digital Marketing Agency",
  description: "Shine Bright Online with Mutant Technologies. Web Development, Digital Marketing, and SEO services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} ${poppins.variable} font-sans bg-dark-900 text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
