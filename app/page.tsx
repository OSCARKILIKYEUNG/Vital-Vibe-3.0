'use client';

import { useState, useEffect } from 'react';
import { TodayCard } from '@/components/TodayCard';
import { WeeklyTrend } from '@/components/WeeklyTrend';
import { ThirtyDaySummary } from '@/components/ThirtyDaySummary';
import { MealAddSheet } from '@/components/MealAddSheet';
import { WorkoutAddSheet } from '@/components/WorkoutAddSheet';
import { mock7Days, mock30Days, getTodayData, type DayPoint } from '@/lib/sampleData';
import { todayRemaining } from '@/lib/metrics';
import { useTranslation } from '@/lib/i18n/context';

export default function Home() {
  const { t } = useTranslation();
  const [mealSheetOpen, setMealSheetOpen] = useState(false);
  const [workoutSheetOpen, setWorkoutSheetOpen] = useState(false);
  const [weeklyData, setWeeklyData] = useState<DayPoint[]>([]);
  const [monthlyData, setMonthlyData] = useState<DayPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate mock data on client side only to avoid hydration mismatch
    const weekly = mock7Days(2000);
    const monthly = mock30Days(2000);
    setWeeklyData(weekly);
    setMonthlyData(monthly);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{t('home.title')}</h1>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-blue"></div>
        </div>
      </div>
    );
  }

  const todayData = getTodayData(weeklyData) || weeklyData[weeklyData.length - 1];
  const remaining = todayRemaining(todayData.budget, todayData.intake, todayData.burned);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('home.title')}</h1>
      </div>

      <TodayCard
        remaining={remaining}
        intake={todayData.intake}
        burned={todayData.burned}
        budget={todayData.budget}
        onAddMeal={() => setMealSheetOpen(true)}
        onAddWorkout={() => setWorkoutSheetOpen(true)}
      />

      <WeeklyTrend data={weeklyData} />

      <ThirtyDaySummary data={monthlyData} />

      <MealAddSheet 
        open={mealSheetOpen} 
        onClose={() => setMealSheetOpen(false)} 
      />

      <WorkoutAddSheet 
        open={workoutSheetOpen} 
        onClose={() => setWorkoutSheetOpen(false)} 
      />
    </div>
  );
}