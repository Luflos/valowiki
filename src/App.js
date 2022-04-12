import './App.css';
import {useState, useEffect} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import Home from './components/pages/Home';
import Maps from './components/pages/Maps';
import Agents from './components/pages/Agents';
import axios from 'axios'


function App() {
  
  // Declaring states
  const [agents, setAgents] = useState([])
  const [gameMaps, setGameMaps] = useState([])


  // useEffect to get agent data from the Valorant API
useEffect(() => {
  axios.get('https://valorant-api.com/v1/agents')
    .then((response) => {
      setAgents(response.data.data)
    })
    .catch((error) => {
      console.log(error)
    })
}, [] )

// useEffect to get map data from the Valorant API
useEffect(() => {
  axios.get('https://valorant-api.com/v1/maps')
    .then((response) => {
      setGameMaps(response.data.data)
    })
    .catch((error) => {
      console.log(error)
    })
}, [] )

  return (
    <Router>
      <Routes>

        <Route 
          path = '/'
          element = {<Home />}
        />

        <Route 
          path = '/maps'
          element = {<Maps gameMaps={gameMaps}/>}
        />

        <Route 
          path = '/maps/:id'
          element = {<MapDetails gameMaps={gameMaps}/>}
        />

        <Route 
          path = '/agents'
          element = {<Agents agents={agents}/>}
        />

      </Routes>

    </Router>
  );
}

export default App;
