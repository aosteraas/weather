interface IFormatter {
  time(value: number): string;
  percent(value: number): string;
  temp(value: number): string;
  wind(value: number): string;
}
export const format: IFormatter = {
  time,
  temp,
  percent,
  wind
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

function wind(value: number): string {
  return `${value.toFixed(0)}`;
}

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const getDay = (value: number): string => {
  const dayOfWeek = new Date(value * 1000).getDay();
  return days[dayOfWeek];
};
