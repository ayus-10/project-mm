"use client";

import { useEffect, useState } from "react";

export const useMobileScreen = () => {
  const [mobileScreen, setMobileScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => setMobileScreen(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return mobileScreen;
};
