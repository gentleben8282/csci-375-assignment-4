import logo from './logo-with-alpha-162x162.png';
import './App.css';
import WordEntry from './WordEntry';
import GridSizeDropdown from './GridSizeDropdown';
import MatchedWordList from './MatchedWordList';
import StartButton from './StartButton';
import ExitGameButtonModal from './ExitGameButtonModal';
import GameBoard from './GameBoard';
import GameMessage from './GameMessage';
import { getGridData } from './GameBoard';
import $ from 'jquery';

let startTime = null;
let endTime = null;

export function setStartTime() {
  startTime = new Date();
}

export function setEndTime() {
  endTime = new Date();
}

export function getTimeElapsed() {
  let timeElapsed = endTime - startTime;
  let minutes = 0;
  let secondsRemainder = 0;
  // Strip out the milliseconds and round to the closest number of seconds
  timeElapsed /= 1000
  timeElapsed = Math.round(timeElapsed);
  minutes = Math.floor(timeElapsed / 60);
  secondsRemainder = timeElapsed - minutes * 60;
  return (timeElapsed >= 60) ? minutes.toString().concat(" minute(s) : ") + secondsRemainder.toString() + " second(s)" : 
    timeElapsed.toString() + " second(s)"; 
}

export function startGame() {
  // Start the timer
  setStartTime();
  
  // Hide the start button
  $("button#start-button").addClass("opacity-zero");
  $("button#start-button").addClass("d-none");
  
  // Hide the background image
  $("div#body-row").addClass("no-background-image");
  
  // Show the word submission form
  $("form#word-search-form").removeClass("opacity-zero");
  $("form#word-search-form").removeClass("d-none");
  
  // Show the grid size dropdown
  $("button#grid-size-dropdown-menu").show(400);
  
  // Show the game board
  $("div#game-board").removeClass("opacity-zero");
  $("div#game-board").removeClass("d-none");
  
  // Show the game message
  $("div#game-message").removeClass("opacity-zero");
  $("div#game-message").removeClass("d-none");
  
  // Show the matched word list
  $("div#matched-word-list").removeClass("opacity-zero");
  
  // Show the exit game button
  $("button#exit-button").removeClass("opacity-zero");
  $("button#exit-button").removeClass("d-none");
}

export function resetGame(gridSize) {
  // Restart timer
  setStartTime();
  
  // Populate the grid
  getGridData(gridSize);

  // Show the start button
  $("button#start-button").removeClass("opacity-zero");
  $("button#start-button").removeClass("d-none");

  // Show the background image
  $("div#body-row").removeClass("no-background-image");

  // Hide the word submission form
  $("form#word-search-form").addClass("opacity-zero");
  $("form#word-search-form").addClass("d-none");

  // Reset the text box
  $("input#word-search-textbox").val("");

  // Hide the grid size dropdown
  $("button#grid-size-dropdown-menu").hide(400);

  // Hide the game board
  $("div#game-board").addClass("opacity-zero");
  $("div#game-board").addClass("d-none");

  // Hide the game message
  $("div#game-message").addClass("opacity-zero");
  $("div#game-message").addClass("d-none");

  // Reset the game message
  $("div#game-message").text("Welcome to Bison Boggle! Try and guess as many words as you can.");
  if ($("div#game-message").hasClass("alert-success")) {
    $("div#game-message").removeClass("alert-success");
  }
  if ($("div#game-message").hasClass("alert-danger")) {
    $("div#game-message").removeClass("alert-danger");
  }
  if (!$("div#game-message").hasClass("alert-secondary")) {
    $("div#game-message").addClass("alert-secondary");
  }

  // Hide the matched word list
  $("div#matched-word-list").addClass("opacity-zero");

  // Reset the matched word list
  $("ul.list-group").empty();
  $("ul.list-group").append("<li class='list-group-item list-group-default-item'>No words matched yet.</li>")

  // Hide the exit game button
  $("button#exit-button").addClass("opacity-zero");
  $("button#exit-button").addClass("d-none");
}

function App() {
  return (
    <div className="App container-fluid">
      <div className="row" id="header-row">
        <div className="col-12">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="Howard University's official seal" />
            <h1 className="App-header-text">
              <span className="first-word">Bison</span>&nbsp;
              <span className="second-word">Boggle</span>
             </h1>
             <ExitGameButtonModal />
          </header>
        </div>
      </div>
      <div className="row full-height-width" id="body-row">
        <div className="col-3">
          <WordEntry />
          <GridSizeDropdown />
        </div>
        <div className="col-6">
          <StartButton />
          <GameMessage />
          <GameBoard />
        </div>
        <div className="col-3">
          <MatchedWordList />
        </div>
      </div>
      <script src='./jquery/dist/jquery.min.js'></script>
      <script src='./@popperjs/core/dist/umd/popper.min.js'></script>
      <script src='./bootstrap/dist/js/bootstrap.min.js'></script>
    </div>
  );
}

export default App;
