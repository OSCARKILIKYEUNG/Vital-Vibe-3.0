'use client';

import { Card } from '@/components/ui/card';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DayPoint } from '@/lib/metrics';
import { useTranslation } from '@/lib/i18n/context';

interface WeeklyTrendProps {
  data: DayPoint[];
}

export function WeeklyTrend({ data }: WeeklyTrendProps) {
  const { t } = useTranslation();
  const chartData = data.map(point => ({
    ...point,
    dayName: new Date(point.date).toLocaleDateString('en', { weekday: 'short' }),
  }));

  return (
    <Card className="p-6 rounded-2xl shadow-sm bg-white border-gray-200">
      <h3 className="text-lg font-semibold mb-4">{t('home.weekly_trend')}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="dayName" 
              axisLine={false} 
              tickLine={false}
              fontSize={12}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              fontSize={12}
            />
            <Tooltip 
              content={({ active, payload, label }) => {
                if (!active || !payload?.length) return null;
                const data = payload[0].payload;
                return (
                  <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-sm">
                    <p className="font-semibold">{label}</p>
                    <p className="text-sm text-green-600">Intake: {data.intake} kcal</p>
                    <p className="text-sm text-orange-600">Burned: {data.burned} kcal</p>
                    <p className="text-sm text-gray-600">Budget: {data.budget} kcal</p>
                    <p className="text-sm font-semibold">Net: {data.net} kcal</p>
                  </div>
                );
              }}
            />
            <Bar dataKey="intake" fill="#10b981" name="Intake" />
            <Bar dataKey="burned" fill="#f97316" name="Burned" />
            <Line 
              type="monotone" 
              dataKey="budget" 
              stroke="#001489" 
              strokeWidth={2}
              dot={{ fill: '#001489', r: 4 }}
              name="Budget"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}