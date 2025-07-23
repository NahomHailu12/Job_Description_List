import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Job description",
  description: "List of job description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
