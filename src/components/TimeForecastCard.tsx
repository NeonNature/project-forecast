import '../styles/forecast.css';

interface TimeForecastCardProps {
  time: string;
  icon: string;
  temperature: number;
}

const TimeForecastCard: React.FC<TimeForecastCardProps> = ({ time, icon, temperature }) => {
  return (
    <div className="forecast-card">
      <div className="flex">
        <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="" />
        <div className="flex items-center justify-around w-full">
          <p>{`${time.slice(0, -3)}`}</p>
          <p>{`${(temperature - 273.15).toFixed(0)} °C`}</p>
        </div>
      </div>
    </div>
  );
};

export default TimeForecastCard;
