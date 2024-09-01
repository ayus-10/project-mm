import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Sign up - MysterioMessazo",
};

export default function SignupLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <>{children}</>;
}
