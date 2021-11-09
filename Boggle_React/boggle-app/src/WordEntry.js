import './App.css';
import $ from 'jquery';
import { isWordMatch } from "./GameBoard";
import { addToMatchedWordList } from "./MatchedWordList";
import { updateGameMessage } from "./GameMessage";

export function submitWordSearchForm(e) {
  // Stop default submit behavior
  e.preventDefault();
  e.stopPropagation();
  
  // Reference the submitted word
  const wordToCheck = $.trim($("#word-search-textbox").val()).toLowerCase();
  
  // Evaluate word for matches with the dictionary, then add to Matched Word List if there is a match
  if (isWordMatch(wordToCheck)) {
    addToMatchedWordList(wordToCheck);
    updateGameMessage(true);
  } else {
    updateGameMessage(false);
  } 
}

function WordEntry() {
  return (
    <form 
      id="word-search-form" 
      className="opacity-zero d-none"
      onSubmit={(event) => submitWordSearchForm(event)}
      >
      <div className="form-group">
        <label 
          className="form-label" 
          for="word-search-textbox">Enter a word:</label>
        <input 
          id="word-search-textbox" 
          type="text"
          className="form-control form-control-lg"
          placeholder="Three or more letters, please!"
          minlength="3"
          required="required" />
        <button 
          class="btn btn-primary howard-blue-button"
          type="submit">Submit</button>&nbsp;
        <button 
          class="btn btn-primary howard-blue-button"
          type="reset">Clear</button>
    </div>
    </form>
  );
}

export default WordEntry;
