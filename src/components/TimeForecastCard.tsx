import '../styles/forecast.css';

interface TimeForecastCardProps {
  time: string;
  icon: string;
  temperature: string;
  forecast: string;
}

const TimeForecastCard: React.FC<TimeForecastCardProps> = ({ time, icon, temperature, forecast }) => {
  return (
    <div className="forecast-card">
      <div className="flex">
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
        <div className="flex items-center justify-around w-full">
          <p>{time}</p>
          <p>{temperature}</p>
          <p>{forecast}</p>
        </div>
      </div>
    </div>
  );
};

export default TimeForecastCard;
