import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import WeatherInfo from './components/WeatherInfo';

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
      <Navbar 
        handleSubmit={handleSubmit} 
        handleChange={handleSearchChange} 
        city={city}/>

      {!infoIsEmpty() ? 
        <WeatherInfo info={info} infoKey={infoKey} />
        : null
      }
      <h2 id="not-found"></h2>
    </>
  )
}

export default App
