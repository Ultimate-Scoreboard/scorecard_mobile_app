import React from "react";
import { StyleSheet, View } from "react-native";

import { defaultStyles } from "../../config";
import AppText from "./../text/AppText";

function Error({ children }) {
  if (!children) return null;
  return (
    <View style={styles.container}>
      <AppText style={styles.text}>{children}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.danger,
    margin: 5,
  },
  text: {
    color: defaultStyles.colors.holdLight,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Error;
