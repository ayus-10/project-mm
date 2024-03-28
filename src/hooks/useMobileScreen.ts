"use client";

import { useEffect, useState } from "react";

export const useMobileScreen = () => {
  const [mobileScreen, setMobileScreen] = useState(false);

  useEffect(() => setMobileScreen(window.innerWidth < 768), []);

  return mobileScreen;
};
