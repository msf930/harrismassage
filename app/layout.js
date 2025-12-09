import { Geist, Geist_Mono, Playfair_Display, Questrial } from "next/font/google";
import "./globals.css";
import Clarity from '@microsoft/clarity';
import { GoogleAnalytics } from '@next/third-parties/google'
import { GoogleTagManager } from '@next/third-parties/google'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--title",
  subsets: ["latin"],
});

const questrial = Questrial({
  variable: "--body",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata = {
  title: "Harris Therapeutic Massage",
  description: "Harris Therapeutic Massage is a massage therapy practice in Broomfield, CO that offers a variety of massage services to help you relax and feel better.",
  keywords: ["massage", "massage therapy", "massage therapist", "massage services", "massage Broomfield"],
  authors: [{ name: "Harris Therapeutic Massage", url: "https://harrismassage.com" }],
  creator: "Harris Therapeutic Massage",
  publisher: "Harris Therapeutic Massage",
  openGraph: {
    title: "Harris Therapeutic Massage",
    description: "Harris Therapeutic Massage is a massage therapy practice in Broomfield, CO that offers a variety of massage services to help you relax and feel better.",
  },

  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  themeColor: "#CFD6CD",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    themeColor: "#CFD6CD",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://harrismassage.com",
  }

}

const projectId = process.env.CLARITY_PROJECT_ID;

Clarity.init(projectId);

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GoogleTagManager gtmId="G-M38XD371LV" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} ${questrial.variable} antialiased`}
      >
        {children}
        <GoogleAnalytics gaId="G-M38XD371LV" />
      </body>
    </html>
  );
}
