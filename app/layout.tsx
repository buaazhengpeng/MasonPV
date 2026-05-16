import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MasonPV",
  description: "个人本地图片与视频网页",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
