import type { Metadata } from "next";
import { Roboto_Mono } from "next/font/google"; // Import Roboto Mono
import "./globals.css";

const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "700"] }); // Specify weights

export const metadata: Metadata = {
  title: "Neobrutalist Weather App",
  description: "Created by Xander",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={robotoMono.className}>{children}</body>
    </html>
  );
}