import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TerminalNexus | Lê Hoàn",
  description: "Full-Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
