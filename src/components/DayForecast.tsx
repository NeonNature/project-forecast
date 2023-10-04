import '../styles/forecast.css';
import DayForecastCard from './DayForecastCard';

const DayForecast = () => {
  return (
    <div className="forecast-container">
      <DayForecastCard time="Sun" icon="01d" temperature="66 C" forecast="Sunny" />
      <DayForecastCard time="Sun" icon="01d" temperature="66 C" forecast="Sunny" />
      <DayForecastCard time="Sun" icon="01d" temperature="66 C" forecast="Sunny" />
      <DayForecastCard time="Sun" icon="01d" temperature="66 C" forecast="Sunny" />
      <DayForecastCard time="Sun" icon="01d" temperature="66 C" forecast="Sunny" />
    </div>
  );
};

export default DayForecast;
