import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
          .then(result => setInfo(result))
          .catch(error => {
            console.error(error);
            setInfo({});
          });
  }

  return (
    <>
      <div className="search-bar">
        <form onSubmit={handleSubmit}>
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
      {Object.keys(info).length > 0 &&
        <div className="weather-info">
          <h3>{info.name}</h3>
          <p>Temperature: {info.main.temp}°</p>
          <p>Sky: {info.weather[0].main}</p>
        </div>
      }
    </>
  )
}

export default App
