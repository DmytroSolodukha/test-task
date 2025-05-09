import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TablePreferencesProvider } from "@/context/TablePreferencesContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing customers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TablePreferencesProvider>
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow">
              <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                <h1 className="text-xl font-semibold text-gray-900">Admin User</h1>
              </div>
            </header>
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </main>
          </div>
        </TablePreferencesProvider>
      </body>
    </html>
  );
}
