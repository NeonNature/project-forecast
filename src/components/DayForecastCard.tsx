import '../styles/forecast.css';
import { ForecastCardProps } from '../types/types';
import { getTemperature } from '../utils/utils';

const DayForecastCard: React.FC<ForecastCardProps> = ({ time, icon, temperature, description }) => {
  const displayTime = time !== 'Today' ? time.substring(5).replace('-', '/') : time;
  return (
    <div className="forecast-card">
      <p>{displayTime}</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} />
      <p>{getTemperature(temperature)}</p>
    </div>
  );
};

export default DayForecastCard;
