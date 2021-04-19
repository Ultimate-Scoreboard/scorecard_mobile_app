import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import AppInput from "../form/AppInput";

function NameEdit({ player, onNameEdit }) {
  const [name, setName] = useState("");
  return (
    <View style={styles.container}>
      <AppInput
        autoFocus={true}
        value={name}
        onChangeText={(value) => setName(value)}
        placeholder={"Edit Name: " + player.name}
        keyboardType="default"
        onSubmitEditing={() => onNameEdit(name)}
        returnKeyType="done"
        blurOnSubmit={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default NameEdit;
