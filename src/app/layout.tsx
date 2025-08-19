import type { Metadata } from "next";
import { Poppins, Anek_Bangla } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/lib/providers/ReduxProvider";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Toaster } from "@/components/ui/toaster";
import { BanglaFontProvider } from "@/components/BanglaFontProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const anekBangla = Anek_Bangla({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-anek-bangla",
});

export const metadata: Metadata = {
  title: "ForensiCare",
  description: "ForensiCare - Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${anekBangla.variable}`}>
      <body className={anekBangla.className}>
        <ReduxProvider>
          <LanguageProvider>
            <BanglaFontProvider>
              {children}
              <Toaster />
            </BanglaFontProvider>
          </LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
