/* CSCI 375: Assignment #4: Boggle Solver React App
 * Programmer (Student ID): Ben Corriette (@02956064)
 * Last modified date: 11/09/2021
 *
 * Reference: Assignment #4 Boggle Solver PDF Handout
 * 
 * Comments: My algorithm is very inefficient when processing a large data set, so I decided to use the provided hash map algorithm.
 */

export default function findBoggleSolutions(grid, dictionary) {
  let solutions = [];
  // 1. Check inputs Params are valid (return [] if incorrect)
  // 1a. Check if any empty input
  if (grid == null || dictionary == null) return solutions;
  // 1b. Check if NXN
  let N = grid.length;
  for (let i = 0; i < N; i++) {
    if (grid[i].length !== N) {
      //|| grid[i] == []) {
      return solutions;
    }
  }
  // Convert input data into the same case
  convertCaseToLower(grid, dictionary);
  // Setup any data structures (i.e. Visited, solutions, dictionary (Trie | Hash | List | Set |)
  let trie = createHashMap(dictionary); //new Set(dictionary);
  let solutionSet = new Set();
  // Iterate over the NxN grid - find all words that begin with grid[y][x]
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      let word = "";
      let visited = new Array(N)
        .fill(false)
        .map(() => new Array(N).fill(false));
      findWords(word, y, x, grid, visited, trie, solutionSet);
    }
  }
  solutions = Array.from(solutionSet);
  return solutions;
};
function convertCaseToLower(grid, dict) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = grid[i][j].toLowerCase();
    }
  }
  for (let i = 0; i < dict.length; i++) {
    dict[i] = dict[i].toLowerCase();
  }
};
function findWords (word, y, x, grid, visited, trie, solutionSet) {
  let adjMatrix = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ];
  // Base Case:
  // b1: y and x are out of bounds
  // b2: already visited y and x
  // --> then return immediately
  if (
    y < 0 ||
    x < 0 ||
    y >= grid.length ||
    x >= grid.length ||
    visited[y][x] === true
  )
    return;
  // Append grid[y][x] to the word
  word += grid[y][x];
  // console.log("Cur Word = " + word + "\nGrid[" + y + "][" + x + "] = " + grid[x][y]);
  // 1. Is that new word a prefix for any word in the trie
  if (isPrefix(word, trie)) {
    // 1a. Is that prefix an actual word in the dictionary (trie)
    visited[y][x] = true;
    if (isWord(word, trie)) {
      // 1b. If true AND word size > 3--> add word to solutionSet
      if (word.length >= 3) solutionSet.add(word);
    }
    // 2. keep searching using the adjacent tiles --> Call findWord()
    for (let i = 0; i < 8; i++) {
      findWords(
        word,
        y + adjMatrix[i][0],
        x + adjMatrix[i][1],
        grid,
        visited,
        trie,
        solutionSet
      );
    }
  }
  // 3. If not a prefix then unmark location y, x as visited
  visited[y][x] = false;
};
function isPrefix (word, trie) {
  //Iterate through each word in the trie, and check if the word is a prefix
  return trie[word] !== undefined;
};
function isWord (word, trie) {
  return trie[word] === 1;
};
function createHashMap (dictionary) {
  var dict = {};
  for (let i = 0; i < dictionary.length; i++) {
    dict[dictionary[i]] = 1;
    let wordlength = dictionary[i].length;
    var str = dictionary[i];
    for (str; wordlength > 1; wordlength--) {
      str = str.substr(0, wordlength - 1);
      if (str in dict) {
        if (str === 1) {
          dict[str] = 1;
        }
      } else {
        dict[str] = 0;
      }
    }
  }
  return dict;
};