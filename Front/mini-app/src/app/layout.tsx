import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";
import { LoadingProvider } from "@/context/LoadingContext";

const PAGE_TITLE = "Tasks App";

export const metadata: Metadata = {
  title: {default: PAGE_TITLE, template: `${PAGE_TITLE} | %s`},
  description: "A simple task management app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LoadingProvider>
    <AuthProvider>
    <html lang="pt-BR">
      <body className="">
        <Header />
        <main className="mt-24 flex justify-center">
          {children}
        </main>
        
        <footer className="fixed bottom-0 right-0 left-0 py-2 border-t text-center shadow-xl bg-white">
          <p>Projeto desenvolvido durante curso de fundamentos React </p>
          <p>2025</p>
        </footer>
      </body>
    </html>
    </AuthProvider>
    </LoadingProvider>
  );
}
