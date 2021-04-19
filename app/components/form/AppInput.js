import React, { useContext } from "react";
import { StyleSheet, View, TextInput, Keyboard } from "react-native";

import SettingsContext from "./../../context/settingsContext";
import { defaultStyles } from "../../config";

function AppInput({
  value,
  onChange,
  placeholder,
  keyboardType,
  forwardedRef,
  style,
  ...rest
}) {
  const { theme } = useContext(SettingsContext);
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.text, defaultStyles.text, theme, style]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={defaultStyles.colors.info}
        keyboardType={keyboardType}
        {...rest}
        ref={forwardedRef ? forwardedRef : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 50,
    borderColor: defaultStyles.colors.info,
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  text: {
    marginLeft: 10,
    marginRight: 10,
  },
});

export default AppInput;
