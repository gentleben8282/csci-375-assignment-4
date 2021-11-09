import './App.css';
import $ from 'jquery';

export function getTotalNumberOfMatches() {
  return $(".list-group").children(":not(.list-group-default-item)").length;
}

export function addToMatchedWordList(wordToAdd) {
  let wordList = $(".list-group");
  let defaultListItem = $(".list-group-default-item");
  // Replace the default list item if it exists, otherwise append to the list
  if (defaultListItem.length) {
    defaultListItem.removeClass("list-group-default-item");
    defaultListItem.text(wordToAdd);
  } else {
    // Add the word if it has not already been added
    let isWordAdded = false;
    wordList.children().each(function(index) {
      if($(this).text() === wordToAdd) {
        isWordAdded = true;
      }
    });
    if (!isWordAdded) {
      wordList.append("<li class='list-group-item'>" + wordToAdd + "</li>");
    }
  }
}

function MatchedWordList() {
  return (
    <div 
      id="matched-word-list"
      className="opacity-zero">
      <h2 className="form-label">Matched words:</h2>
        <ul className="list-group list-group-flush">
          <li className="list-group-item list-group-default-item">No words matched yet.</li>
        </ul>
    </div>
  );
}

export default MatchedWordList;
