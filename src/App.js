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
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Map from './components/pages/Map';
import Agent from './components/pages/Agent';
import Weapons from './components/pages/Weapons';
import Weapon from './components/pages/Weapon';
import Lineups from './components/pages/Lineups';

function App() {
  
  // Declaring states
  const [agents, setAgents] = useState([])
  const [gameMaps, setGameMaps] = useState([])
  const [weapons, setWeapons] = useState([])
  const [news, setNews] = useState([])


  // useEffect to get agent data from the Valorant API
useEffect(() => {
  axios.get('https://valorant-api.com/v1/agents?isPlayableCharacter=true')
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

// useEffect to get weapons data from the Valorant API
useEffect(() => {
  axios.get('https://valorant-api.com/v1/weapons')
    .then((response) => {
      setWeapons(response.data.data)
    })
    .catch((error) => {
      console.log(error)
    })
}, [] )

var config = {
  method: 'get',
  url: 'https://vlrggapi.herokuapp.com/news',
  headers: {
    'accept': 'application/json'
  }
}

  return (
    <Router>
      <Navbar />
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
          element = {<Map />}
        />

        <Route 
          path = '/agents'
          element = {<Agents agents={agents}/>}
        />

        <Route 
          path = '/agents/:id'
          element ={<Agent />}
        />

        <Route 
          path = '/weapons'
          element ={<Weapons weapons={weapons} />}
        />

        <Route 
          path = '/weapons/:id'
          element ={<Weapon />}
        />

        <Route 
          path='/lineups'
          element={<Lineups />}
        />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
