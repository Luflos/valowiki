import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom'
import Home from './components/pages/Home';
import Maps from './components/pages/Maps';
import Agents from './components/pages/Agents';


function App() {
  return (
    <Router>
      <Routes>

        <Route 
          path = '/'
          element = {<Home />}
        />

        <Route 
          path = '/maps'
          element = {<Maps />}
        />

        <Route 
          path = '/agents'
          element = {<Agents />}
        />

      </Routes>

    </Router>
  );
}

export default App;
