import type { Metadata } from "next";
import { Nunito } from "next/font/google";

import Providers from "./providers";
import "./globals.css";
import MainContainer from "./MainContainer";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Time tracking tool",
  description: "Time tracking tool",
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
          <MainContainer>{children}</MainContainer>
        </body>
      </html>
    </Providers>
  );
}
