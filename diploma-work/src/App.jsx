// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
//import About from './Pages/About';
import DAW from './DAW/DAW';

const App = () => {
 return (
      <div className='d-flex flex-column' style={{ height: '100svh', overflowX: 'hidden' }}>
            <div className='flex-fill'>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/app" element={<DAW/>} />
          {/*<Route path="/about" element={<About />} />*/}
            </Routes>
            </div>
      </div>
 );
};

export default App;