export type IntensityKey = 'low' | 'mid' | 'high';

export type WorkoutCatalogItem = {
  id: string;
  name: string;
  category: 'cardio' | 'swim' | 'ball' | 'strength' | 'home';
  met: number;
  aliases: string[];
  intensityMapping?: Partial<Record<IntensityKey, number>>;
};

export const INTENSITY_COEFF: Record<IntensityKey, number> = {
  low: 0.85,
  mid: 1.0,
  high: 1.2,
};

export const WORKOUT_CATALOG: WorkoutCatalogItem[] = [
  // Cardio
  { id: 'walk-brisk', name: 'Brisk Walking', category: 'cardio', met: 4.3, aliases: ['walk', 'walking'] },
  { id: 'jog-easy', name: 'Easy Jogging', category: 'cardio', met: 6.0, aliases: ['jog', 'jogging'] },
  { id: 'run-10kph', name: 'Running 10 km/h', category: 'cardio', met: 9.8, aliases: ['run', 'running'] },
  { id: 'run-12kph', name: 'Running 12 km/h', category: 'cardio', met: 11.0, aliases: ['run fast'] },
  { id: 'run-14kph', name: 'Running 14 km/h', category: 'cardio', met: 12.3, aliases: ['run very fast'] },
  { id: 'cycle-leisure', name: 'Cycling Leisure', category: 'cardio', met: 5.8, aliases: ['bike', 'cycling'] },
  { id: 'cycle-moderate', name: 'Cycling Moderate', category: 'cardio', met: 7.5, aliases: ['bike moderate'] },
  { id: 'cycle-vigorous', name: 'Cycling Vigorous', category: 'cardio', met: 10.0, aliases: ['bike fast'] },
  { id: 'jump-rope', name: 'Jump Rope', category: 'cardio', met: 8.8, aliases: ['skipping'] },
  { id: 'rowing-moderate', name: 'Rowing Moderate', category: 'cardio', met: 7.0, aliases: ['row'] },
  { id: 'rowing-vigorous', name: 'Rowing Vigorous', category: 'cardio', met: 8.5, aliases: ['row hard'] },
  { id: 'elliptical', name: 'Elliptical', category: 'cardio', met: 5.0, aliases: ['elliptical machine'] },
  { id: 'stair-climb', name: 'Stair Climber', category: 'cardio', met: 9.0, aliases: ['stairs'] },
  { id: 'hiking', name: 'Hiking', category: 'cardio', met: 6.0, aliases: ['hike'] },
  { id: 'hiit-low', name: 'HIIT Low', category: 'cardio', met: 6.0, aliases: ['hiit easy'] },
  { id: 'hiit-mid', name: 'HIIT Mid', category: 'cardio', met: 8.0, aliases: ['hiit moderate'] },
  { id: 'hiit-high', name: 'HIIT High', category: 'cardio', met: 12.0, aliases: ['hiit intense'] },

  // Swimming
  { id: 'swim-free-mod', name: 'Freestyle Moderate', category: 'swim', met: 5.8, aliases: ['freestyle', 'swim'] },
  { id: 'swim-free-vig', name: 'Freestyle Vigorous', category: 'swim', met: 9.8, aliases: ['freestyle fast'] },
  { id: 'breaststroke', name: 'Breaststroke', category: 'swim', met: 5.3, aliases: ['breast stroke'] },
  { id: 'backstroke', name: 'Backstroke', category: 'swim', met: 4.8, aliases: ['back stroke'] },
  { id: 'butterfly', name: 'Butterfly', category: 'swim', met: 8.0, aliases: [] },

  // Ball Sports
  { id: 'basketball-casual', name: 'Basketball Casual', category: 'ball', met: 6.0, aliases: ['basketball', 'basket'] },
  { id: 'basketball-game', name: 'Basketball Game', category: 'ball', met: 8.0, aliases: ['basketball competitive'] },
  { id: 'soccer-casual', name: 'Soccer Casual', category: 'ball', met: 7.0, aliases: ['football', 'soccer'] },
  { id: 'soccer-game', name: 'Soccer Game', category: 'ball', met: 10.0, aliases: ['football game'] },
  { id: 'badminton', name: 'Badminton', category: 'ball', met: 5.5, aliases: [] },
  { id: 'tennis-singles', name: 'Tennis Singles', category: 'ball', met: 8.0, aliases: ['tennis'] },
  { id: 'tennis-doubles', name: 'Tennis Doubles', category: 'ball', met: 6.0, aliases: ['tennis doubles'] },
  { id: 'table-tennis', name: 'Table Tennis', category: 'ball', met: 4.0, aliases: ['ping pong'] },
  { id: 'volleyball-rec', name: 'Volleyball Recreational', category: 'ball', met: 3.0, aliases: ['volleyball'] },
  { id: 'volleyball-game', name: 'Volleyball Game', category: 'ball', met: 4.0, aliases: ['volleyball competitive'] },

  // Strength & Functional
  { id: 'weight-general', name: 'Weight Training General', category: 'strength', met: 3.5, aliases: ['weights', 'gym'] },
  { id: 'weight-vigorous', name: 'Weight Training Vigorous', category: 'strength', met: 6.0, aliases: ['weights hard'] },
  { id: 'crossfit', name: 'CrossFit/WOD', category: 'strength', met: 5.6, aliases: ['crossfit', 'wod'] },
  { id: 'kettlebell', name: 'Kettlebell', category: 'strength', met: 8.0, aliases: [] },
  { id: 'core-training', name: 'Core Training', category: 'strength', met: 3.8, aliases: ['core', 'abs'] },
  { id: 'pilates', name: 'Pilates', category: 'strength', met: 3.0, aliases: [] },
  { id: 'yoga-flow', name: 'Yoga Flow', category: 'strength', met: 2.5, aliases: ['yoga'] },
  { id: 'yoga-restorative', name: 'Yoga Restorative', category: 'strength', met: 2.0, aliases: ['yoga gentle'] },
  { id: 'stretching', name: 'Stretching', category: 'strength', met: 2.3, aliases: ['stretch'] },
  { id: 'hiit-strength', name: 'HIIT Strength', category: 'strength', met: 8.0, aliases: ['hiit weights'] },

  // Home/Follow-along
  { id: 'ring-fit-low', name: 'Ring Fit Low', category: 'home', met: 3.0, aliases: ['ring fit'] },
  { id: 'ring-fit-mid', name: 'Ring Fit Mid', category: 'home', met: 4.5, aliases: [] },
  { id: 'ring-fit-high', name: 'Ring Fit High', category: 'home', met: 6.0, aliases: [] },
  { id: 'youtube-low', name: 'YouTube Follow-along Low', category: 'home', met: 3.5, aliases: ['youtube workout'] },
  { id: 'youtube-mid', name: 'YouTube Follow-along Mid', category: 'home', met: 5.0, aliases: [] },
  { id: 'youtube-high', name: 'YouTube Follow-along High', category: 'home', met: 7.0, aliases: [] },
];

