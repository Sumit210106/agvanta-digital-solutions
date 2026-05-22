import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Agvanta | Empowering Agriculture with Smart Solutions | Crop Care & Digital Advisory India",
  description: "Agvanta is India's integrated AgriTech platform offering seeds, crop nutrition, crop protection, biologicals, and digital advisory services. Empowering farmers with smart solutions from root to shoot." ,
  icons: {
    icon: "/ICON.png",
    apple: "/ICON.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}