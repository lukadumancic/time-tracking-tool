"use client";
import { PrimeReactProvider } from "primereact/api";
import StoreProvider from "@/store/StoreProvider";

import "./theme.css";
import "primeicons/primeicons.css";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrimeReactProvider>
      <StoreProvider>{children}</StoreProvider>
    </PrimeReactProvider>
  );
}
