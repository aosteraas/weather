export const formatTime = (time: number): string => {
  return new Date(time * 1000).toLocaleTimeString();
};

export const formatPercent = (value: number): string => {
  return `${(value * 100).toFixed(0)}%`;
};
