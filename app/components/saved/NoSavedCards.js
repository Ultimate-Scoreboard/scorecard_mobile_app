import React from "react";
import { StyleSheet, View } from "react-native";

import AppText from "./../text/AppText";
import { defaultStyles } from "../../config";

function NoSavedCards() {
  return (
    <View style={styles.container}>
      <AppText style={styles.text}>
        You do not have any saved scorecards
      </AppText>
      <AppText style={styles.text}>
        You can save a scorecard from the Help tab of the Scorecard screen
      </AppText>
      <AppText style={styles.text}>
        If you have just saved a scorecard pull the screen down to refresh this
        page
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  text: {
    marginHorizontal: 15,
    marginVertical: 10,
    textAlign: "center",
  },
});

export default NoSavedCards;
