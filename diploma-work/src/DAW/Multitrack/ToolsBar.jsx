import { React, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav } from 'react-bootstrap';
import { ToolsStore } from './ToolsStore.tsx';
function ToolsBar() {

    const min = 0;
    const max = 100;
    const middleValue = min + (max - min) / 2; // Obliczenie wartości środkowej
  
    
    
    const {
      isSelectOption,
      isCopyFragOption,
      isCutFragOption,
      isDelFragOption,
      isVolAutoOption,
      isTrashOption,
      turnOnOption
    } = ToolsStore();

    const handleChange = (event) => {
      setZoomValue(event.target.valueAsNumber);
    };

    
    const [ zoomValue, setZoomValue ] = useState(middleValue); 

    

    return(
      <Navbar className="d-flex bg-dark-subtle w-100 justify-content-between" style={{ height: '45px' }}>
        <Nav className='ms-2 gap-2 d-flex '>
        <button type="button" 
        className={`btn py-0 px-1 ${isSelectOption ? 'btn-primary' : 'btn-transparent'}`} 
        onClick={() => turnOnOption('select')}
          data-toggle="tooltip" data-placement="button" title="Select tool">
          <i className='bi text-dark bi-cursor-fill' />
        </button>
        <button type="button" 
        className={`btn py-0 px-1 ${isCopyFragOption ? 'btn-info' : 'btn-transparent'}`} 
        onClick={() => turnOnOption('copy')}
          data-toggle="tooltip" data-placement="button" title="Copy fragment tool">
          <i className='bi text-dark bi-copy' />
        </button>
        <button type="button" 
        className={`btn py-0 px-1 ${isCutFragOption ? 'btn-secondary' : 'btn-transparent'}`} 
        onClick={() => turnOnOption('cut')}
          data-toggle="tooltip" data-placement="button" title="Cut fragment tool">
          <i className='bi text-dark bi-scissors' />
        </button>
        <button type="button" 
        className={`btn py-0 px-1 ${isDelFragOption ? 'btn-warning' : 'btn-transparent'}`} 
        onClick={() => turnOnOption('delete')}
          data-toggle="tooltip" data-placement="button" title="Delete fragment tool">
          <i className='bi text-dark bi-x-octagon' />
        </button>
        <button type="button" 
        className={`btn py-0 px-1 ${isVolAutoOption ? 'btn-success' : 'btn-transparent'}`} 
        onClick={() => turnOnOption('volume')}
          data-toggle="tooltip" data-placement="button" title="Volume Automation tool">
          <i className='bi text-dark bi-bezier2' />
        </button>
        <button type="button" 
        className={`btn py-0 px-1 ${isTrashOption ? 'btn-danger' : 'btn-transparent'}`} 
        onClick={() => turnOnOption('trash')}
          data-toggle="tooltip" data-placement="button" title="Delete track">
          <i className='bi text-dark bi-trash3-fill' />
        </button>
        </Nav>
        <div className='d-flex justify-content-center'>
        <i className='bi text-dark bi-zoom-out me-2' data-toggle="tooltip" title="Zoom Out" />
        <input type="range"
          min={min}
          max={max}
          value={zoomValue} // Użycie stanu
          onChange={handleChange} // Aktualizacja wartości
          step="1"
          id="ZoomRange"
          className="form-range flex-grow-1" style={{ width: '400px' }}
        />
        <i className='bi text-dark bi-zoom-in ms-2' data-toggle="tooltip" title="Zoom In" />
        </div>
        <div className='d-flex justify-content-center'>
        </div>
      </Navbar>
    );
}
export default ToolsBar;