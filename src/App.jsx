// App.js
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import DAW from './DAW/DAW';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = () => {
 return (
  <DndProvider backend={HTML5Backend}>
      <div className='d-flex flex-column' style={{ height: '100svh', overflowX: 'hidden' }}>
            <div className='flex-fill'>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/app" element={<DAW/>} />
            </Routes>
            </div>
      </div>
  </DndProvider>
 );
};

export default App;