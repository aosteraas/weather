export const formatTime = (time: number): string => {
  return new Date(time * 1000).toLocaleTimeString();
};

export const formatPercent = (value: number): string => {
  return `${(value * 100).toFixed(0)}%`;
};

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const getDay = (value: number): string => {
  const dayOfWeek = new Date(value * 1000).getDay();
  return days[dayOfWeek];
};
