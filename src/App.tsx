import { useEffect, useState } from 'react';
import './App.css';
import DayForecast from './components/DayForecast';
import CurrentForecast from './components/CurrentForecast';
import TimeForecast from './components/TimeForecast';
import { ForecastDetails, WeatherResponse, GeolocationResponse } from './types/types.ts';

const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
  const [city, setCity] = useState<string>('Yangon');
  const [country, setCountry] = useState<string>('MM');
  const [weatherIcon, setWeatherIcon] = useState<string>('01d');
  const [weather, setWeather] = useState<string>('Clear');
  const [temperature, setTemperature] = useState<number>(273);
  const [search, setSearch] = useState<string>('');
  const [timeList, setTimeList] = useState<ForecastDetails[]>([]);
  const [dayList, setDayList] = useState<ForecastDetails[]>([]);

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

        const tempList: Array<string> = [];
        const tempDayList: Array<ForecastDetails> = [];
        const tempTimeList: Array<ForecastDetails> = [];

        data?.list?.forEach((list) => {
          const day = list.dt_txt.split(' ')?.[0];
          if (!tempList.includes(day)) {
            tempList.push(day);
            tempDayList.push({
              temperature: list.main.temp,
              time: list.dt_txt.split(' ')?.[0],
              icon: list.weather?.[0]?.icon,
            });
          }

          if (tempList.length < 2) {
            tempTimeList.push({
              temperature: list.main.temp,
              time: list.dt_txt.split(' ')?.[1],
              icon: list.weather?.[0]?.icon,
            });
          }
        });

        setTimeList(tempTimeList);
        setDayList(tempDayList);
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
  }, []);

  const searchCountry = () => {
    const API_URL = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=${API_KEY}`;
    setSearch('');

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

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.key === 'Enter') {
      searchCountry();
    }
  };

  return (
    <div className={`page-container`}>
      <div>
        <div className="mb-4">
          <input
            type="search"
            placeholder="Search Location"
            onChange={(e) => handleChange(e)}
            onKeyDown={(e) => handleSubmit(e)}
            value={search}
            className="search-input"
          />
          <button onClick={() => searchCountry()} type="button" className="search-btn" disabled={search.trim() === ''}>
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
          <TimeForecast forecast={timeList} />
        </div>
        <hr className="my-4" />
        <DayForecast forecast={dayList} />
      </div>
    </div>
  );
}

export default App;
