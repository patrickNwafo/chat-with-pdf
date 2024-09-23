import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className=" min-h-screen h-screen overflow-hidden flex flex-col">
                    <Toaster />
                    {children}
                </body>
            </html>
        </ClerkProvider>
    );
}
