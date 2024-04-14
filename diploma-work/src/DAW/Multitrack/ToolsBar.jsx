import { React, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
function ToolsBar() {

    const min = 0;
    const max = 10;
    const middleValue = min + (max - min) / 2; // Obliczenie wartości środkowej
  
    const [value, setValue] = useState(middleValue); // Ustawienie wartości początkowej na środek
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };

    return(
        <Navbar className="d-flex  bg-dark-subtle w-100 justify-content-between" style={{ height: '40px' }}>
          <Nav className='ms-2 gap-2 d-flex '>
          <button type="button" class="btn py-0 px-1 btn-transparent" data-toggle="tooltip" data-placement="button" title="Select tool">
            <i className='bi text-dark bi-cursor-fill' />
          </button>
          <button type="button" class="btn py-0 px-1 btn-transparent" data-toggle="tooltip" data-placement="button" title="Copy fragment tool">
            <i className='bi text-dark bi-copy' />
          </button>
          <button type="button" class="btn py-0 px-1 btn-transparent" data-toggle="tooltip" data-placement="button" title="Cut fragment tool">
            <i className='bi text-dark bi-scissors' />
          </button>
          <button type="button" class="btn py-0 px-1 btn-transparent" data-toggle="tooltip" data-placement="button" title="Delete fragment tool">
            <i className='bi text-dark bi-x-octagon' />
          </button>
          <button type="button" class="btn py-0 px-1 btn-transparent" data-toggle="tooltip" data-placement="button" title="Volume Automation tool">
            <i className='bi text-dark bi-bezier2' />
          </button>
          </Nav>
          <div className='d-flex justify-content-center'>
            <i className='bi text-dark bi-zoom-out me-2' data-toggle="tooltip" title="Zoom Out" />
            <input type="range" 
            min={min}
            max={max}
            value={value} // Użycie stanu
            onChange={handleChange} // Aktualizacja wartości
            step="1"
            id="customRange"
            className="form-range flex-grow-1" style={{ width: '200px' }}
            />
            <i className='bi text-dark bi-zoom-in ms-2' data-toggle="tooltip" title="Zoom In" />
          </div>
          <div className='d-flex justify-content-center'>
          </div>
        </Navbar>
    );
}
export default ToolsBar;