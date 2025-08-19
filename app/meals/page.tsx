'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Clock, TrendingUp } from 'lucide-react';
import { MealAddSheet } from '@/components/MealAddSheet';
import { useTranslation } from '@/lib/i18n/context';

interface MealEntry {
  id: string;
  time: string;
  name: string;
  calories: number;
  items: string[];
}

export default function MealsPage() {
  const { t } = useTranslation();
  const [addSheetOpen, setAddSheetOpen] = useState(false);

  // Mock data
  const todayMeals: MealEntry[] = [
    {
      id: '1',
      time: '8:30 AM',
      name: 'Breakfast',
      calories: 420,
      items: ['Oatmeal with berries', 'Greek yogurt', 'Coffee'],
    },
    {
      id: '2',
      time: '12:45 PM',
      name: 'Lunch',
      calories: 650,
      items: ['Grilled chicken salad', 'Olive oil dressing', 'Whole grain roll'],
    },
  ];

  const totalCalories = todayMeals.reduce((sum, meal) => sum + meal.calories, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('meals.title')}</h1>
      </div>

      {/* Daily Summary */}
      <Card className="p-6 rounded-2xl shadow-sm bg-white border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm text-gray-500">Today's Intake</div>
            <div className="text-3xl font-bold text-gray-900">{totalCalories}</div>
            <div className="text-sm text-gray-400">kcal</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Meals logged</div>
            <div className="text-2xl font-semibold text-brand-blue">{todayMeals.length}</div>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-green-600">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>On track with your daily goal</span>
        </div>
      </Card>

      {/* Meal Entries */}
      <div className="space-y-4">
        {todayMeals.map((meal) => (
          <Card key={meal.id} className="p-4 rounded-2xl shadow-sm bg-white border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Clock className="h-4 w-4 text-brand-blue" />
                </div>
                <div>
                  <div className="font-semibold">{meal.name}</div>
                  <div className="text-sm text-gray-500">{meal.time}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">{meal.calories}</div>
                <div className="text-xs text-gray-400">kcal</div>
              </div>
            </div>
            
            <div className="space-y-1">
              {meal.items.map((item, index) => (
                <div key={index} className="text-sm text-gray-600">• {item}</div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {todayMeals.length === 0 && (
        <Card className="p-8 rounded-2xl shadow-sm bg-white border-gray-200 text-center">
          <div className="text-gray-400 mb-4">No meals logged today</div>
          <div className="text-sm text-gray-500 mb-6">
            Start tracking your nutrition by adding your first meal
          </div>
        </Card>
      )}

      {/* Add Meal Button */}
      <div className="fixed bottom-24 right-4 md:bottom-8">
        <Button
          onClick={() => setAddSheetOpen(true)}
          className="bg-brand-blue hover:bg-brand-blue/90 rounded-full h-14 w-14 shadow-lg"
          size="icon"
          aria-label={t('meals.add_meal')}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <MealAddSheet
        open={addSheetOpen}
        onClose={() => setAddSheetOpen(false)}
      />
    </div>
  );
}