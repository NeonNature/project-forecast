export interface WeatherDetail {
  description: string;
  main: string;
  icon: string;
}

export interface TemperatureDetail {
  temp: number;
}

export interface WeatherResponseList {
  weather: Array<WeatherDetail>;
  main: TemperatureDetail;
  dt_txt: string;
}

export interface WeatherResponse {
  city: {
    name: string;
    country: string;
  };
  list: Array<WeatherResponseList>;
}

export interface GeolocationResponse {
  lat: number;
  lon: number;
  name: string;
}

export interface ForecastDetails {
  time: string;
  icon: string;
  temperature: number;
  description: string;
}
