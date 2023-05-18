import React from 'react'

function Navbar({handleSubmit, handleChange, city}) {
  return (
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
            onChange={handleChange}/>
          <button type='submit'>Search</button>
        </form>
      </div>
  )
}

export default Navbar