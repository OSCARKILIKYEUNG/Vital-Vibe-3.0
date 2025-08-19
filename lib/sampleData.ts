export type DayPoint = {
  date: string;
  intake: number;
  burned: number;
  budget: number;
  net: number;
};

// Sample data generators for demo purposes

const generateRandomVariation = (base: number, variance: number = 0.2): number => {
  const min = base * (1 - variance);
  const max = base * (1 + variance);
  return Math.random() * (max - min) + min;
};

export const mock7Days = (budget: number = 2000): DayPoint[] => {
  const days: DayPoint[] = [];
  const today = new Date();
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    const intake = generateRandomVariation(budget * 0.9, 0.3);
    const burned = generateRandomVariation(budget * 0.25, 0.4);
    const net = intake - burned;
    
    days.push({
      date: date.toISOString().split('T')[0],
      intake: Math.round(intake),
      burned: Math.round(burned),
      budget,
      net: Math.round(net),
    });
  }
  
  return days;
};

export const mock30Days = (budget: number = 2000): DayPoint[] => {
  const days: DayPoint[] = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    const intake = generateRandomVariation(budget * 0.9, 0.4);
    const burned = generateRandomVariation(budget * 0.25, 0.5);
    const net = intake - burned;
    
    days.push({
      date: date.toISOString().split('T')[0],
      intake: Math.round(intake),
      burned: Math.round(burned),
      budget,
      net: Math.round(net),
    });
  }
  
  return days;
};

export const getTodayData = (data: DayPoint[]): DayPoint | undefined => {
  const today = new Date().toISOString().split('T')[0];
  return data.find(day => day.date === today);
};

export const getDaysWithinBudget = (data: DayPoint[]): number => {
  return data.filter(day => day.net <= day.budget).length;
};

export const getAverageNet = (data: DayPoint[]): number => {
  const sum = data.reduce((acc, day) => acc + day.net, 0);
  return Math.round(sum / data.length);
};

export const getCurrentStreak = (data: DayPoint[]): number => {
  let streak = 0;
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].net <= data[i].budget) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
};