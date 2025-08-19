'use client';

import { Card } from '@/components/ui/card';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { DayPoint } from '@/lib/metrics';
import { getDaysWithinBudget, getAverageNet, getCurrentStreak } from '@/lib/sampleData';
import { useTranslation } from '@/lib/i18n/context';

interface ThirtyDaySummaryProps {
  data: DayPoint[];
}

export function ThirtyDaySummary({ data }: ThirtyDaySummaryProps) {
  const { t } = useTranslation();
  const daysWithinBudget = getDaysWithinBudget(data);
  const avgNet = getAverageNet(data);
  const currentStreak = getCurrentStreak(data);

  const sparklineData = data.slice(-15).map(point => ({ net: point.net }));

  const stats = [
    {
      title: t('home.days_within_budget'),
      value: `${daysWithinBudget}/30`,
      subtitle: `${Math.round((daysWithinBudget / 30) * 100)}%`,
    },
    {
      title: t('home.avg_net'),
      value: `${avgNet}`,
      subtitle: 'kcal',
    },
    {
      title: t('home.streak'),
      value: currentStreak.toString(),
      subtitle: t('home.days'),
    },
  ];

  return (
    <Card className="p-6 rounded-2xl shadow-sm bg-white border-gray-200">
      <h3 className="text-lg font-semibold mb-4">{t('home.monthly_summary')}</h3>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-xs text-gray-500 mb-1">{stat.title}</div>
            <div className="text-xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-400">{stat.subtitle}</div>
          </div>
        ))}
      </div>

      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={sparklineData}>
            <Line 
              type="monotone" 
              dataKey="net" 
              stroke="#001489" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}