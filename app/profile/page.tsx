'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { User, Calculator, Target, Activity } from 'lucide-react';
import { LanguageToggle } from '@/components/LanguageToggle';
import { rmrMifflinStJeor, dailyBudget, UserProfile } from '@/lib/metrics';
import { useTranslation } from '@/lib/i18n/context';

export default function ProfilePage() {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<UserProfile>({
    sex: 'male',
    weightKg: 70,
    heightCm: 175,
    ageYears: 30,
    activityFactor: 1.375, // Lightly active
    goalOffset: -500, // Lose weight
  });

  const rmr = rmrMifflinStJeor(profile);
  const budget = dailyBudget({ rmr, activityFactor: profile.activityFactor, goalOffset: profile.goalOffset });

  const updateProfile = (key: keyof UserProfile, value: any) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const activityLevels = [
    { value: 1.2, label: 'Sedentary (little/no exercise)' },
    { value: 1.375, label: 'Lightly active (light exercise 1-3 days/week)' },
    { value: 1.55, label: 'Moderately active (moderate exercise 3-5 days/week)' },
    { value: 1.725, label: 'Very active (hard exercise 6-7 days/week)' },
    { value: 1.9, label: 'Extremely active (very hard exercise, physical job)' },
  ];

  const goalOptions = [
    { value: -750, label: 'Lose weight fast (-750 kcal)', color: 'bg-red-100 text-red-800' },
    { value: -500, label: 'Lose weight (-500 kcal)', color: 'bg-orange-100 text-orange-800' },
    { value: -250, label: 'Lose weight slowly (-250 kcal)', color: 'bg-yellow-100 text-yellow-800' },
    { value: 0, label: 'Maintain weight (0 kcal)', color: 'bg-blue-100 text-blue-800' },
    { value: 250, label: 'Gain weight slowly (+250 kcal)', color: 'bg-green-100 text-green-800' },
    { value: 500, label: 'Gain weight (+500 kcal)', color: 'bg-emerald-100 text-emerald-800' },
  ];

  const getCurrentGoal = () => {
    return goalOptions.find(goal => goal.value === profile.goalOffset) || goalOptions[1];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('profile.title')}</h1>
      </div>

      {/* Profile Avatar & Basic Info */}
      <Card className="p-6 rounded-2xl shadow-sm bg-white border-gray-200">
        <div className="flex items-center space-x-4 mb-6">
          <div className="p-4 bg-brand-blue rounded-full">
            <User className="h-8 w-8 text-white" />
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900">Your Profile</div>
            <div className="text-sm text-gray-500">Customize your health metrics</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">{t('profile.sex')}</label>
            <Select value={profile.sex} onValueChange={(value: 'male' | 'female') => updateProfile('sex', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">{t('profile.age')}</label>
            <Input
              type="number"
              value={profile.ageYears}
              onChange={(e) => updateProfile('ageYears', parseInt(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">{t('profile.height')}</label>
            <Input
              type="number"
              value={profile.heightCm}
              onChange={(e) => updateProfile('heightCm', parseInt(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">{t('profile.weight')}</label>
            <Input
              type="number"
              value={profile.weightKg}
              onChange={(e) => updateProfile('weightKg', parseInt(e.target.value) || 0)}
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      {/* Activity Level */}
      <Card className="p-6 rounded-2xl shadow-sm bg-white border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-green-50 rounded-lg">
            <Activity className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <div className="font-semibold">{t('profile.activity_level')}</div>
            <div className="text-sm text-gray-500">How active are you typically?</div>
          </div>
        </div>
        
        <Select 
          value={profile.activityFactor.toString()} 
          onValueChange={(value) => updateProfile('activityFactor', parseFloat(value))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {activityLevels.map(level => (
              <SelectItem key={level.value} value={level.value.toString()}>
                {level.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Card>

      {/* Goal Setting */}
      <Card className="p-6 rounded-2xl shadow-sm bg-white border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Target className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <div className="font-semibold">Weight Goal</div>
            <div className="text-sm text-gray-500">What's your goal?</div>
          </div>
        </div>
        
        <Select 
          value={profile.goalOffset.toString()} 
          onValueChange={(value) => updateProfile('goalOffset', parseInt(value))}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {goalOptions.map(goal => (
              <SelectItem key={goal.value} value={goal.value.toString()}>
                {goal.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <div className="mt-4">
          <Badge className={getCurrentGoal().color}>
            Current Goal: {getCurrentGoal().label}
          </Badge>
        </div>
      </Card>

      {/* Calculated Metrics */}
      <Card className="p-6 rounded-2xl shadow-sm bg-white border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-purple-50 rounded-lg">
            <Calculator className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <div className="font-semibold">Your Daily Metrics</div>
            <div className="text-sm text-gray-500">Based on your profile</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <div className="text-2xl font-bold text-gray-900">{Math.round(rmr)}</div>
            <div className="text-sm text-gray-500">BMR (kcal/day)</div>
          </div>
          <div className="text-center p-4 bg-brand-blue bg-opacity-10 rounded-lg">
            <div className="text-2xl font-bold text-brand-blue">{budget}</div>
            <div className="text-sm text-gray-500">Daily Budget</div>
          </div>
        </div>
      </Card>

      {/* Settings */}
      <Card className="p-6 rounded-2xl shadow-sm bg-white border-gray-200">
        <div className="font-semibold mb-4">{t('profile.settings')}</div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">{t('profile.language')}</div>
            <div className="text-sm text-gray-500">Choose your preferred language</div>
          </div>
          <LanguageToggle />
        </div>
      </Card>
    </div>
  );
}