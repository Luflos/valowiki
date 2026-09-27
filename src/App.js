import { useCallback, useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import axios from 'axios'
import Home from './components/pages/Home';
import Maps from './components/pages/Maps';
import MapDetail from './components/pages/MapDetail';
import Agents from './components/pages/Agents';
import Sidebar from './components/layout/Sidebar';
import ScrollToTop from './components/layout/ScrollToTop';
import Footer from './components/layout/Footer';
import Agent from './components/pages/Agent';
import Weapons from './components/pages/Weapons';
import Compare from './components/pages/Compare';
import Bundles from './components/pages/Bundles';
import Search from './components/pages/Search';
import BundleDetail from './components/pages/BundleDetail';
import Weapon from './components/pages/Weapon';
import Lineups from './components/pages/Lineups';
import AgentLineups from './components/pages/AgentLineups';
import AgentMapLineups from './components/pages/AgentMapLineups';
import Contact from './components/pages/Contact';
import Gameplay from './components/pages/Gameplay';
import PageNotFound from './components/pages/PageNotFound';

const API = 'https://valorant-api.com/v1'

function App() {
  const [agents, setAgents] = useState([])
  const [gameMaps, setGameMaps] = useState([])
  const [weapons, setWeapons] = useState([])
  const [status, setStatus] = useState('loading')
  // Bumping this re-runs the effect, which is what "Try again" does.
  const [attempt, setAttempt] = useState(0)

  const retry = useCallback(() => setAttempt((n) => n + 1), [])

  // The sidebar and every listing page read from these three collections, so
  // they are fetched once here and shared.
  useEffect(() => {
    let cancelled = false
    setStatus('loading')

    Promise.all([
      axios.get(`${API}/agents?isPlayableCharacter=true`),
      axios.get(`${API}/maps`),
      axios.get(`${API}/weapons`),
    ])
      .then(([agentRes, mapRes, weaponRes]) => {
        if (cancelled) return

        setAgents(agentRes.data.data)
        setGameMaps(mapRes.data.data)
        setWeapons(weaponRes.data.data)
        setStatus('ready')
      })
      .catch((error) => {
        if (cancelled) return

        console.error('Valorant API request failed', error)
        setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [attempt])

  const data = { status, onRetry: retry }

  // PUBLIC_URL is empty in dev and on root-domain hosts. On GitHub Pages the
  // deploy workflow sets it to the repository name, which is independent of
  // what the app calls itself.
  return (
    <Router basename={process.env.PUBLIC_URL || "/"}>
      <ScrollToTop />

      {/* Lets keyboard users jump the sidebar, which is long once expanded. */}
      <a className="skip-link" href="#main">Skip to content</a>

      <Sidebar agents={agents} gameMaps={gameMaps} weapons={weapons} />

      <main className="app-main" id="main" tabIndex={-1}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search agents={agents} gameMaps={gameMaps} weapons={weapons} />} />
          <Route path='/maps' element={<Maps gameMaps={gameMaps} {...data} />} />
          <Route path='/maps/:id' element={<MapDetail gameMaps={gameMaps} {...data} />} />
          <Route path='/agents' element={<Agents agents={agents} {...data} />} />
          <Route path='/agents/:id' element={<Agent />} />
          <Route path='/weapons' element={<Weapons weapons={weapons} {...data} />} />
          <Route path='/weapons/:id' element={<Weapon />} />
          <Route path='/compare' element={<Compare weapons={weapons} {...data} />} />
          <Route path='/bundles' element={<Bundles weapons={weapons} {...data} />} />
          <Route path='/bundles/:id' element={<BundleDetail weapons={weapons} {...data} />} />
          <Route path='/lineups' element={<Lineups />} />
          <Route path='/lineups/:agent' element={<AgentLineups />} />
          <Route path='/lineups/:agent/:map' element={<AgentMapLineups gameMaps={gameMaps} agents={agents} />} />
          <Route path='/team' element={<Contact />} />
          <Route path='/gameplay' element={<Gameplay />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>

        <Footer />
      </main>
    </Router>
  );
}

export default App;
