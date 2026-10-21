import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aarya - Full Stack Developer",
  description: "Portfolio of Aarya - Building digital experiences with modern tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
