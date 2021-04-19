import React from "react";
import { StyleSheet, View } from "react-native";

import AppPicker from "./../form/AppPicker";
import AppText from "./../text/AppText";

function TypeSelect({ type, setType }) {
  const options = [
    {
      label: "Incrementer",
      value: "incrementer",
      text:
        "A simple scorecard with increment and decrement buttons to keep track of the score.",
    },
    {
      label: "Tally",
      value: "tally",
      text:
        "Add points after each round/move using a number input and keep a history of previous totals. Useful for games like scrabble or hearts.",
    },
    {
      label: "Sets",
      value: "sets",
      text:
        "Keep the score in a set by set format. Useful for tennis, golf, etc.",
    },
  ];

  const selectedType = options.find((o) => o.value === type);

  return (
    <>
      <AppPicker
        title="Select Style:"
        options={options}
        selected={type}
        setSelected={setType}
        placeholder="Select Scorecard Style"
      />
      {selectedType && (
        <AppText style={styles.text}>{selectedType.text}</AppText>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 14,
    textAlign: "left",
    marginHorizontal: 15,
  },
});

export default TypeSelect;
