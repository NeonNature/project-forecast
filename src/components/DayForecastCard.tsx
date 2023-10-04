import '../styles/forecast.css';

interface DayForecastCardProps {
  time: string;
  icon: string;
  temperature: string;
  forecast: string;
}

const DayForecastCard: React.FC<DayForecastCardProps> = ({ time, icon, temperature, forecast }) => {
  return (
    <div className="forecast-card">
      <p>{time}</p>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
      <p>{temperature}</p>
      <p>{forecast}</p>
    </div>
  );
};

export default DayForecastCard;
