import React from "react";
import { StyleSheet, View } from "react-native";

import IconRender from "./../icon/IconRender";
import { defaultStyles } from "../../config";
import AppText from "./../text/AppText";

function PullToRefresh() {
  return (
    <View style={styles.container}>
      <View style={styles.alignCenter}>
        <AppText style={styles.text}>Pull to Refresh</AppText>
      </View>
      <IconRender
        icon="angle-double-down"
        iconType="font"
        iconSize={20}
        style={styles.leftIcon}
      />
      <IconRender
        icon="angle-double-down"
        iconType="font"
        iconSize={20}
        style={styles.rightIcon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: defaultStyles.colors.info,
    height: 20,
  },
  alignCenter: {
    justifyContent: "center",
    flex: 1,
  },
  text: {
    color: defaultStyles.colors.holdLight,
    textAlign: "center",
    fontSize: 14,
  },
  leftIcon: {
    color: defaultStyles.colors.holdLight,
    position: "absolute",
    left: 25,
  },
  rightIcon: {
    color: defaultStyles.colors.holdLight,
    position: "absolute",
    right: 25,
  },
});

export default PullToRefresh;
