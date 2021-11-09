import './App.css';
import { startGame } from './App';

function StartButton() {
  return (
    <button 
      type="button" 
      id="start-button" 
      className="btn btn-primary btn-lg howard-blue-button"
      onClick={() => startGame()}>Start Game</button>
  );
}

export default StartButton;
