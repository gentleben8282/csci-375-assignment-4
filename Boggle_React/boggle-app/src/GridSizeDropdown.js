import './App.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { resetGame } from './App';

var eventKey = null;

function GridSizeDropdown() {
  const [show, setShow] = useState(false);
  
  function handleCloseWithReset() {
    resetGame(Number(eventKey));
    setShow(false);
  }
  
  function handleCloseWithNoReset() {
    setShow(false);
  }
  
  function handleShow(eKey) {
    eventKey = eKey;
    setShow(true);
  }
  
  return (
    <>
      <DropdownButton
        id="grid-size-dropdown-menu"
        variant="secondary"
        size="lg"
        onSelect={(eventKey) => handleShow(eventKey)}
        title="Resize Grid"
        menuRole="menu">
          <Dropdown.Item eventKey="5">5x5</Dropdown.Item>
          <Dropdown.Item eventKey="6">6x6</Dropdown.Item>
          <Dropdown.Item eventKey="7">7x7</Dropdown.Item>
          <Dropdown.Item eventKey="8">8x8</Dropdown.Item>
          <Dropdown.Item eventKey="9">9x9</Dropdown.Item>
          <Dropdown.Item eventKey="10">10x10</Dropdown.Item>
      </DropdownButton>

      <Modal 
      show={show} 
      onHide={handleCloseWithNoReset}
      >
      <Modal.Header>
        <Modal.Title>Wait! Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <p>Resizing the grid will restart your game. Are you sure that you want to resize it?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="primary"
          onClick={handleCloseWithReset}
          className="howard-blue-button-small"
        >Yes, I'm sure</Button>
        <Button 
          variant="primary"
          onClick={handleCloseWithNoReset}
          className="howard-blue-button-small"
        >No, I change my mind</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default GridSizeDropdown;