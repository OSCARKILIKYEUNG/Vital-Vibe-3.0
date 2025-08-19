'use client';

import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import { useTranslation } from '@/lib/i18n/context';

export function LanguageToggle() {
  const { language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'zh' : 'en';
    setLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-1 text-sm"
      aria-label={`Switch to ${language === 'en' ? 'Chinese' : 'English'}`}
    >
      <Languages className="h-4 w-4" />
      {language.toUpperCase()}
    </Button>
  );
}