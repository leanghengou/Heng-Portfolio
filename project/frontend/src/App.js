import './site-main.css'
import {BrowserRouter as Router, Route, Switch, Routes } from "react-router-dom"
import Navigation from "./actions/components/navigation/navigation"
import Homepage from './pages/homepage';
import About from './pages/about';



function App() {
  return (
    <Router>
    <div>
      <header className="App-header">
       <Navigation/>
      </header>

      <div>
      <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/about" element={<About />} />
      </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
