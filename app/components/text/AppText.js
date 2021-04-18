import React, { useContext } from "react";
import { Text, StyleSheet } from "react-native";

import { defaultStyles } from "../../config";
import SettingsContext from "./../../context/settingsContext";

function AppText({ style, children, ...otherProps }) {
  const { theme } = useContext(SettingsContext);
  return (
    <Text style={[styles.text, { color: theme.color }, style]} {...otherProps}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: defaultStyles.text,
});

export default AppText;
