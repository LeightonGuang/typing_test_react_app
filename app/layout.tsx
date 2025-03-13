import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import AppSidebar from "@/components/AppSidebar";
import AdBlockDetector from "@/components/AdBlockDetector";
import { ThemeProvider } from "@/components/theme-provider";
import LocalStorageChecker from "@/components/LocalStorageChecker";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Next Typer",
  description: `Test your typing speed and accuracy with The Next Typer! Track your WPM, see your errors, and improve your skills with insightful charts.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-4819979435098701" />
        <meta
          name="google-site-verification"
          content="95OV8Owevm86TYyOdpCFyl20wkad0IJEMBhShITHkEM"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4819979435098701"
          crossOrigin="anonymous"
        />
      </head>

      <body className={inter.className}>
        <AdBlockDetector>
          <LocalStorageChecker />
          <ThemeProvider
            attribute={"class"}
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider defaultOpen={false}>
              <AppSidebar />
              <SidebarTrigger />
              {children}
            </SidebarProvider>
            <Toaster />
          </ThemeProvider>
        </AdBlockDetector>
      </body>
    </html>
  );
}
