import React, { useState } from "react";
import axios from "axios";
import WeatherChart from "./WeatherChart";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const API_KEY = "57c2734a658c0d23840606ba602446aa"; // Replace with actual OpenWeather API Key

  // ✅ Fetch weather by city name
  const fetchWeather = async () => {
    if (!city) {
      alert("Please enter a city name");
      return;
    }

    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data.list);
    } catch (error) {
      alert("City not found. Try again.");
    }
  };

  // ✅ Fetch weather by geolocation (latitude & longitude)
  const fetchWeatherByLocation = async (lat, lon) => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data.list);
      setCity(weatherResponse.data.name); // ✅ Update city name
    } catch (error) {
      alert("Could not fetch weather for your location.");
    }
  };

  // ✅ Handle "Use My Location" button click
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByLocation(latitude, longitude);
        },
        (error) => {
          alert("Location access denied. Please allow location access.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="weather-container">
      <h2>Weather App</h2>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Get Weather</button>
      <button onClick={getLocation} style={{ marginLeft: "10px" }}>
        Use My Location
      </button>

      {weather && (
        <div className="weather-info">
          <h3>{weather.name}, {weather.sys.country}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p>{weather.weather[0].description}</p>
        </div>
      )}

      {forecast.length > 0 && <WeatherChart forecast={forecast} />}
    </div>
  );
};

export default Weather;