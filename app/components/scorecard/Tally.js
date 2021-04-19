import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import AppInput from "./../form/AppInput";

function Tally({ score, setScore, selectedPlayer }) {
  const [currentValue, setCurrentValue] = useState("");
  const round = score.find((p) => p._id === selectedPlayer).history.length;
  return (
    <View style={styles.container}>
      <AppInput
        autoFocus={true}
        value={currentValue}
        onChangeText={(value) => setCurrentValue(value)}
        placeholder={`Enter Score: Round ${String(round + 1)}`}
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
