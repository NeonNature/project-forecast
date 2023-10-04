import '../styles/forecast.css';
import { getTemperature } from '../utils/utils';

interface DayForecastCardProps {
  time: string;
  icon: string;
  temperature: number;
  description: string;
}

const DayForecastCard: React.FC<DayForecastCardProps> = ({ time, icon, temperature, description }) => {
  const displayTime = time.substring(0, 5).replace('-', '/');
  return (
    <div className="forecast-card">
      <p>{displayTime}</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} />
      <p>{getTemperature(temperature)}</p>
    </div>
  );
};

export default DayForecastCard;
