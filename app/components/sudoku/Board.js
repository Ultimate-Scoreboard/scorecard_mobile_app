import React, { useContext } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";

import { defaultStyles } from "../../config";
import AppText from "./../text/AppText";
import SettingsContext from "./../../context/settingsContext";
import { sudokuFunctions } from "../../functions";

function Board({ puzzle, selected, onSelect }) {
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
              return (
                <View
                  style={[
                    styles.column,
                    borderStyle,
                    isSelected ? styles.selectedCell : {},
                  ]}
                  key={ii}
                >
                  <TouchableWithoutFeedback onPress={() => onSelect(i, ii)}>
                    <AppText
                      style={[
                        styles.number,
                        isSelected ? styles.selectedText : {},
                      ]}
                    >
                      {col}
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
    marginVertical: 20,
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
  },
  selectedCell: {
    backgroundColor: defaultStyles.colors.muted,
  },
  selectedText: {
    color: defaultStyles.colors.holdDark,
  },
  constant: {
    fontWeight: "bold",
  },
});

export default Board;
