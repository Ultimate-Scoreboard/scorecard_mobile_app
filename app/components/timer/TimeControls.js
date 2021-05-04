import React from "react";
import { StyleSheet, View } from "react-native";

import BlockButton from "./../button/BlockButton";

function TimerControls({
  timerStarted,
  setTimerStarted,
  countdownTime,
  setCountdownTime,
  setTimeRemaining,
}) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.third}>
          <BlockButton
            title="Reset"
            color="btnPrimary"
            onPress={() => setTimeRemaining(countdownTime)}
            disabled={timerStarted}
          />
        </View>
        <View style={styles.twoThird}>
          <BlockButton
            title={timerStarted ? "Stop" : "Start"}
            color={timerStarted ? "btnLight" : "btnSuccess"}
            onPress={() => setTimerStarted(!timerStarted)}
          />
        </View>
      </View>
      <View style={{ height: 50 }} />
      <BlockButton
        title="Clear Timer"
        color="btnLight"
        onPress={() => {
          setTimeRemaining(0);
          setCountdownTime(0);
        }}
        disabled={timerStarted}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  third: {
    flex: 1 / 3,
  },
  twoThird: {
    flex: 2 / 3,
  },
});

export default TimerControls;
