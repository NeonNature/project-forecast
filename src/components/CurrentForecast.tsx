import '../styles/forecast.css';

interface CurrentForecastProps {
  city: string;
  country: string;
  weatherIcon: string;
  temperature: number;
  weather: string;
}

const CurrentForecast: React.FC<CurrentForecastProps> = ({ city, country, weatherIcon, temperature, weather }) => {
  return (
    <div className="current-forecast-container">
      <p>
        {city}, {country}
      </p>
      <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="" />
      <p>{`${(temperature - 273.15).toFixed(2)} °C`}</p>
      <p>{weather}</p>
    </div>
  );
};

export default CurrentForecast;
