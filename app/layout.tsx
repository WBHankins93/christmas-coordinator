import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import { PARTY_DATE, PARTY_THEME } from "@/lib/constants";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#DC2626',
}

export const metadata: Metadata = {
  title: `${PARTY_THEME} - December 19, 2024`,
  description: "RSVP for gift exchange and potluck for our Candy Land themed Christmas party!",
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Christmas Party',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
