'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Clock, Flame, Heart, Timer } from 'lucide-react';
import { WorkoutAddSheet } from '@/components/WorkoutAddSheet';
import { useTranslation } from '@/lib/i18n/context';

interface WorkoutEntry {
  id: string;
  time: string;
  name: string;
  duration: number;
  calories: number;
  avgHr?: number;
  category: string;
}

export default function WorkoutsPage() {
  const { t } = useTranslation();
  const [addSheetOpen, setAddSheetOpen] = useState(false);

  // Mock data
  const todayWorkouts: WorkoutEntry[] = [
    {
      id: '1',
      time: '7:00 AM',
      name: 'Morning Run',
      duration: 35,
      calories: 380,
      avgHr: 152,
      category: 'cardio',
    },
    {
      id: '2',
      time: '6:30 PM',
      name: 'Weight Training',
      duration: 45,
      calories: 280,
      avgHr: 135,
      category: 'strength',
    },
  ];

  const totalCalories = todayWorkouts.reduce((sum, workout) => sum + workout.calories, 0);
  const totalDuration = todayWorkouts.reduce((sum, workout) => sum + workout.duration, 0);

  const getCategoryColor = (category: string) => {
    const colors = {
      cardio: 'bg-orange-100 text-orange-800',
      strength: 'bg-blue-100 text-blue-800',
      ball: 'bg-green-100 text-green-800',
      swim: 'bg-cyan-100 text-cyan-800',
      home: 'bg-purple-100 text-purple-800',
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('workouts.title')}</h1>
      </div>

      {/* Daily Summary */}
      <Card className="p-6 rounded-2xl shadow-sm bg-white border-gray-200">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="p-3 bg-orange-50 rounded-xl mb-2 inline-block">
              <Flame className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{totalCalories}</div>
            <div className="text-sm text-gray-500">kcal burned</div>
          </div>
          <div className="text-center">
            <div className="p-3 bg-blue-50 rounded-xl mb-2 inline-block">
              <Timer className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{totalDuration}</div>
            <div className="text-sm text-gray-500">minutes</div>
          </div>
          <div className="text-center">
            <div className="p-3 bg-green-50 rounded-xl mb-2 inline-block">
              <Clock className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{todayWorkouts.length}</div>
            <div className="text-sm text-gray-500">sessions</div>
          </div>
        </div>
      </Card>

      {/* Workout Entries */}
      <div className="space-y-4">
        {todayWorkouts.map((workout) => (
          <Card key={workout.id} className="p-4 rounded-2xl shadow-sm bg-white border-gray-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-50 rounded-lg">
                  <Flame className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <div className="font-semibold">{workout.name}</div>
                  <div className="text-sm text-gray-500">{workout.time}</div>
                </div>
              </div>
              <Badge className={getCategoryColor(workout.category)}>
                {workout.category}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-gray-600">
                  <Timer className="h-4 w-4 mr-1" />
                  {workout.duration}m
                </div>
                {workout.avgHr && (
                  <div className="flex items-center text-gray-600">
                    <Heart className="h-4 w-4 mr-1 text-red-500" />
                    {workout.avgHr} bpm
                  </div>
                )}
              </div>
              <div className="font-bold text-orange-600">
                {workout.calories} kcal
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {todayWorkouts.length === 0 && (
        <Card className="p-8 rounded-2xl shadow-sm bg-white border-gray-200 text-center">
          <div className="text-gray-400 mb-4">No workouts logged today</div>
          <div className="text-sm text-gray-500 mb-6">
            Start your fitness journey by adding your first workout
          </div>
        </Card>
      )}

      {/* Add Workout Button */}
      <div className="fixed bottom-24 right-4 md:bottom-8">
        <Button
          onClick={() => setAddSheetOpen(true)}
          className="bg-brand-blue hover:bg-brand-blue/90 rounded-full h-14 w-14 shadow-lg"
          size="icon"
          aria-label={t('workouts.add_workout')}
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>

      <WorkoutAddSheet
        open={addSheetOpen}
        onClose={() => setAddSheetOpen(false)}
      />
    </div>
  );
}