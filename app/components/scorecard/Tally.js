import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import AppInput from "./../form/AppInput";

function Tally({ setScore }) {
  const [currentValue, setCurrentValue] = useState("");
  return (
    <View style={styles.container}>
      <AppInput
        autoFocus={true}
        value={currentValue}
        onChangeText={(value) => setCurrentValue(value)}
        placeholder="Enter score"
        keyboardType="numeric"
        onSubmitEditing={() => setScore(currentValue)}
        returnKeyType="done"
        blurOnSubmit={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Tally;
