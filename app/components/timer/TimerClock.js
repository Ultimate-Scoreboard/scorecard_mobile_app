import React from "react";
import { StyleSheet, View } from "react-native";

import RoundedButton from "../button/RoundedButton";
import { defaultStyles } from "../../config";
import { allowables } from "../../functions";
import AppText from "../text/AppText";

function TimerClock({
  timeRemaining,
  setTimeRemaining,
  countdownTime,
  timerStarted,
  setTimerStarted,
}) {
  const resetTime = () => {
    setTimerStarted(false);
    setTimeout(() => {
      setTimeRemaining(countdownTime);
      setTimerStarted(true);
    }, 1001);
  };
  return (
    <View style={styles.container}>
      <>
        <View style={styles.stop}>
          <RoundedButton
            icon={{
              icon: timerStarted ? "pause-circle" : "play-circle",
              iconType: "material",
            }}
            onPress={() => setTimerStarted(!timerStarted)}
            size="small"
            color="btnLight"
          />
        </View>
        <View style={styles.next}>
          <RoundedButton
            icon={{ icon: "skip-next-outline", iconType: "material" }}
            onPress={() => resetTime()}
            size="small"
          />
        </View>
      </>
      <View style={styles.timeContainer}>
        <AppText style={styles.time}>
          {allowables.convertMS(timeRemaining)}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 10,
  },
  timeContainer: {
    flex: 1,
  },
  time: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
  },
  next: {
    position: "absolute",
    right: 20,
    top: -5,
    zIndex: 99,
  },
  stop: {
    position: "absolute",
    left: 20,
    top: -5,
    zIndex: 99,
  },
});

export default TimerClock;
