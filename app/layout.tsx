import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import Navigation from "@/components/Navigation";

import Providers from "./providers";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={nunito.className}>
          <Navigation />
          {children}
        </body>
      </html>
    </Providers>
  );
}
