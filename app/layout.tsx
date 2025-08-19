import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { BottomNavigation } from '@/components/BottomNavigation';
import { LanguageToggle } from '@/components/LanguageToggle';
import { LanguageProvider } from '@/lib/i18n/context';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Vital Vibe - Health & Fitness',
  description: 'Track your health and fitness journey',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <LanguageProvider>
          <div className="min-h-screen pb-20 md:pb-0">
            {/* Top Bar */}
            <header className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 z-40">
              <div className="flex items-center justify-between max-w-4xl mx-auto">
                <div className="flex-1" />
                <div className="flex items-center space-x-2">
                  <LanguageToggle />
                  <Button variant="ghost" size="sm" aria-label="Settings">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-4 py-6">
              {children}
            </main>

            {/* Desktop Navigation - Hidden on mobile */}
            <nav className="hidden md:block fixed top-0 left-0 w-64 h-full bg-white border-r border-gray-200 p-6">
              <div className="space-y-2">
                {/* Desktop nav items would go here */}
              </div>
            </nav>

            {/* Mobile Bottom Navigation */}
            <BottomNavigation />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}