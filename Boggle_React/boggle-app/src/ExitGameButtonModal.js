import './App.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import { getTotalNumberOfSolutions } from './GameBoard';
import { getTotalNumberOfMatches } from './MatchedWordList';
import { getTimeElapsed } from './App';
import { setEndTime } from './App';
import { resetGame } from './App';

function ExitGameModal() {
  const [show, setShow] = useState(false);
  const [totalNumberOfSolutions, setTotalNumberOfSolutions] = useState(getTotalNumberOfSolutions()); 
  const [totalNumberOfMatches, setTotalNumberOfMatches] = useState(getTotalNumberOfMatches());
  const [totalNumberOfSolutionsMissed, setTotalNumberOfSolutionsMissed] = useState(totalNumberOfSolutions - totalNumberOfMatches);
  const [totalTimeElapsed, setTotalTimeElapsed] = useState(getTimeElapsed());
  
  function handleShow() {
    // Stop the timer
    setEndTime();
    setShow(true);
    setTotalNumberOfSolutions(getTotalNumberOfSolutions());
    setTotalNumberOfMatches(getTotalNumberOfMatches());
    setTotalNumberOfSolutionsMissed(getTotalNumberOfSolutions() - getTotalNumberOfMatches());
    setTotalTimeElapsed(getTimeElapsed());
  }
  
  function handleCloseNewGame() {
    setShow(false);
    resetGame();
  }
  
  function handleCloseKeepGame() {
    setShow(false);
  }
  
  return (
    <>
    <Button 
      variant="primary" 
      onClick={handleShow}
      size="lg"
      id="exit-button" 
      className="howard-blue-button opacity-zero d-none"
      >
      Exit Game
    </Button>
    <Modal 
      show={show} 
      onHide={handleCloseNewGame}
      size="lg">
      <Modal.Header>
        <Modal.Title>Thanks for playing! Here are your stats:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <dl>
            <dt>Time elapsed:</dt>
            <dd>{totalTimeElapsed}</dd>
            <dt>Number of words matched:</dt>
            <dd>{totalNumberOfMatches}</dd>
            <dt>Number of words missed:</dt>
            <dd>{totalNumberOfSolutionsMissed}</dd>
          </dl>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="secondary"
          onClick={handleCloseNewGame}
          className="howard-blue-button-small"
        >Exit the game</Button>
        <Button 
          variant="secondary"
          onClick={handleCloseKeepGame}
          className="howard-blue-button-small"
        >Nevermind, I want to keep playing</Button>
      </Modal.Footer>
    </Modal>
    </>
  );
}

export default ExitGameModal;
