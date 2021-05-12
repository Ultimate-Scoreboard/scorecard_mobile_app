import React from "react";
import { StyleSheet, View } from "react-native";

import AppPicker from "./../form/AppPicker";
import ToggleSwitch from "./../settings/ToggleSwitch";
import Divider from "./../common/Divider";
import BlockButton from "./../button/BlockButton";
import Sharing from "./../scorecard/Sharing";

function SudokuOptions({
  puzzle,
  difficulty,
  setDifficulty,
  miniValue,
  setMiniValue,
  superEasyMode,
  setSuperEasyMode,
  onResetPuzzle,
  onFillSolution,
}) {
  const toggles = [
    {
      id: "miniValue",
      onChange: setMiniValue,
      value: miniValue,
      title: "Note Mode",
      subtitle:
        "Entered numbers will appear small and offset to indicate that the answer is unsure. These values can be automatically converted when checking answers." +
        (!puzzle
          ? "\n\nThis can also be updated at any time during gameplay."
          : ""),
    },
    {
      id: "superEasyMode",
      onChange: setSuperEasyMode,
      value: superEasyMode,
      title: "Super Easy Mode",
      subtitle:
        "When a cell is selected a prompt will pop up with all the allowed numbers for that cell based on the original puzzle." +
        (!puzzle
          ? "\n\nThis can also be updated at any time during gameplay."
          : ""),
    },
  ];

  return (
    <View style={styles.container}>
      <Divider />
      {toggles.map((t) => {
        return (
          <View key={t.id}>
            <ToggleSwitch
              current={t.value}
              onChange={() => t.onChange(!t.value)}
              title={t.title}
              subtitle={t.subtitle}
            />
            <Divider />
          </View>
        );
      })}
      {puzzle && (
        <>
          <BlockButton
            title="Reset Puzzle"
            onPress={onResetPuzzle}
            size="small"
          />
          <Divider />
          <BlockButton
            title="Solve Puzzle"
            onPress={onFillSolution}
            size="small"
          />
          <Divider />
        </>
      )}
      <AppPicker
        title="Select Difficulty:"
        options={[
          { label: "Easy", value: "easy" },
          { label: "Medium", value: "medium" },
          { label: "Hard", value: "hard" },
        ]}
        selected={difficulty}
        setSelected={setDifficulty}
        placeholder="Select Difficulty"
      />
      <Divider />
      <Sharing />
      <Divider />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SudokuOptions;
