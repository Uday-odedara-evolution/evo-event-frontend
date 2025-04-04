import { Geist, Geist_Mono, Newsreader, Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "./QueryProvider";
import AppLoader from "@/components/app_loader/AppLoader";
import { AppGuard } from "@/components";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const newsReader = Newsreader({
  variable: "--font-news-reader",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${inter.variable} ${geistMono.variable} ${newsReader.variable} antialiased`}
      >
        <QueryProvider>
          <AppGuard>
            <>
              {children}
              <AppLoader />
            </>
          </AppGuard>
        </QueryProvider>
      </body>
    </html>
  );
}
