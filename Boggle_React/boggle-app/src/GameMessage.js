import './App.css';
import $ from 'jquery';

export function updateGameMessage(isWordMatch) {
  let alertBanner = $("#game-message");
  if (isWordMatch) {
    if (alertBanner.hasClass("alert-secondary")) {
      alertBanner.removeClass("alert-secondary");
    }
    if (alertBanner.hasClass("alert-danger")) {
      alertBanner.removeClass("alert-danger");
    }
    if (!alertBanner.hasClass("alert-success")) {
      alertBanner.addClass("alert-success");
    }
    alertBanner.text("Nice job! That is a valid matching word.");
  } else {
    if (alertBanner.hasClass("alert-secondary")) {
      alertBanner.removeClass("alert-secondary");
    }
    if (alertBanner.hasClass("alert-success")) {
      alertBanner.removeClass("alert-success");
    }
    if (!alertBanner.hasClass("alert-danger")) {
      alertBanner.addClass("alert-danger");
    }
    alertBanner.text("Oops! Not quite. Please try another word.");
  }
}

function GameMessage() {
  return (
    <div 
      id="game-message"
      className="alert alert-secondary opacity-zero d-none">
      Welcome to Bison Boggle! Try and guess as many words as you can.
    </div>
  );
}

export default GameMessage;
