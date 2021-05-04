import React from "react";
import { StyleSheet, View } from "react-native";

import BlockButton from "./../button/BlockButton";

function TimerControls({
  timerStarted,
  setTimerStarted,
  countdownTime,
  setCountdownTime,
  setTimeRemaining,
  resetTime,
}) {
  return (
    <>
      <BlockButton
        title={timerStarted ? "Stop" : "Start"}
        color={timerStarted ? "btnLight" : "btnSuccess"}
        onPress={() => setTimerStarted(!timerStarted)}
        icon={{
          icon: timerStarted ? "pause-circle" : "play-circle",
          iconType: "material",
        }}
      />
      <BlockButton
        title="Next Turn"
        color="btnInfo"
        onPress={() => resetTime()}
        icon={{ icon: "skip-next-outline", iconType: "material" }}
      />
      <View style={{ height: 30 }} />
      <BlockButton
        title="Reset Countdown"
        color="btnLight"
        onPress={() => setTimeRemaining(countdownTime)}
        icon={{
          icon: "restart",
          iconType: "material",
        }}
        disabled={timerStarted}
        size="small"
      />
      <View style={{ height: 10 }} />
      <BlockButton
        title="Set to Zero"
        color="btnLight"
        onPress={() => {
          setTimeRemaining(0);
          setCountdownTime(0);
        }}
        icon={{
          icon: "numeric-0-box-outline",
          iconType: "material",
        }}
        disabled={timerStarted}
        size="small"
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
