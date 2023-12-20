import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButton from './components/TopButton';
import Input from './components/Input';
import TimeLocation from './components/TimeAndLocation';
import TimeAndLocation from './components/TimeAndLocation';
import TemperaturAndDetails from './components/TemperaturAndDetails';
import Forecast from './components/Forecast';
import getWeatherData from './services/weatherServices';
import getFormattedWeatherData from './services/weatherServices';
import { useEffect, useState } from 'react';


function App() { 

const [query, setQuery] = useState({q: 'berlin'});
const [units, setUnits] = useState('metic');
const [weather, setWeather] = useState(null)

 useEffect(() => {
  const fetchWeather = async () => { 
    const data = await getFormattedWeatherData(...query, units).then(data => {
      setWeather(data)
    })
    console.log(data);
 }

 fetchWeather();
 }, [query, units]);

  return (
    <>
    <div className="mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl
     shadow-gray-400">
      <TopButton />
      <Input />
        <div >
      <TimeAndLocation />
      <TemperaturAndDetails />

      <Forecast title="hourly forecast"/> 
      <Forecast title="daily   forecast"/> 
      </div>

     </div>
    </>

  );
}

export default App;
