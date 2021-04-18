import React from "react";
import { StyleSheet, View } from "react-native";

import AppPicker from "./../form/AppPicker";
import AppText from "./../text/AppText";

function TypeSelect({ selected, setSelected }) {
  const options = [
    {
      label: "Incrementer",
      value: "inc",
      text:
        "A simple scorecard with increment and decrement buttons to keep track of the score.",
    },
    {
      label: "Tally",
      value: "tally",
      text:
        "Add points after each round/move using a number input and keep a history of previous totals. Useful for games like scrabble or hearts.",
    },
  ];

  return (
    <>
      <AppPicker
        title="Select Style:"
        options={options}
        selected={selected}
        setSelected={setSelected}
        placeholder="Select Scorecard Style"
      />
      {selected && (
        <AppText style={styles.text}>
          {options.find((o) => o.value === selected).text}
        </AppText>
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
