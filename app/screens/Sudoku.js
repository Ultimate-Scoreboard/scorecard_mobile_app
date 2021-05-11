import React, { useEffect, useState } from "react";

import { sudokuBoards } from "../functions";
import {
  Screen,
  Board,
  SudokuInput,
  HorizontalTabs,
  Header,
} from "../components";

function Sudoku({ navigation, route }) {
  const [selected, setSelected] = useState(null);
  const [puzzle, setPuzzle] = useState(null);
  const [tab, setTab] = useState("board");
  const tabs = [
    { name: "board", icon: "clipboard-text", iconType: "material" },
    { name: "options", icon: "setting", iconType: "ant" },
  ];

  useEffect(() => {
    setPuzzle(sudokuBoards[24][0].puzzle);
  });

  const handleSelect = (row, col) => {
    if (selected && selected.row === row && selected.col === col)
      return setSelected(null);
    setSelected({ row, col });
  };

  const handleUpdateValue = (value) => {
    if (isNaN(value) || value > 9) return;
    if (value < 1) value = "";
    let currentPuzzle = [...puzzle];
    let currentRow = [...currentPuzzle][selected.row];
    currentRow.splice(selected.col, 1, value);
    currentPuzzle.splice(selected.row, 1, currentRow);
    setPuzzle(currentPuzzle);
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
    >
      {puzzle && (
        <Board puzzle={puzzle} selected={selected} onSelect={handleSelect} />
      )}
      <SudokuInput
        selected={selected}
        onUpdateValue={handleUpdateValue}
        onSubmit={() => setSelected(null)}
      />
    </Screen>
  );
}

export default Sudoku;
