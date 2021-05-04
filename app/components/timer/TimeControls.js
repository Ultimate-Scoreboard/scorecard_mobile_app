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
  setTimesUp,
}) {
  return (
    <>
      <BlockButton
        title={timerStarted ? "Pause" : "Start"}
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
      <View style={styles.container}>
        <View style={styles.half}>
          <BlockButton
            title="Reset"
            color="btnLight"
            onPress={() => {
              setTimeRemaining(countdownTime);
              setTimesUp(false);
            }}
            icon={{
              icon: "restart",
              iconType: "material",
            }}
            disabled={timerStarted}
            size="small"
          />
        </View>
        <View style={styles.half}>
          <BlockButton
            title="Zero"
            color="btnLight"
            onPress={() => {
              setTimeRemaining(0);
              setCountdownTime(0);
              setTimesUp(false);
            }}
            icon={{
              icon: "numeric-0-box-outline",
              iconType: "material",
            }}
            disabled={timerStarted}
            size="small"
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  half: {
    flex: 0.5,
  },
});

export default TimerControls;
