import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { PrimeReactProvider } from "primereact/api";
import Navigation from "@/components/Navigation";

import "./globals.css";
import "./theme.css";
import 'primeicons/primeicons.css';

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
    <PrimeReactProvider>
      <html lang="en">
        <body className={nunito.className}>
          <Navigation />
          {children}
        </body>
      </html>
    </PrimeReactProvider>
  );
}
