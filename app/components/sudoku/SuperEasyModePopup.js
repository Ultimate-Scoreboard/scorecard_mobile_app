import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "./../text/AppText";
import { defaultStyles } from "../../config";

function SuperEasyModePopup({ numbers }) {
  return (
    <View style={styles.container}>
      {numbers.map((n, i) => {
        const style = {
          flex: 1 / numbers.length,
          backgroundColor: i % 2 === 0 ? defaultStyles.colors.muted : "",
        };
        const textStyle =
          i % 2 === 0
            ? {
                color: defaultStyles.colors.holdDark,
              }
            : {};
        return (
          <View key={i} style={[style, styles.col]}>
            <AppText style={[styles.text, textStyle]}>{n}</AppText>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", height: 25, marginTop: 5 },
  col: {
    justifyContent: "center",
  },
  text: { textAlign: "center", fontWeight: "bold", fontSize: 15 },
});

export default SuperEasyModePopup;
