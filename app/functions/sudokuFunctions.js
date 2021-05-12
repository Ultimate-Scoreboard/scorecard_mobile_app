import { defaultStyles } from "../config";
import sudokuBoards from "./sudokuBoards";

const deepCopy = (input) => {
  let output = [];
  for (let row of input) {
    let newRow = [];
    for (let col of row) {
      newRow.push(col);
    }
    output.push(newRow);
  }
  return output;
};

const convertBoardToObjects = (board) => {
  let convertedBoard = [];
  board.forEach((row) => {
    let newRow = [];
    row.forEach((col) => {
      newRow.push({ value: col });
    });
    convertedBoard.push(newRow);
  });
  return convertedBoard;
};

const pickPuzzle = (difficulty, specificBoard) => {
  if (!specificBoard.filledSpaces || !specificBoard.boardNumber) {
    let startAt = 31;
    let size = 7;
    if (difficulty === "easy") {
      startAt = 38;
      size = 12;
    }
    if (difficulty === "hard") {
      startAt = 24;
      size = 7;
    }
    const randomSpaces = Math.floor(Math.random() * size) + startAt;
    const boards = sudokuBoards[randomSpaces];
    const randomBoard = Math.floor(Math.random() * boards.length);
    return {
      board: boards[randomBoard],
      boardInfo: { filledSpaces: randomSpaces, boardNumber: randomBoard },
    };
  } else
    return {
      board:
        sudokuBoards[specificBoard.filledSpaces][specificBoard.boardNumber],
      boardInfo: { ...specificBoard },
    };
};

const getBorder = (row, col, textColor) => {
  const bold = defaultStyles.colors.info;
  let style = {};
  const boldWidth = 1;
  const regularWidth = 0.175;

  // mini square borders
  if (row % 3 === 0) {
    style.borderTopColor = bold;
    style.borderTopWidth = boldWidth;
  } else {
    style.borderTopColor = textColor;
    style.borderTopWidth = regularWidth;
  }
  if (col % 3 === 0) {
    style.borderLeftColor = bold;
    style.borderLeftWidth = boldWidth;
  } else {
    style.borderLeftWidth = regularWidth;
    style.borderLeftColor = textColor;
  }

  // outside borders
  if (row === 8) {
    style.borderBottomWidth = 1;
    style.borderBottomColor = bold;
  }
  if (col === 8) {
    style.borderRightWidth = 1;
    style.borderRightColor = bold;
  }
  return style;
};

function isPossible(grid, x, y, n) {
  // Check x axis
  for (let rowItem of grid[x]) {
    if (rowItem.value === n) {
      return false;
    }
  }
  // Check y axis
  for (let colItem of grid) {
    if (colItem[y].value === n) {
      return false;
    }
  }
  // Create mini-grids
  let miniGrids = {};
  let yPosition = 0;
  let gridNumber = 1;
  while (yPosition < 9) {
    let xPosition = 0;
    while (xPosition < 9) {
      let miniGrid = [];
      for (let xItem = xPosition; xItem < xPosition + 3; xItem++) {
        for (let yItem = yPosition; yItem < yPosition + 3; yItem++) {
          miniGrid.push([xItem, yItem]);
        }
      }
      xPosition += 3;
      miniGrids[gridNumber] = miniGrid;
      gridNumber += 1;
    }
    yPosition += 3;
  }
  // Check in mini-grids
  for (let miniGrid in miniGrids) {
    for (let co in miniGrids[miniGrid]) {
      if (
        miniGrids[miniGrid][co][0] === x &&
        miniGrids[miniGrid][co][1] === y
      ) {
        gridNumber = miniGrid;
      }
    }
  }
  for (let co in miniGrids[gridNumber]) {
    let number =
      grid[miniGrids[gridNumber][co][0]][miniGrids[gridNumber][co][1]];
    if (number.value === n) {
      return false;
    }
  }
  // If n is not found in any of the previous tests return true, n is possible
  return true;
}

const getPossibleNumbers = (board, row, col) => {
  let possibleNumbers = [];
  for (let n = 1; n < 10; n++) {
    if (isPossible(board, row, col, n)) possibleNumbers.push(n);
  }
  return possibleNumbers;
};

const checkPuzzle = (puzzle, convert, originalPuzzle, solution) => {
  let checkedPuzzle = [];
  let allCorrect = true;
  puzzle.forEach((row, i) => {
    let newRow = [];
    row.forEach((col, ii) => {
      let newCol = { ...col };
      if (originalPuzzle[i][ii] === "") {
        newCol.miniValue = convert ? false : col.miniValue ? true : false;
        if (col.value === "") {
          delete newCol.checked;
          allCorrect = false;
        } else if (
          Number(col.value) === solution[i][ii] &&
          (convert || !col.miniValue)
        ) {
          newCol.checked = "correct";
          newCol.miniValue = false;
        } else if (
          Number(col.value) !== solution[i][ii] &&
          (convert || !col.miniValue)
        ) {
          newCol.checked = "incorrect";
          newCol.miniValue = false;
          allCorrect = false;
        } else if (col.miniValue && !convert) {
          delete newCol.checked;
          allCorrect = false;
        }
      }
      newRow.push(newCol);
    });
    checkedPuzzle.push(newRow);
  });
  return { checkedPuzzle, allCorrect };
};

const fillSolution = (board, solution) => {
  let solvedBoard = [];
  board.forEach((row, i) => {
    let newRow = [];
    row.forEach((col, ii) => {
      let newCol = {
        value: solution[i][ii],
        miniValue: false,
        checked: "correct",
      };
      newRow.push(newCol);
    });
    solvedBoard.push(newRow);
  });
  return solvedBoard;
};

export default {
  getBorder,
  deepCopy,
  pickPuzzle,
  convertBoardToObjects,
  getPossibleNumbers,
  checkPuzzle,
  fillSolution,
};
