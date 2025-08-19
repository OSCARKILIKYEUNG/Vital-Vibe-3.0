'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'zh';

export const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.meals': 'Meals',
    'nav.workouts': 'Workouts',
    'nav.library': 'Library',
    'nav.profile': 'Profile',
    
    // Home/Dashboard
    'home.title': 'Dashboard',
    'home.remaining_kcal': 'Remaining kcal',
    'home.intake': 'Intake',
    'home.burned': 'Burned',
    'home.budget': 'Budget',
    'home.add_meal': 'Add Meal',
    'home.add_workout': 'Add Workout',
    'home.weekly_trend': 'Weekly Trend',
    'home.monthly_summary': '30-Day Summary',
    'home.days_within_budget': 'Days Within Budget',
    'home.avg_net': 'Avg Net',
    'home.streak': 'Streak',
    'home.days': 'days',
    
    // Meals
    'meals.title': 'Meals',
    'meals.add_meal': 'Add Meal',
    'meals.manual': 'Manual',
    'meals.ai_auto': 'AI Auto',
    'meals.ai_quantity': 'AI + Quantity',
    'meals.search_food': 'Search food...',
    'meals.grams': 'Grams',
    'meals.calories': 'Calories',
    'meals.add_custom': 'Add Custom',
    'meals.photo_upload': 'Upload Photo',
    'meals.identify_foods': 'Identify Foods',
    'meals.estimate_quantity': 'Estimate Quantity',
    'meals.needs_confirmation': 'Needs Confirmation',
    'meals.subtotal': 'Subtotal',
    'meals.save': 'Save',
    'meals.cancel': 'Cancel',
    'meals.undo': 'Undo',
    
    // Workouts
    'workouts.title': 'Workouts',
    'workouts.add_workout': 'Add Workout',
    'workouts.know_calories': 'I know the calories',
    'workouts.calculate': 'Calculate for me',
    'workouts.use_ai': "Can't find it? Use AI",
    'workouts.workout_name': 'Workout Name',
    'workouts.duration': 'Duration (minutes)',
    'workouts.avg_hr': 'Average HR',
    'workouts.calories': 'Calories',
    'workouts.intensity': 'Intensity',
    'workouts.low': 'Low',
    'workouts.mid': 'Mid',
    'workouts.high': 'High',
    'workouts.estimate': 'Estimate',
    'workouts.save': 'Save',
    'workouts.cancel': 'Cancel',
    
    // Library
    'library.title': 'Library',
    'library.workout_links': 'Workout Links',
    'library.recipes': 'Recipes',
    'library.add_link': 'Add Link',
    'library.add_recipe': 'Add Recipe',
    'library.search': 'Search...',
    'library.filters': 'Filters',
    'library.grid': 'Grid',
    'library.list': 'List',
    
    // Profile
    'profile.title': 'Profile',
    'profile.settings': 'Settings',
    'profile.language': 'Language',
    'profile.sex': 'Sex',
    'profile.age': 'Age',
    'profile.height': 'Height (cm)',
    'profile.weight': 'Weight (kg)',
    'profile.activity_level': 'Activity Level',
    'profile.goal_offset': 'Goal Offset',
    
    // Common
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.add': 'Add',
    'common.remove': 'Remove',
    'common.close': 'Close',
    'common.loading': 'Loading...',
    'common.error': 'Error',
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.meals': '饮食',
    'nav.workouts': '运动',
    'nav.library': '资料库',
    'nav.profile': '个人',
    
    // Home/Dashboard
    'home.title': '仪表盘',
    'home.remaining_kcal': '剩余卡路里',
    'home.intake': '摄入',
    'home.burned': '消耗',
    'home.budget': '预算',
    'home.add_meal': '添加餐食',
    'home.add_workout': '添加运动',
    'home.weekly_trend': '一周趋势',
    'home.monthly_summary': '30天总结',
    'home.days_within_budget': '在预算内天数',
    'home.avg_net': '平均净值',
    'home.streak': '连续',
    'home.days': '天',
    
    // Meals
    'meals.title': '饮食',
    'meals.add_meal': '添加餐食',
    'meals.manual': '手动',
    'meals.ai_auto': 'AI自动',
    'meals.ai_quantity': 'AI+分量',
    'meals.search_food': '搜索食物...',
    'meals.grams': '克',
    'meals.calories': '卡路里',
    'meals.add_custom': '添加自定义',
    'meals.photo_upload': '上传照片',
    'meals.identify_foods': '识别食物',
    'meals.estimate_quantity': '估计分量',
    'meals.needs_confirmation': '需要确认',
    'meals.subtotal': '小计',
    'meals.save': '保存',
    'meals.cancel': '取消',
    'meals.undo': '撤销',
    
    // Workouts
    'workouts.title': '运动',
    'workouts.add_workout': '添加运动',
    'workouts.know_calories': '我知道卡路里',
    'workouts.calculate': '帮我计算',
    'workouts.use_ai': '找不到？使用AI',
    'workouts.workout_name': '运动名称',
    'workouts.duration': '时长（分钟）',
    'workouts.avg_hr': '平均心率',
    'workouts.calories': '卡路里',
    'workouts.intensity': '强度',
    'workouts.low': '低',
    'workouts.mid': '中',
    'workouts.high': '高',
    'workouts.estimate': '估算',
    'workouts.save': '保存',
    'workouts.cancel': '取消',
    
    // Library
    'library.title': '资料库',
    'library.workout_links': '运动链接',
    'library.recipes': '食谱',
    'library.add_link': '添加链接',
    'library.add_recipe': '添加食谱',
    'library.search': '搜索...',
    'library.filters': '筛选',
    'library.grid': '网格',
    'library.list': '列表',
    
    // Profile
    'profile.title': '个人',
    'profile.settings': '设置',
    'profile.language': '语言',
    'profile.sex': '性别',
    'profile.age': '年龄',
    'profile.height': '身高（厘米）',
    'profile.weight': '体重（公斤）',
    'profile.activity_level': '活动水平',
    'profile.goal_offset': '目标偏移',
    
    // Common
    'common.save': '保存',
    'common.cancel': '取消',
    'common.delete': '删除',
    'common.edit': '编辑',
    'common.add': '添加',
    'common.remove': '移除',
    'common.close': '关闭',
    'common.loading': '加载中...',
    'common.error': '错误',
  },
} as const;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
        setLanguageState(savedLanguage);
      }
      setIsMounted(true);
    }
  }, []);

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', newLanguage);
    }
  };

  const t = (key: keyof typeof translations.en): string => {
    // Use default language during SSR and initial hydration to prevent mismatch
    const currentLanguage = isMounted ? language : 'en';
    return translations[currentLanguage][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
}