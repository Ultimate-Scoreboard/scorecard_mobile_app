import React from "react";
import { StyleSheet, View } from "react-native";

import HorizontalIncrementer from "./../form/HorizontalIncrementer";
import AppText from "./../text/AppText";

function Incrementer({ score, setScore, selectedPlayer }) {
  return selectedPlayer || selectedPlayer === 0 ? (
    <HorizontalIncrementer
      value={score[selectedPlayer].points[0].points}
      setValue={setScore}
      increment={1}
      header={score[selectedPlayer].name}
    />
  ) : (
    <View>
      <AppText style={styles.text}>
        Select a player/team to update score
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    textAlign: "center",
    marginHorizontal: 10,
  },
});

export default Incrementer;
