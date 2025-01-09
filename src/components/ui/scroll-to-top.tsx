import React, { useEffect, useState } from "react";

import { Icons } from "@/assets/icons";
import { cn } from "@/utils/cn";

import { Button } from "./reusables/button";

export default function ScrollToTop() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <Button
      onClick={scrollToTop}
      size={"icon"}
      className={cn(
        "rounded-full fixed bottom-4 right-4 bg-chart-2 text-background shadow-chart-2 hover:bg-chart-2 hover:opacity-90",
        {
          hidden: !showBackToTop,
        }
      )}
    >
      <Icons.Up />
    </Button>
  );
}
