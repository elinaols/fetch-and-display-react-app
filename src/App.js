import './App.css';
import Header from './components/header.js';
import Restaurants from './components/restaurants';
import Hero from './components/hero';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Header/>
      </div>
      <div className='App-hero'>
        <Hero/>
      </div>
      <div className='App-restaurants'>
        <Restaurants/>
      </div>
    </div>
  );
}

export default App;
