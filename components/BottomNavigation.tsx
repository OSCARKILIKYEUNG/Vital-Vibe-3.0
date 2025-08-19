'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, UtensilsCrossed, Dumbbell, Library, User } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/context';

const navItems = [
  { href: '/', icon: Home, label: 'nav.home' },
  { href: '/meals', icon: UtensilsCrossed, label: 'nav.meals' },
  { href: '/workouts', icon: Dumbbell, label: 'nav.workouts' },
  { href: '/library', icon: Library, label: 'nav.library' },
  { href: '/profile', icon: User, label: 'nav.profile' },
];

export function BottomNavigation() {
  const { t } = useTranslation();
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 md:hidden z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-brand-blue bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              aria-label={t(item.label as keyof typeof import('@/lib/i18n').translations.en)}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">
                {t(item.label as keyof typeof import('@/lib/i18n').translations.en)}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}