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
    <View></View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default Incrementer;
