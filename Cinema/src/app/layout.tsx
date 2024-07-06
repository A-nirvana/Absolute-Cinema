import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Footer from "@/components/footer";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Harvest",
  description: "Harvest of the best handpicked and popular movies and series in the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className+ "flex flex-col"}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        ><Header/>
          {children}
        </ThemeProvider>
        <Footer/>
      </body>
    </html>
  );
}
