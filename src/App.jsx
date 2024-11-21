import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonList from './pages/PokemonList';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonList />} />
      </Routes>
    </Router>
  )
};

export default App;