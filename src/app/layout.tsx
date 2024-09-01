import { Metadata } from "next";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/providers/ThemeProvider";
import ReduxProvider from "@/providers/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MysterioMessazo",
  description: "Messaging with a twist of mystery",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
