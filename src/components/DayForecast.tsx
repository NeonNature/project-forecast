import { useMemo } from 'react';
import '../styles/forecast.css';
import DayForecastCard from './DayForecastCard';
import { ForecastDetails } from '../types/types';

interface DayForecastProps {
  forecast: ForecastDetails[];
}

const DayForecast = ({ forecast }: DayForecastProps) => {
  const forecastList: React.ReactElement[] = useMemo(
    () =>
      forecast.map(({ time, temperature, icon, description }: ForecastDetails, index: number) => (
        <DayForecastCard
          key={index.toLocaleString()}
          time={index === 0 ? 'Today' : time}
          icon={icon}
          temperature={temperature}
          description={description}
        />
      )),
    [forecast],
  );
  return <div className="forecast-container grid grid-cols-3 md:grid-cols-6">{forecastList}</div>;
};

export default DayForecast;
