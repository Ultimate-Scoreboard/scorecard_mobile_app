import React, { useEffect, useState } from "react";
import { Alert, Keyboard, ScrollView } from "react-native";

import { sudokuFunctions, storageFunctions } from "../functions";
import {
  Screen,
  Board,
  SudokuInput,
  SudokuOptions,
  SudokuBoardButtons,
  SuperEasyModePopup,
  SudokuHelp,
  HorizontalTabs,
  Header,
  BlockButton,
  BannerAd,
} from "../components";

function Sudoku({ route }) {
  const [difficulty, setDifficulty] = useState("easy");
  const [selected, setSelected] = useState(null);
  const [originalPuzzle, setOriginalPuzzle] = useState(null);
  const [puzzle, setPuzzle] = useState(null);
  const [miniValue, setMiniValue] = useState(false);
  const [superEasyMode, setSuperEasyMode] = useState(false);
  const [superEasyNumbers, setSuperEasyNumbers] = useState([]);
  const [solution, setSolution] = useState(null);
  const [puzzleInProgress, setPuzzleInProgress] = useState(null);
  const [tabs, setTabs] = useState([]);
  const [tab, setTab] = useState("options");

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
      retrieveBoard();
    }
    return () => {
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
      mounted = false;
    };
  }, []);
  const _keyboardDidHide = () => {
    setSelected(null);
  };

  const retrieveBoard = async () => {
    const filledSpaces = await storageFunctions.getAsyncStorage("filledSpaces");
    const boardNumber = await storageFunctions.getAsyncStorage("boardNumber");
    const board = await storageFunctions.getAsyncStorage("board");
    if (!boardNumber || !filledSpaces) return;
    startNewBoard(filledSpaces, boardNumber, board);
  };

  const handleAlertNewBoard = () => {
    if (puzzle)
      Alert.alert(
        "Start New Puzzle",
        "You already have a puzzle in progress, starting a new puzzle will cause all input to be lost\n\nAre you sure?",
        [
          { text: "No" },
          {
            text: "Yes",
            onPress: () => startNewBoard(),
          },
        ],
        { cancelable: true }
      );
    else startNewBoard();
  };

  const startNewBoard = async (filledSpaces, boardNumber, board) => {
    const selectedPuzzle = sudokuFunctions.pickPuzzle(difficulty, {
      filledSpaces,
      boardNumber,
    });
    setOriginalPuzzle(sudokuFunctions.deepCopy(selectedPuzzle.board.puzzle));
    board = board
      ? JSON.parse(board)
      : sudokuFunctions.convertBoardToObjects(selectedPuzzle.board.puzzle);
    setPuzzle(sudokuFunctions.deepCopy(board));
    setSolution(selectedPuzzle.board.solvedPuzzle);
    setTabs([
      {
        name: "board",
        icon: "checkerboard",
        iconType: "material",
      },
      { name: "options", icon: "setting", iconType: "ant" },
      { name: "help", icon: "help-circle", iconType: "material" },
    ]);
    setTab("board");
    setSelected(null);
    setPuzzleInProgress(selectedPuzzle.boardInfo);
    saveBoardToStorage(board);
    await storageFunctions.saveAsyncStorage(
      "filledSpaces",
      String(selectedPuzzle.boardInfo.filledSpaces)
    );
    await storageFunctions.saveAsyncStorage(
      "boardNumber",
      String(selectedPuzzle.boardInfo.boardNumber)
    );
  };

  const handleSelect = (row, col) => {
    if (originalPuzzle[row][col] !== "") return;
    if (selected && selected.row === row && selected.col === col)
      return setSelected(null);
    if (superEasyMode)
      setSuperEasyNumbers(sudokuFunctions.getPossibleNumbers(puzzle, row, col));
    setSelected({ row, col });
  };

  const saveBoardToStorage = async (board) => {
    storageFunctions.saveAsyncStorage("board", JSON.stringify(board));
  };

  const handleUpdateValue = (value) => {
    if (selected && originalPuzzle[selected.row][selected.col] !== "") return;
    if (isNaN(value) || value > 9) return;
    if (value < 1) value = "";
    let currentPuzzle = [...puzzle];
    let currentRow = [...currentPuzzle][selected.row];
    currentRow.splice(selected.col, 1, { value, miniValue });
    currentPuzzle.splice(selected.row, 1, currentRow);
    setPuzzle(currentPuzzle);
    saveBoardToStorage(currentPuzzle);
  };

  const handleAlertMiniValues = () => {
    let miniValues = false;
    puzzle.forEach((row) => {
      const miniRow = row.some((col) => col.miniValue && col.value !== "");
      if (miniRow) miniValues = true;
    });
    if (miniValues) {
      Alert.alert(
        "Note Mode Values",
        "Some of your numbers are entered in note mode. How should these be handled?",
        [
          { text: "Cancel" },
          { text: "Leave as Notes", onPress: () => alertCheckSolution(false) },
          {
            text: "Convert to Regular Values",
            onPress: () => alertCheckSolution(true),
          },
        ],
        { cancelable: true }
      );
    } else alertCheckSolution();
  };

  const handleResetPuzzle = () => {
    Alert.alert(
      "Reset Puzzle",
      "This will erase all of your input and reset the current puzzle.\n\nAre you sure?",
      [
        { text: "No" },
        {
          text: "Yes",
          onPress: async () => {
            const filledSpaces = await storageFunctions.getAsyncStorage(
              "filledSpaces"
            );
            const boardNumber = await storageFunctions.getAsyncStorage(
              "boardNumber"
            );
            startNewBoard(filledSpaces, boardNumber);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const alertCheckSolution = (convert) => {
    Alert.alert(
      "Check Solution",
      "This will highlight all of your entered numbers with green (correct) or red (incorrect).\n\nAre you sure?",
      [
        { text: "No" },
        {
          text: "Yes",
          onPress: () => handleCheckSolution(convert),
        },
      ],
      { cancelable: true }
    );
  };
  const handleCheckSolution = (convert) => {
    const { checkedPuzzle, allCorrect } = sudokuFunctions.checkPuzzle(
      puzzle,
      convert,
      originalPuzzle,
      solution
    );
    setPuzzle(checkedPuzzle);
    if (allCorrect)
      Alert.alert(
        "Congratulations!!!",
        "You have solved the puzzle",
        [{ text: "OK" }],
        { cancelable: true }
      );
  };

  const handleFillSolution = () => {
    Alert.alert(
      "Fill in Solution",
      "This will fill in the correct solution for all cells.\n\nProceed?",
      [
        { text: "No" },
        {
          text: "Yes",
          onPress: () => {
            const solvedPuzzle = sudokuFunctions.fillSolution(puzzle, solution);
            setPuzzle(solvedPuzzle);
            setTab("board");
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleClearChecks = () => {
    if (!puzzle) return;
    let revertedPuzzle = [];
    puzzle.forEach((row) => {
      let newRow = [];
      row.forEach((col) => {
        let newCol = { ...col };
        if (col.checked) {
          delete newCol.checked;
        }
        newRow.push(newCol);
      });
      revertedPuzzle.push(newRow);
    });
    setTab("board");
    setPuzzle(revertedPuzzle);
  };

  return (
    <Screen
      header={
        <>
          <Header>Sudoku</Header>
          <HorizontalTabs
            tabs={tabs}
            selected={tab}
            onSelect={(tab) => setTab(tab.name)}
          />
        </>
      }
      footer={
        <>
          {tab === "options" && (
            <BlockButton
              title="Start New Game"
              onPress={handleAlertNewBoard}
              color="btnSuccess"
            />
          )}
          {tab === "board" && (
            <BlockButton
              title="Check Answers"
              onPress={handleAlertMiniValues}
              color="btnSuccess"
              size="small"
            />
          )}
          {tab === "board" && <BannerAd route={route.name} />}
        </>
      }
    >
      {tab === "board" && (
        <ScrollView>
          {superEasyMode && selected && (
            <SuperEasyModePopup numbers={superEasyNumbers} />
          )}
          {puzzle && (
            <Board
              puzzle={puzzle}
              originalPuzzle={originalPuzzle}
              selected={selected}
              onSelect={handleSelect}
            />
          )}
          <SudokuInput
            selected={selected}
            onUpdateValue={handleUpdateValue}
            onSubmit={() => setSelected(null)}
          />
          <SudokuBoardButtons
            miniValue={miniValue}
            setMiniValue={setMiniValue}
            onClearChecks={handleClearChecks}
            puzzleInProgress={puzzleInProgress}
          />
        </ScrollView>
      )}
      {tab === "options" && (
        <ScrollView>
          <SudokuOptions
            puzzle={puzzle}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            miniValue={miniValue}
            setMiniValue={setMiniValue}
            superEasyMode={superEasyMode}
            setSuperEasyMode={setSuperEasyMode}
            onResetPuzzle={handleResetPuzzle}
            onFillSolution={handleFillSolution}
          />
        </ScrollView>
      )}
      {tab === "help" && (
        <ScrollView>
          <SudokuHelp />
        </ScrollView>
      )}
    </Screen>
  );
}

export default Sudoku;
