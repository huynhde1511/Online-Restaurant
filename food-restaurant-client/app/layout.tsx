import type { Metadata } from "next";
import {Urbanist} from "next/font/google"
import "./globals.css";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/header";
import { auth } from "@clerk/nextjs/server";
import Footer from "@/components/footer";
import ToastProvider from "@/providers/toast-provider";
const urbanist = Urbanist({subsets: ["latin"], variable: "--font-urbansit"}) //create font
export const metadata: Metadata = {
  title: "Tin-Stores",
  description: "Tin-Stores - Uy Tín, Chất Lượng ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) { 
  const {userId} = auth(); 
  return ( 
    <ClerkProvider >
      <html lang="en">
        <body
          className={cn("bg-background antialiased", urbanist.variable)}
        >
          <ToastProvider />
          <img src="/img/hero.svg" className="absolute -z-10 top-0 right-0 w-full md:w-[60%]" alt="" /> 
          <Header userId={userId}/>
          {children} 
          <Footer/>
        </body>
      </html>
    </ClerkProvider>
  );
}
//10:27:28