import React, { useState, useEffect } from 'react';
import './WeatherContainerStyle.css'; // Make sure to import the CSS

export default function WeatherContainer() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // 1. Determine if it is Day or Night based on the hour (6am - 6pm)
  const hour = new Date().getHours();
  const isDayTime = hour >= 6 && hour < 18;

  // 2. Set the custom images
  const dayIcon = "https://img.icons8.com/emoji/96/sun-emoji.png";
  const nightIcon = "https://img.icons8.com/emoji/96/full-moon-emoji.png";

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeather(latitude, longitude);
      },
      () => setError("Location access denied")
    );
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a0ffd84e6258f18b58d248741ac29df4&units=metric`
      );
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError("Failed to fetch weather data");
    }
  };

  if (error) return <div className="WeatherContainer error">Error: {error}</div>;
  if (!weather) return <div className="WeatherContainer loading">Locating...</div>;

  return (
    /* We add a dynamic class here: 'day' or 'night' */
    <div className={`WeatherContainer ${isDayTime ? 'day' : 'night'}`}>
      <h2>{weather.name}</h2>
      <div className="temp-display">{Math.round(weather.main.temp)}°C</div>
      <p>{weather.weather[0].description}</p>
      
      {/* Dynamic Sun/Moon Image */}
      <img 
        className='weatherpicture'
        src={isDayTime ? dayIcon : nightIcon} 
        alt={isDayTime ? "Sun" : "Moon"} 
      />
    </div>
  );
}