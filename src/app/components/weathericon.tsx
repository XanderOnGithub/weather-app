import React from 'react';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm, WiFog, WiDayCloudy } from 'react-icons/wi';

interface WeatherIconProps {
  condition: string;
  size?: number; // Optional size prop
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ condition, size = 24 }) => {
  const getIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return <WiDaySunny size={size} />;
      case 'cloudy':
        return <WiCloud size={size} />;
      case 'partly cloudy':
        return <WiDayCloudy size={size} />;
      case 'rain':
      case 'patchy rain nearby':
      case 'showers':
        return <WiRain size={size} />;
      case 'snow':
        return <WiSnow size={size} />;
      case 'thunderstorm':
        return <WiThunderstorm size={size} />;
      case 'fog':
        return <WiFog size={size} />;
      default:
        return <WiDaySunny size={size} />; // Default to sunny if condition is unknown
    }
  };

  return <div>{getIcon(condition)}</div>;
};

export default WeatherIcon;