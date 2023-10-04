import { useEffect, useState } from 'react';
import './App.css';
import DayForecast from './components/DayForecast';
import CurrentForecast from './components/CurrentForecast';
import TimeForecast from './components/TimeForecast';

const API_KEY = import.meta.env.VITE_API_KEY;

interface WeatherDetail {
  main: string;
  icon: string;
}

interface TemperatureDetail {
  temp: number;
}

interface WeatherResponseList {
  weather: Array<WeatherDetail>;
  main: TemperatureDetail;
}
interface WeatherResponse {
  city: {
    name: string;
    country: string;
  };
  list: Array<WeatherResponseList>;
}

function App() {
  const [city, setCity] = useState<string>('');
  const [country, setCountry] = useState<string>('');
  const [weatherIcon, setWeatherIcon] = useState<string>('');
  const [weather, setWeather] = useState<string>('');
  const [temperature, setTemperature] = useState<number>(0);

  const getWeatherDetails = (cityName: string, latitude: number, longitude: number) => {
    const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

    fetch(WEATHER_API_URL)
      .then((response) => response.json())
      .then((data: WeatherResponse) => {
        console.log(data);

        setCity(data?.city?.name);
        setCountry(data?.city?.country);
        setWeatherIcon(data?.list?.[0]?.weather?.[0]?.icon);
        setWeather(data?.list?.[0]?.weather?.[0]?.main);
        setTemperature(data?.list?.[0]?.main?.temp);
      })
      .catch(() => {
        alert('An error occurred while fetching the weather forecast!');
      });
  };

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${API_KEY}`;
        fetch(API_URL)
          .then((response) => response.json())
          .then((data) => {
            const { name } = data[0];
            getWeatherDetails(name, latitude, longitude);
          })
          .catch(() => {
            alert('An error occurred while fetching the city name!');
          });
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          alert('Geolocation request denied. Please reset location permission to grant access again.');
        } else {
          alert('Geolocation request error. Please reset location permission.');
        }
      },
    );
  };

  useEffect(() => {
    getUserLocation();
  });

  return (
    <>
      <div className="grid grid-cols-2">
        <CurrentForecast
          city={city}
          country={country}
          weather={weather}
          temperature={temperature}
          weatherIcon={weatherIcon}
        />
        <TimeForecast />
      </div>
      <hr />
      <DayForecast />
    </>
  );
}

export default App;
