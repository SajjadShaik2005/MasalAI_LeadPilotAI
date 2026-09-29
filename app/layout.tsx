import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "LeadPilot AI", description: "Real-estate lead intelligence" };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body>{children}</body></html>; }
