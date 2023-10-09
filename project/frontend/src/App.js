import './site-main.css'
import Navigation from "./actions/components/navigation/navigation"
import Homepage from './pages/homepage';



function App() {
  return (
    <div>
      <header className="App-header">
       <Navigation/>
      </header>

      <div className='site-width-container'>

   <Homepage/>
      </div>
    </div>
  );
}

export default App;
