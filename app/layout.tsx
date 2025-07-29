import type { Metadata } from "next";
import "./globals.css";
import SessionWrapper from "@/app/sessionWrapper";

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
      <SessionWrapper>
        <html lang="en">
          <body>
            {children}
          </body>
        </html>
      </SessionWrapper>
  );
}
