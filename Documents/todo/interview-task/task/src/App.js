import logo from './logo.svg';
import './App.css';
import LandingPage from './components/screens/LandingPage';
import MainRouter from './components/routing/MainRouter';
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
}

export default App;