export const searchWorkouts = (query: string): WorkoutCatalogItem[] => {
  if (!query.trim()) return WORKOUT_CATALOG;
  
  const lowerQuery = query.toLowerCase();
  return WORKOUT_CATALOG.filter(
    workout =>
      workout.name.toLowerCase().includes(lowerQuery) ||
      workout.aliases.some(alias => alias.toLowerCase().includes(lowerQuery))
  );
};

export const calcCalories = ({
  met,
  weightKg,
  minutes,
  intensity = 'mid',
  avgHr,
}: {
  met: number;
  weightKg: number;
  minutes: number;
  intensity?: IntensityKey;
  avgHr?: number;
}): number => {
  const baseCalories = (met * 3.5 * weightKg * minutes) / 200;
  const intensityAdjusted = baseCalories * INTENSITY_COEFF[intensity];
  
  // Simple HR adjustment (if provided)
  let hrMultiplier = 1.0;
  if (avgHr) {
    if (avgHr > 160) hrMultiplier = 1.1;
    else if (avgHr > 140) hrMultiplier = 1.05;
    else if (avgHr < 120) hrMultiplier = 0.95;
  }
  
  return Math.round(intensityAdjusted * hrMultiplier);
};

export const getPopularWorkouts = (): WorkoutCatalogItem[] => {
  return WORKOUT_CATALOG.filter(w => 
    ['walk-brisk', 'jog-easy', 'run-10kph', 'cycle-leisure', 'weight-general', 'yoga-flow'].includes(w.id)
  );
};