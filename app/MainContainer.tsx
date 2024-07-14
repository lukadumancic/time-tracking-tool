"use client";
import Navigation from "@/components/Navigation";
import useOnAppInit from "@/hooks/useOnAppInit";

export default function MainContainer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useOnAppInit();
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
