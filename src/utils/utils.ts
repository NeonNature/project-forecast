export const getTemperature = (temperature: number): string => {
  return `${(temperature - 273.15).toFixed(0)} °C`;
};
