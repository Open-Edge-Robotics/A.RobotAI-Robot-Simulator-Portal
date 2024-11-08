import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/utils/core";
import ClientLayout from "@/app/clientLayout";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "자율행동체",
  description: "자율행동체 시뮬레이션 플랫폼입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn("bg-white-100", pretendard.className)}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
