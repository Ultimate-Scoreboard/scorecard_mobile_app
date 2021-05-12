import React from "react";
import { StyleSheet, View } from "react-native";

import ToggleSwitch from "./../settings/ToggleSwitch";
import BlockButton from "./../button/BlockButton";
import AppText from "./../text/AppText";
import Divider from "./../common/Divider";

function SudokuBoardButtons({
  miniValue,
  setMiniValue,
  onClearChecks,
  puzzleInProgress,
}) {
  const getDifficulty = () => {
    return puzzleInProgress.filledSpaces >= 38
      ? "Easy"
      : puzzleInProgress.filledSpaces >= 31
      ? "Medium"
      : "Hard";
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.half}>
          <ToggleSwitch
            current={miniValue}
            onChange={() => setMiniValue(!miniValue)}
            title="Note Mode"
          />
        </View>
        <View style={styles.half}>
          <BlockButton
            title="Clear Highlights"
            onPress={onClearChecks}
            color="btnPrimary"
            size="small"
          />
        </View>
      </View>
      {puzzleInProgress && (
        <View style={styles.container}>
          <View style={styles.half}>
            <AppText style={styles.infoHeader}>Difficulty</AppText>
            <AppText style={styles.text}>{getDifficulty()}</AppText>
          </View>
          <View style={styles.half}>
            <AppText style={styles.infoHeader}>Board ID</AppText>
            <AppText style={styles.text}>
              {puzzleInProgress.filledSpaces}-
              {Number(puzzleInProgress.boardNumber) + 1}
            </AppText>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", marginBottom: 10 },
  half: { flex: 0.5, justifyContent: "center" },
  infoHeader: {
    textAlign: "center",
    fontSize: 14,
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
});

export default SudokuBoardButtons;
