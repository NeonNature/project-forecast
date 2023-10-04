import '../styles/forecast.css';
import TimeForecastCard from './TimeForecastCard';

const TimeForecast = () => {
  return (
    <div className="time-forecast-container">
      <TimeForecastCard time="Sun" icon="01d" temperature="66 C" forecast="Sunny" />
      <TimeForecastCard time="Sun" icon="01d" temperature="66 C" forecast="Sunny" />
      <TimeForecastCard time="Sun" icon="01d" temperature="66 C" forecast="Sunny" />
      <TimeForecastCard time="Sun" icon="01d" temperature="66 C" forecast="Sunny" />
      <TimeForecastCard time="Sun" icon="01d" temperature="66 C" forecast="Sunny" />
    </div>
  );
};

export default TimeForecast;
