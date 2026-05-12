import { useState, useEffect, useCallback } from 'react';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  condition: string;
  forecast?: ForecastDay[];
}

export interface ForecastDay {
  date: string;
  temp: number;
  description: string;
  icon: string;
}

export function useWeatherAPI(city: string = 'Kigali') {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = useCallback(async (searchCity: string) => {
    setLoading(true);
    try {
      // Current Weather
      const currentRes = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(searchCity)}&units=metric&appid=${API_KEY}`
      );
      if (!currentRes.ok) throw new Error('City not found');
      const currentData = await currentRes.json();

      // Forecast (5 days / 3 hours)
      const forecastRes = await fetch(
        `${BASE_URL}/forecast?q=${encodeURIComponent(searchCity)}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastRes.json();

      const dailyForecast: ForecastDay[] = [];
      if (forecastRes.ok) {
        // Simple logic to get one forecast per day (around noon)
        const seenDates = new Set();
        for (const item of forecastData.list) {
          const date = item.dt_txt.split(' ')[0];
          if (!seenDates.has(date) && dailyForecast.length < 5) {
            seenDates.add(date);
            dailyForecast.push({
              date,
              temp: Math.round(item.main.temp),
              description: item.weather[0].description,
              icon: item.weather[0].icon,
            });
          }
        }
      }

      setWeather({
        city: currentData.name,
        temperature: Math.round(currentData.main.temp),
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        humidity: currentData.main.humidity,
        windSpeed: currentData.wind.speed,
        condition: currentData.weather[0].main,
        forecast: dailyForecast,
      });
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather');
      // Fallback
      setWeather({
        city: searchCity,
        temperature: 22,
        description: 'Partly cloudy',
        icon: '02d',
        humidity: 65,
        windSpeed: 12,
        condition: 'Clouds',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather(city);
  }, [city, fetchWeather]);

  return { weather, loading, error, refetch: fetchWeather };
}
