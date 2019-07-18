interface IFormatter {
  time(value: number): string;
  percent(value: number): string;
  temp(value: number): string;
  round(value: number): string;
  minutesAgo(value: number): number;
  tsToDay(value: number): string;
}
export const format: IFormatter = {
  time,
  temp,
  percent,
  round,
  minutesAgo,
  tsToDay: getDay
};

function time(time: number): string {
  return new Date(time * 1000).toLocaleTimeString();
}

function temp(value: number): string {
  return `${value.toFixed(1)}º`;
}

function percent(value: number): string {
  return `${(value * 100).toFixed(0)}%`;
}

function round(value: number): string {
  return `${value.toFixed(0)}`;
}

function minutesAgo(value: number): number {
  const ts = new Date(value * 1000).getTime();
  const now = new Date().getTime();
  const diff = (ts - now) / 1000 / 60;
  return Math.abs(Math.round(diff));
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function getDay(value: number): string {
  const dayOfWeek = new Date(value * 1000).getDay();
  return days[dayOfWeek];
}
