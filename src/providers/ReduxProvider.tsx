"use client";

import { Provider } from "react-redux";
import { ReactNode } from "react";
import { store } from "@/redux/store";

export default function ReduxProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <Provider store={store}>{children}</Provider>;
}
