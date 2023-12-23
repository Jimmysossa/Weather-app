import { useEffect, useState  } from 'react';
import './App.css';
import axios, { Axios } from 'axios';
import WeatherCard from './components/WeatherCard';


function App() {
 
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temp, setTemp] = useState()
  const [isLoading, setIsLoading] = useState (true)

  const success = pos => {
    const obj = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    }
    setCoords(obj)
  }

  useEffect (() => {
    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() => {
    if(coords) {

      const apikey = "33abb1ec098b1048a6add17c2985e574"
      const {lat, lon} = coords
      
      const url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`
      
       axios.get(url)
        .then(res => {
          setWeather (res.data)
          const obj = {
            celsius: (res.data.main.temp - 273.15).toFixed(1),
            farenheit: ((res.data.main.temp - 273.15) * 9/5 + 32).toFixed(1)
          }
          setTemp(obj)
          })
        .catch(err => console.log(err))
        .finally(()=> setIsLoading(false))
    }
  }, [coords]) 
  
  return (
    <div className='app'>
      {
        isLoading
          ? <video src='./public/loanding.mp4' autoPlay muted loop className='loanding'></video>
          : ( 
            <WeatherCard weather={weather}  
            temp= {temp}
            />
          )
      }
    </div>
  )
}

export default App
