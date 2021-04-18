import React from "react";
import { StyleSheet, View } from "react-native";

import { defaultStyles } from "../../config";
import AppText from "./AppText";

function SecondaryHeader({ children }) {
  return (
    <View style={styles.container}>
      <AppText style={styles.header}>{children}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.info,
    borderColor: defaultStyles.colors.info,
    borderWidth: 1,
    borderTopWidth: 0,
    marginHorizontal: 5,
    height: "auto",
    justifyContent: "center",
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginVertical: 5,
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: defaultStyles.colors.holdLight,
  },
});

export default SecondaryHeader;
