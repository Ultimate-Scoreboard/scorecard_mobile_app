import React from "react";
import { StyleSheet } from "react-native";

import AppText from "../text/AppText";

function SudokuHelp() {
  return (
    <>
      <AppText style={styles.header}>Sudoku Help</AppText>
      <AppText style={styles.miniHeader}>How to Play</AppText>
      <AppText style={styles.text}>
        Tap on an empty cell to bring up number entry. Enter any number between
        1-9 and tap Done or close the keyboard. To clear out the cell enter 0.
        {"\n"}
      </AppText>
      <AppText style={styles.miniHeader}>Modes</AppText>
      <AppText style={styles.text}>
        Use Note Mode to enter numbers in cells that are possible but you are
        not yet sure about. They will appear smaller and offset and will be
        ignored when checking your answers.
        {"\n"}
        {"\n"}
        Use Super Easy Mode to get hints on possible numbers for each cell you
        select. The hints will not update as you fill in the puzzle, they are
        only based off of the original prefilled cells.
        {"\n"}
      </AppText>
      <AppText style={styles.miniHeader}>Saving</AppText>
      <AppText style={styles.text}>
        The current state of the puzzle is saved after every change you make,
        you can exit the app and the puzzle will be waiting exactly as you left
        it when you return.
        {"\n"}
        {"\n"}
        Only one puzzle is stored at a time so starting a new puzzle will erase
        the one in progress.
        {"\n"}
      </AppText>
      <AppText style={styles.miniHeader}>Difficulty</AppText>
      <AppText style={styles.text}>
        Difficulty is based on the number of prefilled cells that you will start
        the puzzle with. Easy will start with between 38-49 prefilled spaces,
        medium has 31-37, hard has 24-30.
        {"\n"}
      </AppText>
      <AppText style={styles.miniHeader}>Checking and Solving</AppText>
      <AppText style={styles.text}>
        At any time you can check your current answers using the button on the
        Board tab. You wil have the option of converting your Note Mode numbers
        to regular numbers and having them checked or leaving them as notes and
        having them ignored. All correctly filled cells will highlight green,
        incorrect cells red. If you have correctly filled all the cells you will
        be alerted that you have solved the puzzle.
        {"\n"}
        {"\n"}
        From here you can continue to solve the puzzle, any cell you edit will
        have the highlight removed, or you can remove the highlights from all
        cells by tapping Clear Highlights.
        {"\n"}
        {"\n"}
        If you would just like to see the solution you can tap the Solve Puzzle
        button and all the cells will be filled with the correct answers.
      </AppText>
      <AppText>{"\n"}</AppText>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    marginLeft: 10,
    fontSize: 14,
    marginRight: 5,
  },
  miniHeader: {
    marginHorizontal: 15,
    fontWeight: "bold",
    fontSize: 18,
  },
  header: {
    marginHorizontal: 15,
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    textDecorationLine: "underline",
    marginBottom: 5,
  },
});

export default SudokuHelp;
