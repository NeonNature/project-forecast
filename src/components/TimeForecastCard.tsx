import '../styles/forecast.css';
import { ForecastCardProps } from '../types/types';
import { getTemperature } from '../utils/utils';

const TimeForecastCard: React.FC<ForecastCardProps> = ({ time, icon, temperature, description }) => {
  return (
    <div className="forecast-card">
      <div className="flex">
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} />
        <div className="flex items-center justify-around w-full">
          <p>{`${time.slice(0, -3)}`}</p>
          <p>{getTemperature(temperature)}</p>
        </div>
      </div>
    </div>
  );
};

export default TimeForecastCard;
