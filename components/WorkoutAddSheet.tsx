'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Search, Activity } from 'lucide-react';
import { searchWorkouts, calcCalories, getPopularWorkouts, IntensityKey } from '@/lib/workoutCatalog';
import { useTranslation } from '@/lib/i18n/context';

interface WorkoutAddSheetProps {
  open: boolean;
  onClose: () => void;
}

export function WorkoutAddSheet({ open, onClose }: WorkoutAddSheetProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('know-calories');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState('');
  const [duration, setDuration] = useState('');
  const [avgHr, setAvgHr] = useState('');
  const [calories, setCalories] = useState('');
  const [intensity, setIntensity] = useState<IntensityKey>('mid');
  const [aiWorkoutName, setAiWorkoutName] = useState('');
  const [estimatedCalories, setEstimatedCalories] = useState(0);

  const searchResults = searchWorkouts(searchQuery);
  const popularWorkouts = getPopularWorkouts();
  const weightKg = 70; // Mock user weight

  const handleCalculate = () => {
    const selectedItem = searchResults.find(w => w.id === selectedWorkout);
    if (selectedItem && duration) {
      const estimated = calcCalories({
        met: selectedItem.met,
        weightKg,
        minutes: parseInt(duration),
        intensity,
        avgHr: avgHr ? parseInt(avgHr) : undefined,
      });
      setEstimatedCalories(estimated);
    }
  };

  const handleAiEstimate = () => {
    // Mock AI estimation
    if (aiWorkoutName && duration) {
      const mockWorkout = popularWorkouts[Math.floor(Math.random() * popularWorkouts.length)];
      const estimated = calcCalories({
        met: mockWorkout.met,
        weightKg,
        minutes: parseInt(duration),
        intensity,
        avgHr: avgHr ? parseInt(avgHr) : undefined,
      });
      setEstimatedCalories(estimated);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl">
        <SheetHeader>
          <SheetTitle>{t('workouts.add_workout')}</SheetTitle>
        </SheetHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid w-full grid-cols-3 text-xs">
            <TabsTrigger value="know-calories">{t('workouts.know_calories')}</TabsTrigger>
            <TabsTrigger value="calculate">{t('workouts.calculate')}</TabsTrigger>
            <TabsTrigger value="ai">{t('workouts.use_ai')}</TabsTrigger>
          </TabsList>

          <TabsContent value="know-calories" className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">{t('workouts.workout_name')}</label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search workouts..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2 max-h-32 overflow-y-auto">
                {(searchQuery ? searchResults : popularWorkouts).slice(0, 5).map(workout => (
                  <div 
                    key={workout.id} 
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedWorkout === workout.id ? 'border-brand-blue bg-blue-50' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedWorkout(workout.id)}
                  >
                    <div className="font-medium">{workout.name}</div>
                    <div className="text-sm text-gray-500 capitalize">{workout.category}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">{t('workouts.duration')}</label>
                  <Input
                    type="number"
                    placeholder="30"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">{t('workouts.avg_hr')}</label>
                  <Input
                    type="number"
                    placeholder="150"
                    value={avgHr}
                    onChange={(e) => setAvgHr(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">{t('workouts.calories')} *</label>
                <Input
                  type="number"
                  placeholder="250"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calculate" className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">{t('workouts.workout_name')} *</label>
                <Select value={selectedWorkout} onValueChange={setSelectedWorkout}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose workout..." />
                  </SelectTrigger>
                  <SelectContent>
                    {popularWorkouts.map(workout => (
                      <SelectItem key={workout.id} value={workout.id}>
                        {workout.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">{t('workouts.duration')} *</label>
                  <Input
                    type="number"
                    placeholder="30"
                    value={duration}
                    onChange={(e) => {
                      setDuration(e.target.value);
                      if (e.target.value && selectedWorkout) {
                        setTimeout(handleCalculate, 100);
                      }
                    }}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">{t('workouts.avg_hr')}</label>
                  <Input
                    type="number"
                    placeholder="150"
                    value={avgHr}
                    onChange={(e) => {
                      setAvgHr(e.target.value);
                      if (duration && selectedWorkout) {
                        setTimeout(handleCalculate, 100);
                      }
                    }}
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">{t('workouts.intensity')}</label>
                <Select value={intensity} onValueChange={(value: IntensityKey) => {
                  setIntensity(value);
                  if (duration && selectedWorkout) {
                    setTimeout(handleCalculate, 100);
                  }
                }}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{t('workouts.low')}</SelectItem>
                    <SelectItem value="mid">{t('workouts.mid')}</SelectItem>
                    <SelectItem value="high">{t('workouts.high')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {estimatedCalories > 0 && (
                <Card className="p-4 bg-blue-50 border-brand-blue">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-brand-blue" />
                    <div>
                      <div className="text-sm text-gray-600">{t('workouts.estimate')}</div>
                      <div className="text-xl font-bold text-brand-blue">{estimatedCalories} kcal</div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">{t('workouts.workout_name')} *</label>
                <Input
                  placeholder="e.g., Dancing, Gardening, Playing with kids"
                  value={aiWorkoutName}
                  onChange={(e) => setAiWorkoutName(e.target.value)}
                  className="mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">{t('workouts.duration')} *</label>
                  <Input
                    type="number"
                    placeholder="30"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">{t('workouts.avg_hr')}</label>
                  <Input
                    type="number"
                    placeholder="150"
                    value={avgHr}
                    onChange={(e) => setAvgHr(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <Button
                onClick={handleAiEstimate}
                disabled={!aiWorkoutName || !duration}
                className="w-full bg-brand-blue hover:bg-brand-blue/90"
              >
                AI {t('workouts.estimate')}
              </Button>

              {estimatedCalories > 0 && (
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">AI Match: "{aiWorkoutName}"</div>
                    <Badge variant="secondary">75% confidence</Badge>
                  </div>
                  <div className="text-2xl font-bold text-brand-blue">{estimatedCalories} kcal</div>
                  <div className="text-sm text-gray-500 mt-1">
                    Similar to: {popularWorkouts[0]?.name}
                  </div>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex space-x-4 mt-6">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            {t('workouts.cancel')}
          </Button>
          <Button 
            className="flex-1 bg-brand-blue hover:bg-brand-blue/90"
            onClick={onClose}
          >
            {t('workouts.save')}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}