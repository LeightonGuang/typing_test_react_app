import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import AppSidebar from "@/components/AppSidebar";
import { ThemeProvider } from "@/components/theme-provider";
import AdBlockDetector from "@/components/AdBlockDetector";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Next Typer",
  description: "A typing test website with Next.js",
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
          </ThemeProvider>
        </AdBlockDetector>
      </body>
    </html>
  );
}
