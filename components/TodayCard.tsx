'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Plus } from 'lucide-react';
import { getCalorieStatus, formatNumber } from '@/lib/metrics';
import { useTranslation } from '@/lib/i18n/context';

interface TodayCardProps {
  remaining: number;
  intake: number;
  burned: number;
  budget: number;
  onAddMeal: () => void;
  onAddWorkout: () => void;
}

export function TodayCard({
  remaining,
  intake,
  burned,
  budget,
  onAddMeal,
  onAddWorkout,
}: TodayCardProps) {
  const { t } = useTranslation();
  const status = getCalorieStatus(remaining);
  
  const progressValue = Math.max(0, Math.min(100, ((intake - burned) / budget) * 100));
  const isOver = remaining < 0;

  const statusColors = {
    safe: 'text-green-600',
    near: 'text-yellow-600',
    over: 'text-red-600',
  };

  return (
    <Card className="p-6 rounded-2xl shadow-sm bg-white border-gray-200">
      <div className="text-center mb-6">
        <div className="text-sm text-gray-500 mb-2">{t('home.remaining_kcal')}</div>
        <div className={`text-4xl font-bold ${statusColors[status]} mb-2`}>
          {isOver && '-'}
          {formatNumber(Math.abs(remaining))}
        </div>
        <div className="flex justify-center space-x-6 text-sm text-gray-600">
          <div>
            <div className="text-xs text-gray-400">{t('home.intake')}</div>
            <div className="font-semibold">{formatNumber(intake)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">{t('home.burned')}</div>
            <div className="font-semibold">{formatNumber(burned)}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">{t('home.budget')}</div>
            <div className="font-semibold">{formatNumber(budget)}</div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <Progress 
          value={progressValue} 
          className={`h-3 ${isOver ? 'bg-red-50' : 'bg-gray-100'}`}
        />
        {isOver && (
          <div className="mt-2 text-xs text-red-500 text-center">
            Over budget by {formatNumber(Math.abs(remaining))} kcal
          </div>
        )}
      </div>

      <div className="flex space-x-3">
        <Button
          onClick={onAddMeal}
          className="flex-1 bg-brand-blue hover:bg-brand-blue/90 rounded-2xl"
          size="lg"
        >
          <Plus className="mr-2 h-4 w-4" />
          {t('home.add_meal')}
        </Button>
        <Button
          onClick={onAddWorkout}
          variant="outline"
          className="flex-1 rounded-2xl border-gray-200"
          size="lg"
        >
          <Plus className="mr-2 h-4 w-4" />
          {t('home.add_workout')}
        </Button>
      </div>
    </Card>
  );
}