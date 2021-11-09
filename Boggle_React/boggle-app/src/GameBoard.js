import './App.css';
import $ from 'jquery';
import createGrid from './randomGen.js';
import findBoggleSolutions from './boggle_solver.js';
import dictionary from './full-wordlist';

let solutions = [];

export function getTotalNumberOfSolutions() {
  return solutions.length;
}

// Populate and/or resize the game board
export function getGridData(gridSize) {
  let gameBoard = document.querySelector("#game-board");
  let grid = null;
  const defaultGridSize = 5;
  if (!gameBoard.hasChildNodes()) {
    if (!gridSize) {
      grid = createGrid(defaultGridSize);
    }
    populateGameBoard(grid);
    solutions = findBoggleSolutions(grid, dictionary.words);
  } else if (gameBoard.hasChildNodes() && gridSize) {
    grid = createGrid(gridSize);
    populateGameBoard(grid);
    solutions = findBoggleSolutions(grid, dictionary.words);
  }
}

function resetGameBoard(board) {
  return $(board).empty();
}  
  
function populateGameBoard(grid) {
  let gameBoard = document.querySelector("#game-board");
  if (gameBoard.hasChildNodes()) {
    gameBoard = resetGameBoard(gameBoard);
  }
  for (let i = 0; i < grid.length; i++) {
    let gridRow = grid[i];
    $(gameBoard).append("<div class='row'></div>");
    for (let j = 0; j < gridRow.length; j++) {
      let lastRow = $("div.row:last-child");
      let gridCell = gridRow[j];
      lastRow.append("<div class='col game-board-letter'>" + gridCell + "</div>");
    }
  }
}

export function isWordMatch(word) {
  if (solutions.find((solution) => solution === word)) {
    return true;
  }
  return false;
}

function GameBoard() {
  // Populate game board
  $(function() {
      getGridData();
  });
  
  return (
    <div 
      id="game-board"
      className="container opacity-zero d-none"
      >
    </div>
  );
}

export default GameBoard;
