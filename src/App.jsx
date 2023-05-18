import { useState } from 'react'
import './App.css'

const regex = /^[A-Za-z\s]+$/;

function App() {
  const [city, setCity] = useState('');
  const [info, setInfo] = useState({});
  const [infoKey, setInfoKey] = useState(Math.random());

  const handleSearchChange = (e) => {
    setCity(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const notFound = document.querySelector('#not-found');
    setCity('');

    if(city.length > 0 && regex.test(city)){
      try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}?q=${city}&units=metric&APPID=${import.meta.env.VITE_API_KEY}`);
  
        if(!response.ok) {
          throw('Not found')
        }
  
        const json = await response.json();
        setInfo(json);
        setInfoKey(Math.random());
        console.log(json);
        notFound.textContent = '';

      }catch(error){
  
        setInfo({});
        notFound.textContent = 'City not found'
      };
    }
  }

  const infoIsEmpty = () => {
    return Object.keys(info).length === 0;
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
      {!infoIsEmpty() ? 
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
        : null
      }
      <h2 id="not-found"></h2>
    </>
  )
}

export default App
