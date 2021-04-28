import React from "react";
import { StyleSheet, View } from "react-native";

import AppInput from "./../form/AppInput";

function InitialValue({ value, setValue }) {
  return (
    <View style={styles.container}>
      <AppInput
        value={String(value)}
        onChangeText={(value) => setValue(value)}
        placeholder="Set Initial value"
        keyboardType="numeric"
        returnKeyType="done"
        blurOnSubmit={true}
        style={{ height: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default InitialValue;
