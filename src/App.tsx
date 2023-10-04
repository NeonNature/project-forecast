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

interface GeolocationResponse {
  lat: number;
  lon: number;
  name: string;
}

function App() {
  const [city, setCity] = useState<string>('Yangon');
  const [country, setCountry] = useState<string>('MM');
  const [weatherIcon, setWeatherIcon] = useState<string>('01d');
  const [weather, setWeather] = useState<string>('Clear');
  const [temperature, setTemperature] = useState<number>(273);
  const [background, setBackground] = useState<string>('clouds');
  const [search, setSearch] = useState<string>('');

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
    // getUserLocation();
  });

  const searchCountry = () => {
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=${API_KEY}`;

    fetch(API_URL)
      .then((response) => response.json())
      .then((data: Array<GeolocationResponse>) => {
        if (!data.length) return alert(`No coordinates found for ${search}`);
        const { lat, lon, name } = data[0];
        getWeatherDetails(name, lat, lon);
      })
      .catch(() => {
        alert('An error occurred while fetching the coordinates!');
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <div className={`page-container ${background}`}>
      <div>
        <div className="mb-4">
          <input
            type="search"
            placeholder="Search Location"
            onChange={handleChange}
            value={search}
            className="search-input"
          />
          <button onClick={searchCountry} type="button" className="search-btn" disabled={search.trim() === ''}>
            Search
          </button>
        </div>
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
        <hr className="my-4" />
        <DayForecast />
      </div>
    </div>
  );
}

export default App;
