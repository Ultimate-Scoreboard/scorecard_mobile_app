import React from "react";
import { StyleSheet, View } from "react-native";

import AppInput from "./../form/AppInput";

function SudokuInput({ selected, onUpdateValue, onSubmit }) {
  return (
    selected && (
      <AppInput
        autoFocus={true}
        value=""
        hidden={true}
        onChangeText={(value) => onUpdateValue(value)}
        placeholder=""
        keyboardType="numeric"
        returnKeyType="done"
        onSubmitEditing={onSubmit}
        blurOnSubmit={true}
      />
    )
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SudokuInput;
