import React, { useContext } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";

import { defaultStyles } from "../../config";
import AppText from "./../text/AppText";
import SettingsContext from "./../../context/settingsContext";
import { sudokuFunctions } from "../../functions";

function Board({ puzzle, originalPuzzle, selected, onSelect }) {
  const { theme } = useContext(SettingsContext);
  return (
    <View style={styles.container}>
      {puzzle.map((row, i) => {
        return (
          <View style={styles.row} key={i}>
            {row.map((col, ii) => {
              const isSelected =
                selected && selected.row === i && selected.col === ii;
              const borderStyle = sudokuFunctions.getBorder(i, ii, theme.color);
              const locked = originalPuzzle[i][ii] !== "";
              return (
                <View
                  style={[
                    styles.column,
                    borderStyle,
                    col.checked ? styles[col.checked] : {},
                    isSelected ? styles.selectedCell : {},
                  ]}
                  key={ii}
                >
                  <TouchableWithoutFeedback onPress={() => onSelect(i, ii)}>
                    <AppText
                      style={[
                        col.value && col.miniValue
                          ? styles.miniValue
                          : styles.number,
                        col.checked ? styles[col.checked] : {},
                        isSelected ? styles.selectedText : {},
                        locked ? styles.constant : {},
                      ]}
                    >
                      {col.value}
                    </AppText>
                  </TouchableWithoutFeedback>
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: "center",
  },
  row: {
    height: (defaultStyles.sizes.screenDimensions.width - 30) / 9,
    flexDirection: "row",
  },
  column: {
    width: (defaultStyles.sizes.screenDimensions.width - 30) / 9,
    justifyContent: "center",
  },
  number: {
    textAlign: "center",
    fontSize: 20,
  },
  miniValue: {
    fontSize: 12,
    marginRight: 3,
    textAlign: "right",
  },
  selectedCell: {
    backgroundColor: defaultStyles.colors.muted,
  },
  selectedText: {
    color: defaultStyles.colors.holdDark,
  },
  constant: {
    fontWeight: "bold",
    fontSize: 18,
    color: defaultStyles.colors.info,
  },
  correct: {
    backgroundColor: defaultStyles.colors.success,
    color: defaultStyles.colors.holdLight,
  },
  incorrect: {
    backgroundColor: defaultStyles.colors.danger,
    color: defaultStyles.colors.holdLight,
  },
});

export default Board;
