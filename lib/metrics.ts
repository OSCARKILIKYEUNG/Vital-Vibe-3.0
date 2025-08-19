export type DayPoint = {
  date: string;
  intake: number;
  burned: number;
  budget: number;
  net: number;
};

export type UserProfile = {
  sex: 'male' | 'female';
  weightKg: number;
  heightCm: number;
  ageYears: number;
  activityFactor: number;
  goalOffset: number;
};

export const rmrMifflinStJeor = ({
  sex,
  weightKg,
  heightCm,
  ageYears,
}: Pick<UserProfile, 'sex' | 'weightKg' | 'heightCm' | 'ageYears'>): number => {
  const baseBmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  return sex === 'male' ? baseBmr + 5 : baseBmr - 161;
};

export const dailyBudget = ({
  rmr,
  activityFactor,
  goalOffset,
}: {
  rmr: number;
  activityFactor: number;
  goalOffset: number;
}): number => {
  return Math.round(rmr * activityFactor + goalOffset);
};

export const todayRemaining = (budget: number, intake: number, burned: number): number => {
  return budget - intake + burned;
};

export const kcalPerMinuteByMET = (weightKg: number, met: number): number => {
  return (met * 3.5 * weightKg) / 200;
};

export const estimateMinutesToBurn = (
  excessKcal: number,
  weightKg: number,
  met: number = 4.3
): number => {
  const kcalPerMinute = kcalPerMinuteByMET(weightKg, met);
  return Math.ceil(excessKcal / kcalPerMinute);
};

export const getCalorieStatus = (remaining: number): 'safe' | 'near' | 'over' => {
  if (remaining >= 100) return 'safe';
  if (remaining >= 0) return 'near';
  return 'over';
};

export const formatNumber = (num: number): string => {
  return Math.round(num).toLocaleString();
};