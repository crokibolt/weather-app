import React from 'react'

function WeatherInfo({info, infoKey}) {
  return (
    <div key={infoKey} className="weather-info">
        <h1>{info.name}, {info.sys.country}</h1>
        <p>
            <i>
              {info.weather[0].description.toUpperCase()}  
            </i>
            <img src={`${import.meta.env.VITE_ICON_URL + info.weather[0].icon}.png`} />
        </p>
        <p>Temperature: {info.main.temp}°C</p>
        <p>Wind: {info.wind.speed} m/s</p>
        <p>Humidity: {info.main.humidity}%</p>
    </div>
  )
}

export default WeatherInfo