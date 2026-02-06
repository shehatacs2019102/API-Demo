import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DogContainer from './components/DogContainer'
import WeatherContainer from './components/WeatherContainer'
import JokeContainer from './components/JokeContainer'
import CatContainer from './components/CatContainer'
import Translator from './components/Translator'
function App() {
 
  

  return (
   <div id="root">
      <h1>My API Demo</h1>
      
      <div className="app-container">
        <WeatherContainer />
        <DogContainer />
        <CatContainer/>
        <JokeContainer />
        <Translator/>
      </div>

      <p className="read-the-docs">
        End Of Page
      </p>
    </div>
  )
}

export default App
