'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { getCurrentWeather } from './_lib/weather';
import WeatherIcon from './components/weathericon'; // Import the WeatherIcon component

export default function Home() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleSearch = async () => {
    try {
      const weatherData = await getCurrentWeather(location);
      setWeather(weatherData.current);
      setForecast(weatherData.forecast.forecastday);
    } catch (error) {
      return;
    }
  };

  const getDayLabel = (index: number, date: string) => {
    if (index === 0) return 'Today';
    if (index === 1) return 'Tomorrow';
    return new Date(date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div
        className="bg-white border-4 border-black rounded-lg shadow-lg p-6 w-full max-w-4xl"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          SkyForm Weather
        </motion.h1>
        <div className="flex flex-col md:flex-row items-center mb-4">
          <motion.input
            type="text"
            placeholder="Enter location"
            className="border-4 border-black rounded-lg py-2 px-4 mb-2 md:mb-0 md:mr-2 text-lg md:text-xl lg:text-2xl font-bold w-full md:w-auto"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          />
          <motion.button
            className="bg-yellow-500 hover:bg-yellow-600 text-black border-4 border-black rounded-lg py-2 px-4 text-lg md:text-xl lg:text-2xl font-bold w-full md:w-auto"
            onClick={handleSearch}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Search
          </motion.button>
        </div>
        {weather && (
          <motion.div
            className="flex flex-col md:flex-row items-center mb-4 border-4 border-black p-4 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <WeatherIcon size={50} condition={(weather as any).condition.text} /> {/* Add the WeatherIcon component */}
            <div className="flex items-center md:ml-4 mt-2 md:mt-0">
              <span className="text-2xl md:text-3xl lg:text-4xl font-extrabold ml-2">{(weather as any).temp_f}°F</span>
            </div>
            <div className="flex flex-col md:ml-4 mt-2 md:mt-0">
              <span className="text-xl md:text-2xl lg:text-3xl font-bold">{location}</span>
              <span className="text-lg md:text-xl lg:text-2xl text-gray-700">{(weather as any).condition.text}</span>
            </div>
          </motion.div>
        )}
        {forecast && (
          <motion.div
            className="mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2">Weekly Forecast</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
              {(forecast as any[]).map((day: any, index: number) => (
                <motion.div
                  key={day.date}
                  className="bg-gray-200 border-4 border-black rounded-lg p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-center mb-2">
                    <WeatherIcon size={50} condition={day.day.condition.text} /> {/* Add the WeatherIcon component */}
                    <span className="ml-2 text-lg md:text-xl lg:text-2xl font-bold whitespace-normal">{getDayLabel(index, day.date)}</span>
                  </div>
                  <div className="flex justify-between text-lg md:text-xl lg:text-2xl font-bold">
                    <span>{day.day.maxtemp_f}°F</span>
                    <span>{day.day.mintemp_f}°F</span>
                  </div>
                  <div className="text-gray-700">{day.day.condition.text}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}