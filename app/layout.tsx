import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider, useAuth } from "@/components/providers/AuthProvider";
import Loading from "@/components/Loading";
import SideNav from "@/components/SideNav";
import Searchbar from "@/components/Searchbar";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LePin",
  description: "LePin - A Pinterest clone inspired by the goat LeBron James",
  icons: {
    icon: '/favicon.ico',
  },
};

function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    return children;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 h-full">
        <SideNav />
      </div>
      <div className="pl-20">
        <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <Searchbar />
        </div>
        {children}
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Loading />
          <AuthenticatedLayout>
            {children}
          </AuthenticatedLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
