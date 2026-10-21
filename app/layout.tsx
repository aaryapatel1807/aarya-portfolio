import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aarya Patel - Full-Stack Developer",
  description: "Full-stack developer portfolio. CS student who coded his way here.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased overflow-clip">
        {children}
      </body>
    </html>
  );
}
