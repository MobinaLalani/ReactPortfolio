"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";


export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      // touch options
      syncTouch: false, // به جای smoothTouch
      touchMultiplier: 1, // حساسیت اسکرول لمسی
      //syncTouchLerp: 0.075,  // اگر خواستی میزان smooth touch رو کنترل کنی
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}

