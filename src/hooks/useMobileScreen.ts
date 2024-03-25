"use client";

import { useEffect, useState } from "react";

export function useMobileScreen() {
  const [mobileScreen, setMobileScreen] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setMobileScreen(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return mobileScreen;
}
