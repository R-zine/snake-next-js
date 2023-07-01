import { Gugi } from "next/font/google";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import "./globals.css";

const gugi = Gugi({ subsets: ["latin"], weight: "400" });

export const metadata = {
  title: "The Snake Game",
  description:
    "This is an itteration of the popular snake game made by Ivan Radev. You can save your settings and keep you highscore accross sessions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={gugi.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
