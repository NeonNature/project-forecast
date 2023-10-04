import { useMemo } from 'react';
import '../styles/forecast.css';
import TimeForecastCard from './TimeForecastCard';
import { ForecastDetails } from '../types/types';

interface TimeForecastProps {
  forecast: ForecastDetails[];
}

const TimeForecast = ({ forecast }: TimeForecastProps) => {
  const forecastList: React.ReactElement[] = useMemo(
    () =>
      forecast.map(({ time, temperature, icon, description }: ForecastDetails, index: number) => (
        <TimeForecastCard
          key={index.toLocaleString()}
          time={time}
          icon={icon}
          temperature={temperature}
          description={description}
        />
      )),
    [forecast],
  );
  return <div className="time-forecast-container">{forecastList}</div>;
};

export default TimeForecast;
