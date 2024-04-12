import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/providers/ThemeProvider";
import AuthProvider from "@/providers/AuthProvider";
import ReduxProvider from "@/providers/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ManSiaa",
  description: "Enjoy with ManSiaa Chating App. Real-Time communication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ReduxProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </ReduxProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
