import { useEffect, useState } from "react";

export type ScreenSize = "sm" | "md" | "lg" | "xl";

export function useScreenSize(): ScreenSize {
  const [screenSize, setScreenSize] = useState<ScreenSize>("sm");

  useEffect(() => {
    const checkScreenSize = () => {
      // Tailwind breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px)
      if (window.matchMedia("(min-width: 1280px)").matches) {
        setScreenSize("xl");
      } else if (window.matchMedia("(min-width: 1024px)").matches) {
        setScreenSize("lg");
      } else if (window.matchMedia("(min-width: 768px)").matches) {
        setScreenSize("md");
      } else {
        setScreenSize("sm");
      }
    };
    // 초기 실행
    checkScreenSize();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", checkScreenSize);

    // 클린업
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return screenSize;
}
