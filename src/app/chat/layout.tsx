import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Chat - MysterioMessazo",
};

export default function ChatLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <>{children}</>;
}
