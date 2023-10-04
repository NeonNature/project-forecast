import '../styles/forecast.css';

interface DayForecastCardProps {
  time: string;
  icon: string;
  temperature: number;
}

const DayForecastCard: React.FC<DayForecastCardProps> = ({ time, icon, temperature }) => {
  const displayTime = time.slice(0, 4).replace('-', '/');
  return (
    <div className="forecast-card">
      <p>{displayTime}</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
      <p>{`${(temperature - 273.15).toFixed(0)} °C`}</p>
    </div>
  );
};

export default DayForecastCard;
