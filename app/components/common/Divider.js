import React from "react";
import { StyleSheet, View } from "react-native";

import { defaultStyles } from "../../config";

function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  divider: {
    borderBottomColor: defaultStyles.colors.info,
    borderBottomWidth: 1,
    margin: 5,
  },
});

export default Divider;
