import type {Metadata} from "next";
import {Bungee_Outline, IBM_Plex_Mono, Geist_Mono} from "next/font/google";
import "./globals.css";

const bodyFont = IBM_Plex_Mono ({
    weight: "400",
    subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MooTOO!",
  description: "Make your mark: your calling card",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bodyFont.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
