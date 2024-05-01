import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Button, Modal } from 'react-bootstrap';
import { ToolsStore } from './ToolsStore.tsx';
function ToolsBar() {

    const min = 0;
    const max = 100;
    const middleValue = min + (max - min) / 2; // Obliczenie wartości środkowej
  
    const [showHelp, setShowHelp] = useState(false);

    const handleCloseHelp = () => setShowHelp(false);
    const handleShowHelp = () => setShowHelp(true);  
    
    const {
      isSelectOption,
      isCutFragOption,
      isDelFragOption,
      isMuteFragOption,
      isTrashOption,
      isSpeedOption,
      isReverseOption,
      isTextFormatOption,
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
          data-toggle="tooltip" data-placement="button" title="Select Tool">
          <i className='bi text-dark bi-cursor-fill' />
        </button>

        <button type="button" 
        className={`btn py-0 px-1 ${isCutFragOption ? 'btn-secondary' : 'btn-transparent'}`} 
        onClick={() => turnOnOption('cut')}
          data-toggle="tooltip" data-placement="button" title="Cut Fragment Tool">
          <i className='bi text-dark bi-scissors' />
        </button>
        <button type="button" 
        className={`btn py-0 px-1 ${isDelFragOption ? 'btn-warning' : 'btn-transparent'}`} 
        onClick={() => turnOnOption('delete')}
          data-toggle="tooltip" data-placement="button" title="Delete Fragment Tool">
          <i className='bi text-dark bi-x-octagon' />
        </button>
        <button type="button" 
        className={`btn py-0 px-1 ${isMuteFragOption ? 'btn-success' : 'btn-transparent'}`} 
        onClick={() => turnOnOption('mute')}
          data-toggle="tooltip" data-placement="button" title="Mute Fragment Volume Tool">
          <i className='bi text-dark bi-option' />
        </button>
        <button type="button" 
        className={`btn py-0 px-1 ${isTrashOption ? 'btn-danger' : 'btn-transparent'}`} 
        onClick={() => turnOnOption('trash')}
          data-toggle="tooltip" data-placement="button" title="Delete Track Tool">
          <i className='bi text-dark bi-trash3-fill' />
        </button>

        <button type="button" 
        className={`btn py-0 px-1 ${isSpeedOption ? 'btn-info' : 'btn-transparent'}`} 
        onClick={() => turnOnOption('speed')}
          data-toggle="tooltip" data-placement="button" title="Change Speed Fragment Track Tool">
          <i className='bi text-dark bi-cassette-fill' />
        </button>

        <button type="button" 
        className={`btn py-0 px-1 ${isReverseOption ? 'btn-success' : 'btn-transparent'}`} 
        onClick={() => turnOnOption('reverse')}
          data-toggle="tooltip" data-placement="button" title="Reverse Fragment Track Tool">
          <i className='bi text-dark bi-skip-backward-fill' />
        </button>
        <button type="button" 
        className={`btn py-0 px-1 ${isTextFormatOption ? 'btn-secondary' : 'btn-transparent'}`} 
        onClick={() => turnOnOption('textFormat')}
          data-toggle="tooltip" data-placement="button" title="Change Text Track Tool">
          <i className='bi text-dark bi-textarea-t' />
        </button>
        </Nav>
        <div className='d-flex justify-content-center'>
        <i className='bi text-dark bi-zoom-out me-2' data-toggle="tooltip" title="Zoom Out" />
        <input type="range"
          min={min}
          max={max}
          value={zoomValue} // Użycie stanu
          onChange={handleChange} // Aktualizacja wartości
          step="0.1"
          id="ZoomRange"
          className="form-range flex-grow-1" style={{ width: '400px' }}
        />
        <i className='bi text-dark bi-zoom-in ms-2' data-toggle="tooltip" title="Zoom In" />
        </div>
        <div className='d-flex justify-content-center'>
          <Button variant="link" onClick={handleShowHelp}>
            <i className="bi text-secondary bi-question-circle-fill"></i>
          </Button>
        </div>
        <div className='d-flex'/>
        <Modal show={showHelp} onHide={handleCloseHelp}>
        <Modal.Header closeButton>
          <Modal.Title>Help Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span class="badge badge-pill bg-black">Left-click</span> to select the region you want to edit<br/>
          <span class="badge badge-pill bg-dark">Right-click</span> to confirm your selection and edit the sound<br/>
          <span class="badge badge-pill bg-primary"><i className='bi text-dark bi-cursor-fill' /></span> to select a track, move it, or automate the volume<br/>
          <span class="badge badge-pill bg-warning"><i className='bi text-dark bi-x-octagon' /></span> to cut out a specific segment and remove the rest<br/>
          <span class="badge badge-pill bg-success"><i className='bi text-dark  bi-option' /></span> to mute a specific segment<br/>
          <span class="badge badge-pill bg-danger"><i className='bi text-dark bi-trash3-fill' /></span> to delete an audio layer<br/>
          <span class="badge badge-pill bg-info"><i className='bi text-dark bi-cassette-fill' /></span> to speed up or slow down a specific segment<br/>
          <span class="badge badge-pill bg-success"><i className='bi text-dark bi-skip-backward-fill' /></span> to reverse the audio in a specific segment<br/>
          <span class="badge badge-pill bg-secondary"><i className='bi text-dark bi-textarea-t' /></span> to change the audio name<br/>

        </Modal.Body>
      </Modal>
      </Navbar>
    );
}
export default ToolsBar;