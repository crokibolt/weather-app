import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('');
  const [info, setInfo] = useState({});

  const handleSearchChange = (e) => {
    setCity(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${import.meta.env.VITE_API_URL}?q=${city}&units=metric&APPID=${import.meta.env.VITE_API_KEY}`)
          .then(res => res.json())
          .then(result => {
            setInfo(result);
          })
          .catch(error => {
            setInfo({});
            console.log(info);
          });
  }

  return (
    <>
      <div className="top-bar">
        <h1>Weather App</h1>
        <form className='search-form' onSubmit={handleSubmit}>
          <label htmlFor="city-search">Enter city name</label>
          <input
            name="city-search" 
            id="city-search" 
            type="text" 
            placeholder="Ex. New York" 
            value={city}
            onChange={handleSearchChange}/>
          <button type='submit'>Search</button>
        </form>
      </div>
      {typeof info.main != 'undefined' ? 
        <div className="weather-info">
          <h3>{info.name}</h3>
          <p>Temperature: {info.main.temp}°C</p>
          <p>Sky: {info.weather[0].main}</p>
        </div>
        : <p>City not found</p>
      }
    </>
  )
}

export default App
