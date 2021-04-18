import React from "react";
import { Text, StyleSheet } from "react-native";

import { defaultStyles } from "../../config";

function ButtonText(props) {
  return <Text style={[styles.text, props.styles]}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontFamily: defaultStyles.text.fontFamily,
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default ButtonText;
