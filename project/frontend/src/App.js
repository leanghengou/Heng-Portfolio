import './site-main.css'
import Navigation from "./actions/components/navigation/navigation"
import IntroSection from './actions/components/introduction-section/intro-section';


function App() {
  return (
    <div>
      <header className="App-header">
       <Navigation/>
      </header>

      <div className='site-width-container'>


    <IntroSection/>
      </div>
    </div>
  );
}

export default App;
