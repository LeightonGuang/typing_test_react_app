import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import AppSidebar from "@/components/AppSidebar";
import AdBlockDetector from "@/components/AdBlockDetector";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Next Typer",
  description: "A revamped version of an existing typing test website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AdBlockDetector>
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
